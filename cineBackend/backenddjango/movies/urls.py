from django.urls import path
from . import views

urlpatterns = [
    path("movies/", views.MoviesList.as_view()),
    path("movies/<int:id>/", views.MovieDetails.as_view()),
    path(
        "movies/<int:movie_id>/reviews/",
        views.ReviewList.as_view(),
        name="review-list-create",
    ),
    path(
        "movies/<int:movie_id>/webreviews/",
        views.WebReviewList.as_view(),
        name="web-review-list-create",
    ),
    path(
        "movies/<int:movie_id>/reviews/<int:pk>/",
        views.ReviewDetails.as_view(),
        name="review-detail",
    ),
    path(
        "movies/<int:movie_id>/webreviews/<int:pk>/",
        views.WebReviewDetails.as_view(),
        name="web-review-detail",
    ),
    path("user-reviews/", views.UserReviewList.as_view()),
    path("user-favourite-movies/", views.UserFavMoviesList.as_view()),
    path(
        "favourite-movies/<int:pk>/",
        views.UserFavMovieDetailView.as_view(),
        name="favorite-movie-detail",
    ),
    path(
        "movies/<int:movie_id>/reviews/<int:pk>/like/",
        views.ReviewList.as_view(),
        name="review-like",
    ),
    path(
        "movies/<int:movie_id>/reviews/<int:pk>/dislike/",
        views.ReviewList.as_view(),
        name="review-dislike",
    ),
]
