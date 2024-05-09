from phe import paillier

encrypted_vote_array = []
def generate_keys():
    public_key, private_key = paillier.generate_paillier_keypair()
    return public_key, private_key

public_key, private_key = generate_keys()

class Vote:
    def __init__(self, voted_for: str):
        self.voted_for = voted_for
        
    def __str__(self):
        print(f"Voted for: {self.voted_for}")

class Candidate:
    def __init__(self, candidate_id: int, candidate_name: str, total_votes: int = 0):
        self.candidate_id = candidate_id
        self.candidate_name = candidate_name
        self.total_votes = total_votes
        
    def __str__(self):
        return f"Candidate ID: {self.candidate_id}, Name: {self.candidate_name}, Total Votes: {self.total_votes}"

Jason = Candidate(1, "Jason Tan")
Naomi = Candidate(2, "Naomi Chow")
    
def encrypt_vote(public_key, vote, candidates):       
    candidate_to_encrypted_value = {}
    
    # Loop through the list of candidates with their indices
    for idx, candidate in enumerate(candidates):
        # Assign each candidate's name as a key and their index as the value in the dictionary
        # so, { Jason : 0
        #       Naomi   : 1
        #     }  for example. 
        candidate_to_encrypted_value[candidate.candidate_name] = idx
    if vote.voted_for in candidate_to_encrypted_value:
        encrypted_vote = public_key.encrypt(candidate_to_encrypted_value[vote.voted_for]) #encrypting the index value, 
                                                                                          #so Alice will be encrypt(0) and Bob will be encrypt(1)
    else:
        raise ValueError("Invalid vote (Pallier)")
    return encrypted_vote
    
def main():
    public_key, private_key = generate_keys()
    
    # Define candidates
    Jason = Candidate(1, "Jason")
    Naomi = Candidate(2, "Naomi")

    # Create votes
    votes = [
        Vote("Jason"),
        Vote("Jason"),
        Vote("Naomi"),
        Vote("Naomi"),
        Vote("Jason")
    ]

    # Encrypt votes
    encrypted_votes = [encrypt_vote(public_key, vote, [Jason, Naomi]) for vote in votes]

    # Tally votes homomorphically
    encrypted_tally = sum(encrypted_votes, public_key.encrypt(0)) #value of all the votes added up. 
                                                                  #since Bob's vote represents 1 and Alice represents 0, 
                                                                  #Bob's tally will be the sum of the VALUES, 
                                                                  #while Alice's tally will be the total number of votes - Bob's tally
    final_tally = private_key.decrypt(encrypted_tally)

    # Output results
    print(f"Final Tally: Jason: {len(votes) - final_tally}, Naomi: {final_tally} ")

if __name__ == "__main__":
    main()
