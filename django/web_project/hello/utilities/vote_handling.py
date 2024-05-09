from phe import paillier
import hashlib
import rsa
import hmac
from random import shuffle
# import random
# import math

#for voter id, to auto increment
voter_id_counter = 0
#global votes list where all votes will be appended
votes_list = []
    
class Vote:
    def __init__(self, voter_id: int, voted_for: str):
        self.voter_id = voter_id
        self.voted_for = voted_for
        

class Candidate:
    def __init__(self, candidate_id: int, candidate_name: str):
        self.candidate_id = candidate_id
        self.candidate_name = candidate_name


#to adjust, all Jason and Naomi values to be dynamic
Jason = Candidate(1, "Jason Tan")
Naomi = Candidate(2, "Naomi Chow")

# Key generation for Paillier encryption
def generate_paillier_keys(): 
    public_key, private_key = paillier.generate_paillier_keypair()
    return public_key, private_key

paillier_public_key, paillier_private_key = generate_paillier_keys()

# Generate RSA key pair for digital signatures
def generate_rsa_keys():
    public_key, private_key = rsa.newkeys(2048)
    return public_key, private_key

rsa_public_key, rsa_private_key = generate_rsa_keys()


# Function for encrypting votes
def encrypt_vote(vote, paillier_public_key):
    """Encrypt a vote using Paillier encryption."""
    encrypted_vote = paillier_public_key.encrypt(vote)
    return encrypted_vote





#signing and encryption functions
#for the 'vote' button
def encrypt_and_sign_vote(vote, paillier_public_key, rsa_private_key):
    # Encrypt the vote using Paillier encryption
    candidate_map = {"Jason Tan": 0, "Naomi Chow": 1}
    vote_candidate_id = candidate_map.get(vote.voted_for, -1)
    encrypted_vote = encrypt_vote(vote_candidate_id, paillier_public_key)

    # Serialize the encrypted vote for signing (simple serialization)
    serialized_vote = str(encrypted_vote.ciphertext()).encode()
    # Sign the serialized encrypted vote
    signature = rsa.sign(serialized_vote, rsa_private_key, 'SHA-256')
    
    return encrypted_vote, signature


def verify_append_signature(encrypted_vote, signature, rsa_public_key):
    # Verify the signature
    try:
        rsa.verify(str(encrypted_vote.ciphertext()).encode(), signature, rsa_public_key) 
        votes_list.append(encrypted_vote)
    except rsa.VerificationError:
        return None




#shuffle and tally functions
#for the 'end election' button
def shuffle_and_calculate_tally(paillier_public_key, paillier_private_key):
    # shuffle votes_list in place
    shuffle(votes_list)
    # Create an encrypted tally of votes
    encrypted_tally = sum(votes_list, paillier_public_key.encrypt(0)) #value of all the votes added up. 
                                                                      #since Naomi's vote represents 1 and Jason represents 0, 
                                                                      #Naomi's tally will be the sum of the VALUES, 
                                                                      #while Jason's tally will be the total number of votes - Naomi's tally
                                                                   
    # Decrypt the total tally to get Naomi's votes as she represents 1
    decrypted_tally = paillier_private_key.decrypt(encrypted_tally)
    Naomi_tally = decrypted_tally
    Jason_tally = len(votes_list) - Naomi_tally
    
    return Naomi_tally, Jason_tally





#to include later???
# Hash a string using SHA-256
def hash_string(data):
    return hashlib.sha256(data.encode()).hexdigest()


# Generate HMAC for data
def generate_hmac(key, data):
    return hmac.new(key.encode(), data.encode(), hashlib.sha256).hexdigest()

