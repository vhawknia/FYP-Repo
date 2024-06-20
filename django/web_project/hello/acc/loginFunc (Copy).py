import jsonFuncs
from django.http import HttpResponse

def login(request):
  if request.method == 'POST':
    try:
      # Access JSON data from request body
      data = request.POST
      username = data.get('username')
      password = data.get('password')

      # Error handling for missing keys
      if not username or not password:
        return JsonResponse({'error': 'Missing username or password'}, status=400)

      # Assuming jsonFuncs.jsonReader reads accounts.json and returns a list
      accList = jsonFuncs.jsonReader("accounts.json")

      for x in accList:
        if x.email.lower() == username.lower() and x.pw == password:
          role = x.role
          break  # Exit loop after finding a match
      else:
        role = "deny"

      return JsonResponse({'role': role})  # Return JSON response
    except json.JSONDecodeError:
      return JsonResponse({'error': 'Invalid JSON data'}, status=400)
  else:
    return JsonResponse({'error': 'Invalid request method'}, status=400)
