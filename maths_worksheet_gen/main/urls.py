from django.urls import path
from . import views

urlpatterns = [
    path('getQuestion/topic=<str:topic>&difficulty=<str:difficulty>&problemSolving=<str:problemSolving>', views.getQuestion, name='getQuestion'),
]