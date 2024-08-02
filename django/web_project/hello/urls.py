from django.urls import path
from hello import views
from .views import vote, terminate_election, handle_new_election, DisplayElections, delete_election


urlpatterns = [
    path("", views.home, name="home"),
    path('vote/', vote, name='vote'),
    path('terminate/', terminate_election, name='terminate_election'),
    path('loginFunc/', views.loginFunc, name='login_view'),
    path('CSRFTokenDispenser/', views.CSRFTokenDispenser, name='CSRFTokenDispenser'),
    path('api/form-data/', handle_new_election, name='handle_new_election'),
    path('api/elections/', DisplayElections.as_view(), name='election-list'),
    path('api/elections/<int:id>/', views.delete_election, name='delete_election'),
    path('insertAcc/', views.insertAcc, name='insertAcc')
]
