from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .utilities import vote_handling
import traceback
import json
from hello.acc.jsonFuncs import jsonReader

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
        return JsonResponse({'error': 'Missing username or password', 'username':username, 'password':password}, status=400)
      
        
      #accList = jsonFuncs.jsonReader("accounts.json")
      #accList = jsonReader("hello/acc/accounts.json")
      #accList = jsonReader("hello/accounts.json")
      accList = jsonReader("/home/vic/Desktop/proj/FYP-Repo/django/web_project/hello/acc/accounts.json")
      
      print(accList)
      
      
      for acc in accList:
        if acc['email'].lower() == username.lower() and acc['pw'] == password:
          print("EMAIL AND PASSWORD IS CONFIRMED")
          print(JsonResponse({'RESULT': acc['role']}))
          return JsonResponse({'RESULT': acc['role']}) 
      else:
        r = "deny"
        return JsonResponse({'RESULT': r})  # Return JSON response
    except json.JSONDecodeError:
      return JsonResponse({'RESULT': 'Invalid JSON data'}, status=400)
  else:
    return JsonResponse({'RESULT': 'Invalid request method'}, status=400)
