from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt  # Remove for production

@csrf_exempt  # Remove for production (CSRF protection for token endpoint)
def get_csrf_token(request):
  return JsonResponse({'csrfToken': request.META['CSRF_TOKEN']})

