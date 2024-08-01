import jsonFuncs
import json
import mySQLfuncs
#from django.http import HttpResponse

"""
#@csrf_exempt 
def loginFunc(request):
  #if request.method == 'POST':
    try:
      # Access JSON data from request body
      data = request
      username = data.get('username')
      password = data.get('password')
    
      # Error handling for missing keys
      if not username or not password:
        return JsonResponse({'error': 'Missing username or password', 'username':username, 'password':password}, status=400)

      accList = jsonFuncs.jsonReader("accounts.json")

      for x in accList:
        if x["email"].lower() == username.lower() and x["pw"] == password:
          role = x["role"]
          return role
      else:
        #return JsonResponse({'role': role})  # Return JSON response
        return "deny"
    except json.JSONDecodeError:
      return JsonResponse({'error': 'Invalid JSON data'}, status=400)
  #else:
    #return JsonResponse({'error': 'Invalid request method'}, status=400)
"""

def loginFunc(request):
    try:
        # Access JSON data from request body
        data = request
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            return JsonResponse({'error': 'Missing username or password', 'username':username, 'password':password}, status=400)
        
        check = mySQLfuncs.sql_validateLogin(username.lower, password) 
        if check == 'deny':
            return "deny"
        else:
            return check
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON data'}, status=400)
        

if __name__ == "__main__":
    
    
    
    
    """
    print(loginFunc({
  "username": "A@mail.com",
  "password": "qwerty"
}))

"""
    
