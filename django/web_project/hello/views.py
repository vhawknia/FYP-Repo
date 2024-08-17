from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .utilities import vote_handling
import traceback
import json
from hello.acc.jsonFuncs import jsonReader
from .serializer import ElectionSerializer, OngoingElectionSerializer, CompletedElectionSerializer, ElectionVoterStatusSerializer, ArchivedElectionSerializer
from rest_framework import generics
from datetime import datetime
import pytz
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import uuid
from Crypto.PublicKey import RSA
from Crypto.Signature import pkcs1_15
from Crypto.Hash import SHA256
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.db import IntegrityError
import logging
from rest_framework.views import APIView
from rest_framework.response import Response  # Import Response for returning responses
from rest_framework import generics  # Import generics for ListAPIView

from .models import Election, UserAccount, ElectionVoterStatus, Department, OngoingElection, EncryptedTally, CompletedElection, ArchivedElection
#from hello.mySQLfuncs import sql_validateLogin, sql_insertAcc, get_ongoing_user_elections_with_status, update_election_voter_status, retrieve_completed_election_tally
from hello.mySQLfuncs import *


import os
import pickle
import base64
from dotenv import load_dotenv
from phe import paillier

# Load environment variables from the .env file
load_dotenv()

public_key_serialized = os.getenv('PAILLIER_PUBLIC_KEY')
private_key_serialized = os.getenv('PAILLIER_PRIVATE_KEY')

# Decode from base64
pail_public_key_bytes = base64.b64decode(public_key_serialized)
# Deserialize the public key
pail_public_key = pickle.loads(pail_public_key_bytes)

# Decode from base64
pail_private_key_bytes = base64.b64decode(private_key_serialized)
# Deserialize the public key
pail_private_key = pickle.loads(pail_private_key_bytes)


# Convert the public key to a JSON-compatible format
pail_public_key_json = {
    "n": str(pail_public_key.n),  # Paillier public key's modulus (big integer as string)
}

# Define global variables
candidate_mapping = {}
topic_mapping = {}
subject_uuids_dict = {
    'candidates': candidate_mapping,
    'topics': topic_mapping
}

encrypted_tallies = {}

def serialize_encrypted_number(encrypted_number):
    return base64.b64encode(pickle.dumps(encrypted_number)).decode('utf-8')

def deserialize_encrypted_number(serialized_encrypted_number):
    return pickle.loads(base64.b64decode(serialized_encrypted_number.encode('utf-8')))

def initialize_tally(election_id, candidates, topics):
    print(f"Initializing tally for election {election_id}")

    try:
        # Initialize encrypted tally for each candidate
        if candidates:
            for candidate in candidates:
                candidate_uuid = candidate['uuid']
                encrypted_tally = pail_public_key.encrypt(1)  # Encrypting the value 1 as the initial tally
                
                # Serialize the encrypted tally to store in the database
                encrypted_tally_str = serialize_encrypted_number(encrypted_tally)
                
                # Debugging
                decrypted_tally = pail_private_key.decrypt(encrypted_tally)
                
                # Debug: Print the initial encrypted tally
                print(f"Initial encrypted tally for candidate {candidate['name']}: {encrypted_tally_str}")
                print(f"Initialized tally function, decrypted tally is {decrypted_tally}")
                print()
                
                # Store the encrypted tally in the database
                EncryptedTally.objects.update_or_create(
                    election_id=election_id,
                    uuid=candidate_uuid,
                    defaults={'encrypted_tally': encrypted_tally_str}
                )

        # Initialize encrypted tally for each topic
        if topics:
            for topic in topics:
                topic_uuid = topic['uuid']
                encrypted_tally = pail_public_key.encrypt(1)  # Encrypting the value 1 as the initial tally

                # Serialize the encrypted tally to store in the database
                encrypted_tally_str = serialize_encrypted_number(encrypted_tally)
                
                # Debugging
                decrypted_tally = pail_private_key.decrypt(encrypted_tally)
                
                # Debug: Print the initial encrypted tally
                print(f"Initial encrypted tally for topic {topic['name']}: {encrypted_tally_str}")
                print(f"Initialized tally function, decrypted tally is {decrypted_tally}")
                

                # Store the encrypted tally in the database
                EncryptedTally.objects.update_or_create(
                    election_id=election_id,
                    uuid=topic_uuid,
                    defaults={'encrypted_tally': encrypted_tally_str}
                )

        print(f"Tallies for election {election_id} initialized and stored in the database.")

    except IntegrityError as e:
        logging.error(f"Integrity error occurred: {e}. Election ID: {election_id}")
    except ValidationError as e:
        logging.error(f"Validation error occurred: {e}")
    except ObjectDoesNotExist as e:
        logging.error(f"Object does not exist error: {e}")
    except Exception as e:
        logging.error(f"An unexpected error occurred: {e}")


def load_tallies_from_db():
    global encrypted_tallies

    encrypted_tallies = {}
    tallies = EncryptedTally.objects.all()

    for tally in tallies:
        election_id = tally.election_id
        uuid_str = tally.uuid
        encrypted_tally_str = tally.encrypted_tally

        try:
            uuid_bigint = convert_uuid_to_bigint(uuid_str)
        except ValueError as e:
            logging.error(f"Invalid UUID detected: {uuid_str}. Error: {e}")
            continue

        # Deserialize the encrypted tally string back into an EncryptedNumber object
        encrypted_tally = deserialize_encrypted_number(encrypted_tally_str)

        # Debug: Decrypt and print the tally to verify integrity
        decrypted_tally = pail_private_key.decrypt(encrypted_tally)
        print(f"Loaded tally from DB for election {election_id}, UUID {uuid_str}, Decrypted: {decrypted_tally}")

        if election_id not in encrypted_tallies:
            encrypted_tallies[election_id] = {}

        encrypted_tallies[election_id][uuid_bigint] = encrypted_tally

    print("Tallies loaded from database into the global dictionary.")


def increment_vote(electionid, uuid_bigint, increment=1):
    global encrypted_tallies

    uuid_str = convert_bigint_to_uuid(uuid_bigint)
    #encrypted_increment = paillier.EncryptedNumber(pail_public_key, increment)
    encrypted_increment = pail_public_key.encrypt(increment)  # Properly encrypt the increment

    current_tally = encrypted_tallies.get(electionid, {}).get(uuid_bigint)
    if current_tally is None:
        raise ValueError(f"No tally found for election_id {electionid} and UUID {uuid_bigint}")

    # Debug: Decrypt and print the current tally
    decrypted_current_tally = pail_private_key.decrypt(current_tally)
    print(f"Current tally before increment for election_id {electionid}, UUID {uuid_str}: {decrypted_current_tally}")

    updated_tally = current_tally + encrypted_increment
    encrypted_tallies[electionid][uuid_bigint] = updated_tally
    updated_tally_str = serialize_encrypted_number(updated_tally)

    # Debug: Decrypt and print the updated tally
    decrypted_updated_tally = pail_private_key.decrypt(updated_tally)
    print(f"Updated tally after increment for election_id {electionid}, UUID {uuid_str}: {decrypted_updated_tally}")

    rows_updated = EncryptedTally.objects.filter(
        election_id=electionid,
        uuid=uuid_str
    ).update(encrypted_tally=updated_tally_str)

    if rows_updated > 0:
        print(f"Successfully updated tally for UUID {uuid_str}.")
    else:
        print(f"Tally update failed for UUID {uuid_str}. No record found to update.")


def decrypt_tally(encrypted_tally_str):
    try:
        encrypted_tally_int = int(encrypted_tally_str)
        encrypted_tally = paillier.EncryptedNumber(pail_public_key, encrypted_tally_int)
        
        # Debug: Print the encrypted tally before decryption
        print(f"Decrypting tally: Encrypted: {encrypted_tally_str}")

        decrypted_tally = pail_private_key.decrypt(encrypted_tally)

        # Debug: Print the decrypted tally
        print(f"Decrypted tally: {decrypted_tally}")

        return decrypted_tally
    
    except Exception as e:
        print(f"An error occurred during decryption: {e}")
        return None


@csrf_exempt  # Remove for production (CSRF protection for token endpoint)
def CSRFTokenDispenser(request):
  return JsonResponse({'csrfToken': request.META['CSRF_TOKEN']})


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
            # Validate the candidates' emails and names
            missing_candidates = []
            for candidate in candidates:
                email = candidate['email']
                name = candidate['name']
                try:
                    first_name, last_name = name.split(' ', 1)  # Assuming the name is in "First Last" format
                except ValueError:
                    return JsonResponse({
                        'status': 'error',
                        'message': f'Invalid name format for candidate {email}. Expected "First Last".'
                    }, status=400)

                user = UserAccount.objects.filter(username=email, firstname=first_name, lastname=last_name).first()

                if not user:
                    missing_candidates.append({
                        'email': email,
                        'name': name
                    })

            if missing_candidates:
                return JsonResponse({
                    'status': 'error',
                    'message': f'The following candidates have mismatched details: {missing_candidates}'
                }, status=400)
                
            missing_voters = []
            for voter in voters:
                voter_email = voter.get('voterEmail')
                user = UserAccount.objects.filter(username=voter_email).first()

                if not user:
                    missing_voters.append(voter_email)

            if missing_voters:
                return JsonResponse({
                    'status': 'error',
                    'message': f'The following voter emails do not exist in the user_accounts table: {missing_voters}'
                }, status=400)    
                

            # Validate and adjust the timezone string
            if timezone_str.startswith('GMT') and len(timezone_str) > 3:
                offset = int(timezone_str[3:])
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

            # Retrieve the election ID
            election_id = new_election.id

            # Initialize the tally for each candidate and for each topic in the election
            initialize_tally(election_id, candidates, topics)
            
            # Add voters to ElectionVoterStatus
            add_voters_to_status(new_election)

            return JsonResponse({'status': 'success', 'message': 'Election created successfully'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)


#updates the election-voter-status table
def add_voters_to_status(election):
    # Extract candidate emails to exclude them from being added as voters
    candidate_emails = [candidate.get("email") for candidate in election.candidates if candidate.get("email")]

    # Add individual voters based on voterEmail
    if election.voters:
        for voter in election.voters:
            voter_email = voter.get("voterEmail")
            if voter_email and voter_email not in candidate_emails:  # Exclude candidates
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
                    # Filter users by department and check if they are 'Voter' type, excluding candidates
                    users = UserAccount.objects.filter(department=department, usertype='Voter').exclude(username__in=candidate_emails)
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

class DisplayCompletedElections(generics.ListAPIView):
    queryset = CompletedElection.objects.all()
    serializer_class = CompletedElectionSerializer
    
@csrf_exempt
def delete_election(request, id):
    if request.method == 'DELETE':
        try:
            EncryptedTally.objects.filter(election_id=id).delete()

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

@api_view(['GET'])
def get_user_elections(request):
    if request.method == 'GET':
        userid = request.GET.get('userid')
        update_election_statuses() 
        load_tallies_from_db()

        # Get elections with their statuses
        elections = get_ongoing_user_elections_with_status(userid)
        election_serializer = OngoingElectionSerializer(elections, many=True)

        # Get voter status for each election
        voter_statuses = ElectionVoterStatus.objects.filter(user__userid=userid)
        voter_status_serializer = ElectionVoterStatusSerializer(voter_statuses, many=True)

        # Create a map from the serialized data
        status_map = {status['election_id']: status for status in voter_status_serializer.data}

        # Combine the data
        combined_data = []
        for election in election_serializer.data:
            election_id = election['id']
            # Append the voter status to the election data
            election['userid'] = status_map.get(election_id, {}).get('userid', None)
            election['has_voted'] = status_map.get(election_id, {}).get('has_voted', None)
            combined_data.append(election)

        return Response({'elections': combined_data}, status=status.HTTP_200_OK)
    return Response({'error': 'Invalid HTTP method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

  
  
def verify_signature_with_public_key(encrypted_vote_data, digital_signature, public_key_pem):
    # Convert PEM-formatted public key to an RSA key object
    public_key = RSA.import_key(public_key_pem)

    # Create a SHA-256 hash of the encrypted vote data
    h = SHA256.new(encrypted_vote_data.encode('utf-8'))

    # Decode the base64-encoded signature
    signature = base64.b64decode(digital_signature)

    try:
        # Verify the signature using the public key and the hash
        pkcs1_15.new(public_key).verify(h, signature)
        return True
    except (ValueError, TypeError):
        return False
    
@csrf_exempt
def handle_Vote(request):
    global encrypted_tallies
    
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            vote_str = data.get('voteData')  # Encrypted vote data as string
            rsa_public_key_data = data.get('publicKey')  # RSA Public key data
            signature = data.get('digitalSignature')
            election_id = data.get('electionid')

            user_id = data.get('userid') #user id, dervied from session
            user_id_int = int(user_id)
            
            print("Signature:", signature)
            print("Public Key:", rsa_public_key_data)
            print("Type of RSA Public Key Data:", type(rsa_public_key_data))
            print("ELECTION ID:", election_id)
            
            
            #verify the signature
            is_signature_valid = verify_signature_with_public_key(vote_str, signature, rsa_public_key_data)

            if not is_signature_valid:
                return JsonResponse({'status': 'error', 'message': 'Invalid digital signature'}, status=400)
            else:
                print('digital signature has been verified\n')
                
            # Convert the vote string back to an EncryptedNumber
            encrypted_vote = paillier.EncryptedNumber(pail_public_key, int(vote_str))
            # Decrypt the vote
            decrypted_vote = pail_private_key.decrypt(encrypted_vote)
            print("Decrypted vote:", decrypted_vote)
            
            print(encrypted_tallies)
            if election_id not in encrypted_tallies: #might cause frequent errors if the global tally dictionary is reset
                return JsonResponse({'status': 'error', 'message': 'Election not found'}, status=404)
            print()
            
            map_uuid_to_subject_in_ongoing_election()
            vote_value = find_voted_subject_by_uuid_and_increment_vote(election_id, decrypted_vote)
            print("Vote value:", vote_value)
            election_id_int = int(election_id)
            
            #update the EVS table accordingly, set the voter's has_voted to a true value
            update_election_voter_status(election_id_int, user_id_int)
            
            # Return a success response
            return JsonResponse({'status': 'success', 'message': 'Vote submitted successfully'})
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)  
  
  
@csrf_exempt    
def get_paillier_public_key(request):
    return JsonResponse(pail_public_key_json)   

def convert_uuid_to_bigint(uuid_str):
    # Convert UUID string to BigInt
    return int(uuid.UUID(uuid_str).hex, 16)

def convert_bigint_to_uuid(uuid_bigint):
    # Convert the BigInt back to a hex string, ensuring it is padded to 32 characters
    hex_str = f'{uuid_bigint:032x}'   
    # Format the hex string into the UUID format (8-4-4-4-12)
    return str(uuid.UUID(hex=hex_str))

#populate the uuid dictionaries from the json retrieved from the ongoing elections
def map_uuid_to_subject_in_ongoing_election():
    global candidate_mapping, topic_mapping, subject_uuids_dict
    
    # Retrieve all ongoing elections
    ongoing_elections = OngoingElection.objects.all()
    
    # Create lists to store all candidates and topics from each election
    all_candidates = []
    all_topics = []
    
    for election in ongoing_elections:
        # Extract candidates and topics from each election
        all_candidates.extend(election.candidates)
        all_topics.extend(election.topics)
    
    # Clear the previous mappings
    candidate_mapping.clear()
    topic_mapping.clear()
    
    # Populate the candidate mapping dictionary
    for candidate in all_candidates:
        uuid = candidate.get('uuid')
        name = candidate.get('name')
        email = candidate.get('email')
        if uuid and name and email:
            key = f"{name} | {email}"  # Combine name and email as the key
            uuid_bigint = convert_uuid_to_bigint(uuid) #Convert all the string uuids into big int data type
            candidate_mapping[key] = uuid_bigint
    
    # Populate the topic mapping dictionary
    for topic in all_topics:
        uuid = topic.get('uuid')
        name = topic.get('name')
        if uuid and name:
            uuid_bigint = convert_uuid_to_bigint(uuid) #Convert all the string uuids into big int data type           
            topic_mapping[name] = uuid_bigint
    
    # Update the combined dictionary
    subject_uuids_dict['candidates'] = candidate_mapping
    subject_uuids_dict['topics'] = topic_mapping
    
    print('Printing the mapped UUID dictionary:', subject_uuids_dict)


#Finds the candidate voted for by comparing the bigInt UUIDs and handles the vote incrementation
def find_voted_subject_by_uuid_and_increment_vote(electionid, uuid):
    global candidate_mapping, topic_mapping, subject_uuids_dict
    
    # Search in candidates
    for key, uuid_value in subject_uuids_dict['candidates'].items():
        if uuid_value == uuid:
            name, email = key.split(' | ')
            print("The record voted for is: {'type': 'candidate' , 'name': ", name, "'email':" , email,"}") 
            increment_vote(electionid, uuid) #once the relevant candidate has been found, increment the vote count
            return name
    
    # Search in topics
    for topic_name, uuid_value in subject_uuids_dict['topics'].items():
        if uuid_value == uuid:
            print("The record voted for is: {'type': 'topic' , 'name': ", topic_name, "}") 
            increment_vote(electionid, uuid) #once the relevant candidate has been found, increment the vote count
            return topic_name
    
    # If UUID not found
    return None



###################################delete once the cron jobs is up
from django.utils import timezone

class UpdateElectionStatuses(APIView):
    def post(self, request, *args, **kwargs):
        update_election_statuses()
        return Response({'status': 'Election statuses updated successfully'})
    
def update_election_statuses():
    now = timezone.now()
    
    # Step 1: Update the status of all elections
    elections = Election.objects.all()
    for election in elections:
        # Skip the election if it is already archived
        if election.status == 'Archived':
            continue

        if election.startDate > now:
            election.status = 'Scheduled'
        elif election.startDate <= now <= election.endDate:
            election.status = 'Ongoing'
        else:
            election.status = 'Completed'
        election.save()

        # Step 2: Check and add ongoing elections to OngoingElection table
        if election.status == 'Ongoing':
            ongoing_election_exists = OngoingElection.objects.filter(id=election.id).exists()
            if not ongoing_election_exists:
                OngoingElection.objects.create(
                    id=election.id,
                    title=election.title,
                    description=election.description,
                    startDate=election.startDate,
                    endDate=election.endDate,
                    timezone=election.timezone,
                    electionType=election.electionType,
                    candidates=election.candidates,
                    topics=election.topics,
                    voters=election.voters,
                    votersDept=election.votersDept
                )

        # Step 3: Check and add completed elections to CompletedElection table
        if election.status == 'Completed':              
            # Retrieve the encrypted tallies and UUIDs
            tallies = retrieve_completed_election_tally(election.id)
            
            for uuid, encrypted_tally in tallies:
                #decrypted_tally = decrypt_tally(encrypted_tally)
                deserialized_tally = deserialize_encrypted_number(encrypted_tally)
                decrypted_tally = pail_private_key.decrypt(deserialized_tally)
                actual_value = decrypted_tally - 1

                # Ensure that each (election_id, uuid) pair is unique
                completed_election_exists = CompletedElection.objects.filter(election=election, uuid=uuid).exists()
                
                if not completed_election_exists:
                    CompletedElection.objects.create(
                        election=election,  # Referencing the Election object
                        title=election.title,
                        candidates=election.candidates,
                        topics=election.topics,
                        uuid=uuid,  # Set the UUID for the CompletedElection
                        tally=actual_value  # Set the tally based on the retrieved encrypted_tally
                    )
                    
            # Step 4: Delete the election from the OngoingElection table
            OngoingElection.objects.filter(id=election.id).delete()

    print('Elections have been updated')

    
    
@csrf_exempt
def handle_archived_elections(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8')) 
            election_id = data.get('election_id')
            title = data.get('title')
            description = data.get('description')
            start_date = data.get('start_date')
            end_date = data.get('end_date')
            timezone = data.get('timezone')
            
            # Ensure all required fields are present
            if not election_id or not title or not start_date or not end_date:
                return JsonResponse({'error': 'Missing required fields'}, status=400)
            
            # Retrieve the election instance
            election = Election.objects.get(id=election_id)

            # Create the ArchivedElection record
            archived_election = ArchivedElection.objects.create(
                election_id=election.id,  # Use election_id since it's no longer a FK
                title=title,
                description=description,
                startDate=start_date,
                endDate=end_date,
                timezone=timezone
            )
            
            election.status = 'Archived'
            election.save()
            
            # Delete the corresponding record from the CompletedElection table
            CompletedElection.objects.filter(election_id=election.id).delete()
         
            # Delete the related encrypted tallies from the currently Ongoing elections
            EncryptedTally.objects.filter(election_id=election.id).delete()
            
            # Delete the related EVS table records
            ElectionVoterStatus.objects.filter(election_id=election.id).delete()      
            
            
            # Return a success response
            return JsonResponse({
                'message': 'Archived election created successfully!',
                'archived_election_id': archived_election.archived_election_id
            }, status=201)
        
        except Election.DoesNotExist:
            return JsonResponse({'error': 'Election not found'}, status=404)
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Invalid HTTP method'}, status=405)


class DisplayArchivedElections(generics.ListAPIView):
    queryset = ArchivedElection.objects.all()
    serializer_class = ArchivedElectionSerializer
    
    
    
    
    
    
        
"""
---ACC FUNCTIONS---
"""

@csrf_exempt
def loginFunc(request):
    print("login requested")
    if request.method == 'POST':
        try:
            # Access JSON data from request body
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            
            #catch empty user and pass
            if not username or not password:
                return JsonResponse({'error': 'Missing username or password', 'username':username, 'password':password}, status=400)
            
            #save result
            tuplist_result = sql_validateLogin(username, password)
            
            #print(tuplist_result)
            
            #catch failed login
            if tuplist_result == 'deny':
                return JsonResponse({'RESULT': 'deny'})
            else:
                #for x in tuplist_result[0]:
                    #print(x)
                # #print(f"TOKEN GENERATED IS",token)
                
                r = JsonResponse({'message': 'Login successful', 'data': tuplist_result[0]}, status=200)
                #r.set_cookie('token', token)
                #print(r.headers)
                #print(r.content)
                return r
                
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
        except Exception as e:
            # Capture the error and traceback
            error_details = traceback.format_exc()
            print("An error occurred:", error_details)  # Log the error on the server
            return JsonResponse({'error': str(e), 'details': error_details}, status=500)


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
            elif insert == 'dup':
                return JsonResponse({'RESULT': 'denied. User already exists.'})
            else:
                return JsonResponse({'RESULT': 'success'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)

@csrf_exempt
def getAccList(request):
     if request.method == 'POST':
        try:
            # Access JSON data from request body
            data = json.loads(request.body)
            cond = data.get('cond')
            
            result = sql_getAccList(cond)
            
            if result:
                return JsonResponse({'data': result})
            else:
                return JsonResponse({'data': []})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)

@csrf_exempt
def delAcc(request):
     if request.method == 'POST':
        try:
            # Access JSON data from request body
            data = json.loads(request.body)
            uid = data.get('userid')
            
            #print(f"ACC DEL REQUEST RECIEVED. ATTEMPTING DELETION. USERNAME IS {usern}")
            
            #print(uid)
            result = sql_delAcc(uid)
            
            print(result)
            
            if result == False:
                return JsonResponse({'result': 'db side error'})                    
            else:
                return JsonResponse({'result': 'success'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)

@csrf_exempt
def updateAcc(request):
     if request.method == 'POST':
        try:
            # Access JSON data from request body
            data = json.loads(request.body)
            usern = data.get('username')
            #passw = data.get('passw')
            usert = data.get('usertype')
            frstn = data.get('firstname')
            lastn = data.get('lastname')
            dpt = data.get('department')
            
            #print(f"UPDATE ACC TRIGGERED. DATA RECIEVED IS {usern} {frstn} {lastn} {dpt} {usert}")
            
            result = sql_updateAcc(usern, usert, frstn, lastn, dpt)
            
            return JsonResponse({'Result': result})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)

@csrf_exempt
def updateAccPassw(request):
     if request.method == 'POST':
        try:
            # Access JSON data from request body
            data = json.loads(request.body)
            usern = data.get('usern')
            o_passw = data.get('o_passw')
            n_passw = data.get('n_passw')
            
            result = sql_updateAccPassw(usern, o_passw, n_passw)
            
            if result == True:
                return JsonReponse({'Result': result})
                
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)

@csrf_exempt
def getDptList(request):
    if request.method == 'POST':
        try:
            #print("getDPTLIST STARTED")
            data = json.loads(request.body)

            result = sql_getDptList() #returns tuplist
            
            #print("Result returned with: ")
            #print(result)
            
            if result:
                return JsonResponse({'Data': result})
            else:
                return JsonResponse({'Data': ['failed']})
                
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
            
    
@csrf_exempt
def insertAccBulk(request):
    #print("insertAccBULK STARTED")
    unsucList = []
    i=0
    if request.method == 'POST':
        try:
            #print("insertBulk STARTED")
            data = json.loads(request.body)
            usernList = data.get('usernList', [])
            passw = data.get('passw', '')
            dpt = data.get('dpt', '')        
            
            frstn, lastn = "", ""
            usert = "voter"
            
            #print("PRINTING USERN LIST")
            #print(usernList)
            
            for usern in usernList:
                if usern == "":
                    unsucList.append("Empty usrname")
                else:
                    i=i+1
                    #print(f"LOOPING HHAPPENED THIS MANY TIMES: {i}")
                    insert = sql_insertAcc(usern, passw, usert, frstn, lastn, dpt)
                    if insert == 'failed':
                        unsucList.append(usern)
                    elif insert == 'dup':
                        unsucList.append(usern + "already in database")
            #print(f"TOTAL LOOPS IS {i}")
            
            print(unsucList)
            
            if not unsucList:
                return JsonResponse({'Result': unsucList})
            else:
                return JsonResponse({'Result': unsucList})
                
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
        except Exception as e:
            #print(f"Unexpected error: {e}")
            return JsonResponse({'error': 'An unexpected error occurred'}, status=500)
