from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .utilities import vote_handling
import traceback
import json

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

    

   