import jwt
from datetime import datetime, timedelta

def generate_jwt(userid, username, firstname, lastname, department, usertype):
  """Generates a JWT token for a given user ID."""
  try:
    payload = {
      'exp': datetime.utcnow() + timedelta(minutes=60),  # Token expiration time
      'iat': datetime.utcnow(),
      'sub': userid,  # Subject (user ID)
      'username': username,
      'firstname': firstname,
      'lastname': lastname,
      'department': department,
      'usertype': usertype     
    }
    secret_key = 'qwert12345!@#$%'  # Replace with a strong secret key
    token = jwt.encode(payload, secret_key, algorithm='HS256')
    print(token)
    return token
  except Exception as e:
    # Handle exceptions (e.g., invalid key, encoding errors)
    err_msg = f"Error generating JWT: {str(e)}"
    return err_msg

