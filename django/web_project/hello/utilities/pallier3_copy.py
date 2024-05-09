from phe import paillier
import hashlib
import rsa
import hmac
from random import shuffle
import random
import math

voter_id_counter = 0
    
class Vote:
    def __init__(self, voter_id: int, voted_for: str):
        self.voter_id = voter_id
        self.voted_for = voted_for
        
    def blind_vote(self, blinding_factor, public_key):
        # Convert vote to a number for blinding (simple encoding could be used here)
        vote_hash = int.from_bytes(hashlib.sha256(self.voted_for.encode()).digest(), byteorder='big')
        blinded_vote = (vote_hash * rsa.transform.bytes2int(blinding_factor)) % public_key.n
        return blinded_vote

    def unblind_signature(self, blinded_signature, blinding_factor, public_key):
        unblinded_signature = (blinded_signature * rsa.transform.invmod(rsa.transform.bytes2int(blinding_factor), public_key.n)) % public_key.n
        return unblinded_signature

# def generate_blinding_factor(public_key):
#     while True:
#         r = random.randint(2, public_key.n - 1)  # Generate a random number r
#         if math.gcd(r, public_key.n) == 1:  # Check if gcd(r, n) is 1
#             return r  # r is coprime to n, suitable for blinding factor


class Candidate:
    def __init__(self, candidate_id: int, candidate_name: str):
        self.candidate_id = candidate_id
        self.candidate_name = candidate_name
        self.list_of_votes = []  # Each candidate has their own list of votes

    @property
    def total_votes(self):
        return len(self.list_of_votes)  # Dynamically calculate the total votes

    def __str__(self):
        return f"Candidate ID: {self.candidate_id}, Name: {self.candidate_name}, Total Votes: {self.total_votes}"

    def receive_vote(self, vote):
        self.list_of_votes.append(vote)  # Add a vote to the list


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

authority_public_key, authority_private_key = generate_rsa_keys()


# Hash a string using SHA-256
def hash_string(data):
    return hashlib.sha256(data.encode()).hexdigest()


# Generate HMAC for data
def generate_hmac(key, data):
    return hmac.new(key.encode(), data.encode(), hashlib.sha256).hexdigest()


# Function for encrypting votes
def encrypt_vote(vote, public_key):
    """Encrypt a vote using Paillier encryption."""
    encrypted_vote = public_key.encrypt(vote)
    return encrypted_vote


# def encrypt_and_blind_vote(vote, paillier_public_key, authority_public_key):
#     # Encrypt the vote using Paillier encryption
#     candidate_map = {"Jason Tan": 0, "Naomi Chow": 1}
#     if isinstance(vote.voted_for, str):
#         vote_candidate_id = candidate_map[vote.voted_for]
#         encrypted_vote = encrypt_vote(vote_candidate_id, paillier_public_key)
#     else:
#         encrypted_vote = encrypt_vote(vote.voted_for, paillier_public_key)
   
#     # Blinding the encrypted vote
#     blinding_factor = generate_blinding_factor(authority_public_key)
#     blinded_vote = rsa.blind(encrypted_vote, blinding_factor, authority_public_key)
    
#     return blinded_vote, blinding_factor, encrypted_vote

# #authority-side
# def sign_blinded_vote(blinded_vote, authority_private_key):
#     # Authority signs the blinded vote
#     blinded_signature = rsa.sign(str(blinded_vote).encode(), authority_private_key, 'SHA-256')
#     return blinded_signature


# def unblind_verify_append_signature(blinded_signature, blinding_factor, authority_public_key, blinded_vote, vote, encrypted_vote):
#     # Unblinding the signature
#     unblinded_signature = rsa.unblind(blinded_signature, blinding_factor, authority_public_key)
#     # Verify the unblinded signature
#     try:
#         rsa.verify(str(blinded_vote).encode(), unblinded_signature, authority_public_key)
#         append_encrypted_vote(vote, encrypted_vote)
#     except rsa.VerificationError:
#         return None
    
# def append_encrypted_vote(vote, encrypted_vote):
#     # Append the encrypted vote to the candidate
#     if vote.voted_for == "Jason":
#         Jason.list_of_votes.append(encrypted_vote)
#     elif vote.voted_for == "Naomi":
#         Naomi.list_of_votes.append(encrypted_vote)


#blinding signature helper functions
def generate_blinding_factor(rsa_public_key):
    r = random.randint(2, rsa_public_key.n - 1)
    while pow(r, rsa_public_key.e, rsa_public_key.n) == 1:
        r = random.randint(2, rsa_public_key.n - 1)
    return r

def blind(message, rsa_public_key):
    r = generate_blinding_factor(rsa_public_key)
    r_inv = pow(r, -1, rsa_public_key.n)  # Correct modular inverse
    blinded_message = pow(message * r, 1, rsa_public_key.n)  # Simplified expression
    return blinded_message, r, r_inv


def unblind(blinded_signature, r_inv, rsa_public_key):
    # Debug output to check values before operation
    print("Blinded Signature:", blinded_signature)
    print("Inverse of r (r_inv):", r_inv)
    print("RSA modulus (n):", rsa_public_key.n)

    unblinded_signature = (blinded_signature * r_inv) % rsa_public_key.n
    return unblinded_signature





def encrypt_and_blind_vote(vote, paillier_public_key, authority_public_key):
    # Encrypt the vote using Paillier encryption
    candidate_map = {"Jason Tan": 0, "Naomi Chow": 1}
    vote_candidate_id = candidate_map.get(vote.voted_for, -1)
    encrypted_vote = encrypt_vote(vote_candidate_id, paillier_public_key)

    # Blinding the encrypted vote
    blinded_vote, blinding_factor, r_inv = blind(encrypted_vote.ciphertext(), authority_public_key)
    return blinded_vote, blinding_factor, r_inv, encrypted_vote

def sign_blinded_vote(blinded_vote, authority_private_key):
    # Authority signs the blinded vote
    blinded_signature = rsa.sign(str(blinded_vote).encode(), authority_private_key, 'SHA-256')
    return blinded_signature

def unblind_verify_append_signature(blinded_signature, r_inv, authority_public_key, blinded_vote, vote, encrypted_vote):
    # Unblinding the signature
    unblinded_signature = unblind(blinded_signature, r_inv, authority_public_key)
    # Verify the unblinded signature
    try:
        rsa.verify(str(blinded_vote).encode(), unblinded_signature, authority_public_key)
        append_encrypted_vote(vote, encrypted_vote)
    except rsa.VerificationError:
        return None

def append_encrypted_vote(vote, encrypted_vote):
    # Append the encrypted vote to the candidate
    if vote.voted_for == "Jason Tan":
        Jason.list_of_votes.append(encrypted_vote)
    elif vote.voted_for == "Naomi Chow":
        Naomi.list_of_votes.append(encrypted_vote)
