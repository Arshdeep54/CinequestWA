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
    path(
        "movies/<int:movie_id>/reviews/<int:pk>/unlike/",
        views.ReviewList.as_view(),
        name="review-unlike",
    ),
    path(
        "movies/<int:movie_id>/reviews/<int:pk>/undislike/",
        views.ReviewList.as_view(),
        name="review-undislike",
    ),
    path(
        "movies/<int:movie_id>/webreviews/<int:pk>/like/",
        views.WebReviewList.as_view(),
        name="web-review-list-create",
    ),
    path(
        "movies/<int:movie_id>/webreviews/<int:pk>/dislike/",
        views.WebReviewList.as_view(),
        name="web-review-list-create",
    ),
    path(
        "movies/<int:movie_id>/webreviews/<int:pk>/unlike/",
        views.WebReviewList.as_view(),
        name="web-review-list-create",
    ),
    path(
        "movies/<int:movie_id>/webreviews/<int:pk>/undislike/",
        views.WebReviewList.as_view(),
        name="web-review-list-create",
    ),
    path("liked-reviews/", views.LikedReviewList.as_view(), name="liked-review-list"),
    path(
        "liked-reviews-web/",
        views.LikedWebReviewList.as_view(),
        name="liked-review-list",
    ),
    path(
        "disliked-reviews/",
        views.DisLikedReviewList.as_view(),
        name="disliked-review-list",
    ),
    path(
        "disliked-reviews-web/",
        views.DisLikedWebReviewList.as_view(),
        name="disliked-review-list",
    ),
    path(
        "movies/<int:movie_id>/reviews/<int:review_id>/replies/",
        views.ReplyListCreateView.as_view(),
        name="reply-list-create",
    ),
    path(
        "movies/<int:movie_id>/reviews/<int:review_id>/replies/<int:pk>/",
        views.ReplyDeleteView.as_view(),
        name="reply-delete",
    ),
    path(
        "movies/<int:movie_id>/webreviews/<int:review_id>/replies/",
        views.ReplyWebListCreateView.as_view(),
        name="reply-list-create-web",
    ),
    path(
        "movies/<int:movie_id>/webreviews/<int:review_id>/replies/<int:pk>/",
        views.ReplyWebDeleteView.as_view(),
        name="reply-delete-web",
    ),
    path("user-replies/", views.UserRepliesListView.as_view(), name="user-replies"),
    path(
        "user-replies/web/",
        views.UserRepliesListView.as_view(),
        {"reply_type": "web"},
        name="user-replies-web-list",
    ),
]
