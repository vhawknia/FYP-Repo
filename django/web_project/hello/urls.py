from django.urls import path
from hello import views
from .views import vote, terminate_election

urlpatterns = [
    path("", views.home, name="home"),
    path('vote/', vote, name='vote'),
    path('terminate/', terminate_election, name='terminate_election'),
]