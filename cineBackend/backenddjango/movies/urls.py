from django.urls import path
from . import views

urlpatterns = [
    path("movies/", views.MoviesList.as_view()),
    path("movies/<int:id>/", views.MovieDetails.as_view()),
]
