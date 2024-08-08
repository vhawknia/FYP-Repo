from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .utilities import vote_handling
from .utilities import ElectionHandling
import traceback
import json
import os
from hello.acc.jsonFuncs import jsonReader
from .serializer import ElectionSerializer
from rest_framework import generics
from datetime import datetime
import pytz
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Election, UserAccount, ElectionVoterStatus, Department
from hello.mySQLfuncs import sql_validateLogin, sql_insertAcc, get_user_elections_with_status

@csrf_exempt  # Remove for production (CSRF protection for token endpoint)
def CSRFTokenDispenser(request):
  return JsonResponse({'csrfToken': request.META['CSRF_TOKEN']})


@csrf_exempt 
def home(request):
    return HttpResponse("Hello, Django!")

@csrf_exempt
def vote(request):
    if request.method != 'POST':
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=400)
    try: 
        data = json.loads(request.body)
        voted_for = data['candidate_name']
        
        vote_handling.voter_id_counter = vote_handling.voter_id_counter + 1
        vote = vote_handling.Vote(vote_handling.voter_id_counter, voted_for)
        
        encrypted_vote, signature = vote_handling.encrypt_and_sign_vote(vote, vote_handling.paillier_public_key, vote_handling.rsa_private_key)
        vote_handling.verify_append_signature(encrypted_vote, signature, vote_handling.rsa_public_key)    
            
         #react is expecting a json response  
        return JsonResponse({'status': 'success', 'message': 'Vote recorded!'})
    except json.JSONDecodeError:
        return JsonResponse({'status': 'error', 'message': 'Invalid JSON data'}, status=400)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    
    
@csrf_exempt
def terminate_election(request):
    if request.method == 'POST':
        try:
            Naomi_tally, Jason_tally =vote_handling.shuffle_and_calculate_tally(vote_handling.paillier_public_key, vote_handling.paillier_private_key)
            
            return JsonResponse({
                'status': 'success',
                'message': 'Election terminated successfully!',
                'results': {
                    'Jason': Jason_tally,
                    'Naomi': Naomi_tally
                }
            })
            
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=400)


#LOGIN FUNCTIONS
def jsonReader(filepath):
  """
  This function reads a JSON file from the specified path and returns the data as a Python object.

  Args:
      filepath (str): The path to the JSON file.

  Returns:
      object: The data parsed from the JSON file.

  Raises:
      FileNotFoundError: If the specified file is not found.
      JSONDecodeError: If there's an error parsing the JSON data.
      
  TODO: MAYBE, be able to decypt an encrypted json data. Maybe only the data needs to encrypted, the JSON format stays? IDK
  """
  try:
    with open(filepath, 'r') as json_file:
      data = json.load(json_file)
    return data
  except FileNotFoundError:
    raise FileNotFoundError(f"Error: JSON file not found at {filepath}")
  except json.JSONDecodeError:
    raise JSONDecodeError(f"Error: Unable to decode JSON data in {filepath}")


def jsonReader(filePath):
    with open(filePath, 'r') as file:
        return json.load(file)

"""
# old login functions using json as db
@csrf_exempt
def loginFunc(request):
    if request.method == 'POST':
        try:
            # Access JSON data from request body
            data = json.loads(request.body)
            print(data)
            username = data.get('username')
            password = data.get('password')
            
            # Error handling for missing keys
            if not username or not password:
                return JsonResponse({'error': 'Missing username or password', 'username': username, 'password': password}, status=400)
            
            # Construct the path to the accounts.json file
            filePath = os.path.join(os.path.dirname(__file__), 'acc', 'accounts.json')
            accList = jsonReader(filePath)
            print(accList)
            
            for acc in accList:
                if acc['email'].lower() == username.lower() and acc['pw'] == password:
                    print("EMAIL AND PASSWORD IS CONFIRMED")
                    return JsonResponse({'RESULT': acc['role']})
            else:
                return JsonResponse({'RESULT': 'deny'})  # Return JSON response if no match found
        
        except json.JSONDecodeError:
            return JsonResponse({'RESULT': 'Invalid JSON data'}, status=400)
    else:
        return JsonResponse({'RESULT': 'Invalid request method'}, status=400)
""" 

@csrf_exempt
def loginFunc(request):
    if request.method == 'POST':
        try:
            # Access JSON data from request body
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            
            if not username or not password:
                return JsonResponse({'error': 'Missing username or password', 'username':username, 'password':password}, status=400)
            
            check = sql_validateLogin(username, password) 
            
            if check == 'deny':
                return JsonResponse({'RESULT': 'deny'})
            else:
                return JsonResponse({'RESULT': check})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
            
            
@csrf_exempt
def insertAcc(request):
    if request.method == 'POST':
        try:
            # Access JSON data from request body
            data = json.loads(request.body)
            usern = data.get('usern')
            passw = data.get('passw')
            usert = data.get('usert')
            frstn = data.get('frstn')
            lastn = data.get('lastn')
            dpt = data.get('dpt')
            
            if not usern or not passw or not usert:
                return JsonResponse({'error': 'Missing username or password or usertype', 'username':usern, 'password':passw}, status=400)
            insert = sql_insertAcc(usern, passw, usert, frstn, lastn, dpt)
            
            
            if insert == 'failed':
                return JsonResponse({'RESULT': 'denied'})
            else:
                return JsonResponse({'RESULT': 'success'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)    
    
@csrf_exempt
def handle_new_election(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        title = data.get('title')
        description = data.get('description')
        start_date_str = data.get('startDate')
        end_date_str = data.get('endDate')
        timezone_str = data.get('timezone')
        electionType = data.get('electionType')
        candidates = data.get('candidates', [])
        topics = data.get('topics', [])
        voters = data.get('voters', [])
        voters_dept = data.get('votersDept', [])

        try:
            # Validate and adjust the timezone string
            if timezone_str.startswith('GMT') and len(timezone_str) > 3:
                offset = int(timezone_str[3:])
                # Adjust the timezone string for pytz compatibility
                timezone_str = f'Etc/GMT{-offset}' if offset >= 0 else f'Etc/GMT+{abs(offset)}'

            # Convert string dates to datetime objects
            start_date = datetime.fromisoformat(start_date_str)
            end_date = datetime.fromisoformat(end_date_str)

            # Convert to specified timezone
            user_timezone = pytz.timezone(timezone_str)
            start_date = user_timezone.localize(start_date)
            end_date = user_timezone.localize(end_date)

            # Convert to UTC
            start_date_utc = start_date.astimezone(pytz.utc)
            end_date_utc = end_date.astimezone(pytz.utc)

            # Create and save the Election instance
            new_election = Election(
                title=title,
                description=description,
                startDate=start_date_utc,
                endDate=end_date_utc,
                timezone=timezone_str,
                electionType=electionType,
                candidates=candidates,
                topics=topics,
                voters=voters,
                votersDept=voters_dept
            )
            new_election.save()

            # Add voters to ElectionVoterStatus
            add_voters_to_status(new_election)

            return JsonResponse({'status': 'success', 'message': 'Election created successfully'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)



def add_voters_to_status(election):
    # Add individual voters based on voterEmail
    if election.voters:
        for voter in election.voters:
            voter_email = voter.get("voterEmail")
            if voter_email:
                try:
                    # Check if the user is of type 'Voter'
                    user = UserAccount.objects.get(username=voter_email, usertype='Voter')
                    ElectionVoterStatus.objects.create(election=election, user=user)
                except UserAccount.DoesNotExist:
                    print(f"User with email {voter_email} does not exist or is not a 'Voter'.")
                    pass

    # Add voters by department based on departmentname
    if election.votersDept:
        for dept in election.votersDept:
            department_name = dept.get("departmentname")
            if department_name:
                try:
                    department = Department.objects.get(departmentname=department_name)
                    # Filter users by department and check if they are 'Voter' type
                    users = UserAccount.objects.filter(department=department, usertype='Voter')
                    if not users.exists():
                        print(f"No 'Voter' users found in department {department_name}.")
                    else:
                        for user in users:
                            ElectionVoterStatus.objects.create(election=election, user=user)
                except Department.DoesNotExist:
                    print(f"Department {department_name} does not exist.")
                    pass




class DisplayElections(generics.ListAPIView):
    queryset = Election.objects.all()
    serializer_class = ElectionSerializer

@csrf_exempt
def delete_election(request, id):
    if request.method == 'DELETE':
        try:
            election = Election.objects.get(id=id)
            election.delete()
            # delete_election_voter_status(election)
            
            return JsonResponse({'message': 'Election deleted successfully'}, status=200)
        except Election.DoesNotExist:
            return JsonResponse({'error': 'Election not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

# @csrf_exempt
# def delete_election_voter_status(election):
#     """Helper function to delete all ElectionVoterStatus records related to an election."""
#     ElectionVoterStatus.objects.filter(election=election).delete()


@api_view(['GET'])
def get_user_elections(request):
    if request.method == 'GET':
        userid = request.GET.get('userid')
        elections = get_user_elections_with_status(userid)
        serializer = ElectionSerializer(elections, many=True)
        return Response({'elections': serializer.data}, status=status.HTTP_200_OK)
    return Response({'error': 'Invalid HTTP method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@csrf_exempt
def handle_Vote(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            vote = data.get('voteData')
            signature = data.get('signature')
            public_key = data.get('publicKey')

            # For demonstration purposes, just print the received data
            print("Vote Data:", vote)
            print("Signature:", signature)
            print("Public Key:", public_key)

            # TODO: Process the vote and public key
            # For example, you might want to save this data to your database

            # Return a success response
            return JsonResponse({'status': 'success', 'message': 'Vote submitted successfully'})
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)