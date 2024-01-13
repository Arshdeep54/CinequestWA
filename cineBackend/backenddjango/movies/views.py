from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import (
    ListCreateAPIView,
    ListAPIView,
    RetrieveUpdateDestroyAPIView,
    CreateAPIView,
    DestroyAPIView,
)
from itertools import chain
from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from .models import (
    Movie,
    Review,
    ReviewFromWeb,
    FavouriteMovie,
    Like,
    Dislike,
    Reply,
    LikeWeb,
    DislikeWeb,
    ReplyWeb,
)
from .serializers import (
    MovieSerializer,
    ReviewSerializer,
    WebReviewSerializer,
    FavoriteMovieSerializer,
    LikedReviewSerializer,
    LikedWebReviewSerializer,
    ReplySerializer,
    ReplyWebSerializer,
)
from .filters import MovieFilter


# Create your views here.
class MoviesViewSet(APIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = MovieFilter

    search_fields = ["title", "description"]
    ordering_fields = ["rating", "release_date"]

    def get_serializer_context(self):
        return {"request": self.request}


class MoviesList(ListCreateAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = MovieFilter

    search_fields = ["title", "description"]
    ordering_fields = ["rating", "release_date"]

    def get_serializer_context(self):
        return {"request": self.request}


class MovieDetails(RetrieveUpdateDestroyAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    lookup_field = "id"

    # def delete(self, request, id):
    #     movie = get_object_or_404(Movie, pk=id)
    #     movie.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)


class ReviewList(ListCreateAPIView):
    serializer_class = ReviewSerializer

    # permission_classes = [IsAuthenticated]
    def get_permissions(self):
        if self.request.method == "GET":
            # Allow any (no authentication) for GET requests
            return [AllowAny()]
        elif self.request.method == "POST":
            # Require authentication for POST requests
            return [IsAuthenticated()]
        return super().get_permissions()

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        return Review.objects.filter(movie__id=movie_id)

    def perform_create(self, serializer):
        user = self.request.user
        movie_id = self.kwargs["movie_id"]
        movie = Movie.objects.get(id=movie_id)
        serializer.save(user=user, movie=movie)

    def post(self, request, *args, **kwargs):
        if "/like/" in self.request.path:
            return self.like(request, *args, **kwargs)
        elif "/dislike/" in self.request.path:
            return self.dislike(request, *args, **kwargs)
        elif "/unlike/" in self.request.path:
            return self.unlike(request, *args, **kwargs)
        elif "/undislike/" in self.request.path:
            return self.undislike(request, *args, **kwargs)
        else:
            return super().post(request, *args, **kwargs)

    def like(self, request, *args, **kwargs):
        review = self.get_object()
        user = request.user
        if Dislike.objects.filter(user=user, review=review).exists():
            return Response(
                {
                    "detail": "Cannot like a review that is already disliked",
                    "oppexists": 1,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not Like.objects.filter(user=user, review=review).exists():
            Like.objects.create(user=user, review=review)
            review.likes += 1
            review.save()
            return Response({"detail": "Review liked successfully"})
        else:
            return Response(
                {"detail": "Review is already liked by this user"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def dislike(self, request, *args, **kwargs):
        review = self.get_object()
        user = request.user
        if Like.objects.filter(user=user, review=review).exists():
            return Response(
                {
                    "detail": "Cannot dislike a review that is already liked",
                    "oppexists": 1,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not Dislike.objects.filter(user=user, review=review).exists():
            Dislike.objects.create(user=user, review=review)
            review.dislikes += 1
            review.save()
            return Response({"detail": "Review disliked successfully"})
        else:
            return Response(
                {"detail": "Review is already disliked by this user"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def unlike(self, request, *args, **kwargs):
        review = self.get_object()
        user = request.user

        # Check if the user has already liked this review
        like_record = Like.objects.filter(user=user, review=review).first()
        if like_record:
            like_record.delete()
            review.likes -= 1
            review.save()
            return Response({"detail": "Review unliked successfully"})
        else:
            return Response(
                {"detail": "User has not liked this review"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def undislike(self, request, *args, **kwargs):
        review = self.get_object()
        user = request.user

        # Check if the user has already disliked this review
        dislike_record = Dislike.objects.filter(user=user, review=review).first()
        if dislike_record:
            dislike_record.delete()
            review.dislikes -= 1
            review.save()
            return Response({"detail": "Review undisliked successfully"})
        else:
            return Response(
                {"detail": "User has not disliked this review"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class ReviewDetails(RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class WebReviewList(ListCreateAPIView):
    serializer_class = WebReviewSerializer

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        return ReviewFromWeb.objects.filter(movie__id=movie_id)

    def perform_create(self, serializer):
        movie_id = self.kwargs["movie_id"]
        movie = Movie.objects.get(id=movie_id)
        serializer.save(movie=movie)

    def post(self, request, *args, **kwargs):
        if "/like/" in self.request.path:
            if not request.user.is_authenticated:
                return Response(
                    {"detail": "Authentication is required to like a review."},
                    status=status.HTTP_401_UNAUTHORIZED,
                )
            return self.like(request, *args, **kwargs)
        elif "/dislike/" in self.request.path:
            if not request.user.is_authenticated:
                return Response(
                    {"detail": "Authentication is required to like a review."},
                    status=status.HTTP_401_UNAUTHORIZED,
                )
            return self.dislike(request, *args, **kwargs)
        elif "/unlike/" in self.request.path:
            if not request.user.is_authenticated:
                return Response(
                    {"detail": "Authentication is required to like a review."},
                    status=status.HTTP_401_UNAUTHORIZED,
                )
            return self.unlike(request, *args, **kwargs)
        elif "/undislike/" in self.request.path:
            if not request.user.is_authenticated:
                return Response(
                    {"detail": "Authentication is required to like a review."},
                    status=status.HTTP_401_UNAUTHORIZED,
                )
            return self.undislike(request, *args, **kwargs)
        else:
            return super().post(request, *args, **kwargs)

    def like(self, request, *args, **kwargs):
        review = self.get_object()
        user = request.user
        if DislikeWeb.objects.filter(user=user, review=review).exists():
            return Response(
                {
                    "detail": "Cannot like a review that is already disliked",
                    "oppexists": 1,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not LikeWeb.objects.filter(user=user, review=review).exists():
            LikeWeb.objects.create(user=user, review=review)
            review.likes += 1
            review.save()
            return Response({"detail": "Review liked successfully"})
        else:
            return Response(
                {"detail": "Review is already liked by this user"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def dislike(self, request, *args, **kwargs):
        review = self.get_object()
        user = request.user
        if LikeWeb.objects.filter(user=user, review=review).exists():
            return Response(
                {
                    "detail": "Cannot dislike a review that is already liked",
                    "oppexists": 1,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not DislikeWeb.objects.filter(user=user, review=review).exists():
            DislikeWeb.objects.create(user=user, review=review)
            review.dislikes += 1
            review.save()
            return Response({"detail": "Review disliked successfully"})
        else:
            return Response(
                {"detail": "Review is already disliked by this user"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def unlike(self, request, *args, **kwargs):
        review = self.get_object()
        user = request.user

        # Check if the user has already liked this review
        like_record = LikeWeb.objects.filter(user=user, review=review).first()
        if like_record:
            like_record.delete()
            review.likes -= 1
            review.save()
            return Response({"detail": "Review unliked successfully"})
        else:
            return Response(
                {"detail": "User has not liked this review"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def undislike(self, request, *args, **kwargs):
        review = self.get_object()
        user = request.user

        # Check if the user has already disliked this review
        dislike_record = DislikeWeb.objects.filter(user=user, review=review).first()
        if dislike_record:
            dislike_record.delete()
            review.dislikes -= 1
            review.save()
            return Response({"detail": "Review undisliked successfully"})
        else:
            return Response(
                {"detail": "User has not disliked this review"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class WebReviewDetails(RetrieveUpdateDestroyAPIView):
    queryset = ReviewFromWeb.objects.all()
    serializer_class = WebReviewSerializer


class UserReviewList(ListAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Review.objects.filter(user=user)


class UserFavMoviesList(ListCreateAPIView):
    serializer_class = FavoriteMovieSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return FavouriteMovie.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserFavMovieDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = FavoriteMovieSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return FavouriteMovie.objects.filter(user=self.request.user)

    # def get_object(self):
    #     # Get the Movie ID from the URL
    #     movie_id = self.kwargs.get("movie_id")
    #     return FavouriteMovie.objects.get(user=self.request.user, movie__id=movie_id)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)


class LikedReviewList(ListAPIView):
    serializer_class = LikedReviewSerializer

    def get_queryset(self):
        user = self.request.user
        liked_reviews = Like.objects.filter(user=user).values_list("review", flat=True)
        return Review.objects.filter(pk__in=liked_reviews)


class DisLikedReviewList(ListAPIView):
    serializer_class = LikedReviewSerializer

    def get_queryset(self):
        user = self.request.user
        disliked_reviews = Dislike.objects.filter(user=user).values_list(
            "review", flat=True
        )
        return Review.objects.filter(pk__in=disliked_reviews)


class LikedWebReviewList(ListAPIView):
    serializer_class = LikedWebReviewSerializer

    def get_queryset(self):
        user = self.request.user
        liked_reviews = LikeWeb.objects.filter(user=user).values_list(
            "review", flat=True
        )
        return ReviewFromWeb.objects.filter(pk__in=liked_reviews)


class DisLikedWebReviewList(ListAPIView):
    serializer_class = LikedWebReviewSerializer

    def get_queryset(self):
        user = self.request.user
        disliked_reviews = DislikeWeb.objects.filter(user=user).values_list(
            "review", flat=True
        )
        return ReviewFromWeb.objects.filter(pk__in=disliked_reviews)


class ReplyListCreateView(ListCreateAPIView):
    serializer_class = ReplySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        review_id = self.kwargs.get("review_id")
        return Reply.objects.filter(review__id=review_id)

    def perform_create(self, serializer):
        if not self.request.user.is_authenticated:
            raise permissions.NotAuthenticated(
                "Authentication is required to create a reply."
            )

        user = self.request.user
        review_id = self.kwargs.get("review_id")
        review = get_object_or_404(Review, id=review_id)
        serializer.save(user=user, review=review)


class ReplyDeleteView(DestroyAPIView):
    queryset = Reply.objects.all()
    serializer_class = ReplySerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        review_id = self.kwargs.get("review_id")
        reply_id = self.kwargs.get("pk")
        reply = get_object_or_404(Reply, id=reply_id, review__id=review_id)
        if reply.user != self.request.user:
            raise permissions.PermissionDenied(
                "You do not have permission to delete this reply."
            )
        return reply


class ReplyWebListCreateView(ListCreateAPIView):
    serializer_class = ReplyWebSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        review_id = self.kwargs.get("review_id")
        return ReplyWeb.objects.filter(review__id=review_id)

    def perform_create(self, serializer):
        if not self.request.user.is_authenticated:
            raise permissions.NotAuthenticated(
                "Authentication is required to create a reply."
            )

        user = self.request.user
        review_id = self.kwargs.get("review_id")
        review = get_object_or_404(ReviewFromWeb, id=review_id)
        serializer.save(user=user, review=review)


class ReplyWebDeleteView(DestroyAPIView):
    queryset = ReplyWeb.objects.all()
    serializer_class = ReplyWebSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        review_id = self.kwargs.get("review_id")
        reply_id = self.kwargs.get("pk")
        reply = get_object_or_404(ReplyWeb, id=reply_id, review__id=review_id)
        if reply.user != self.request.user:
            raise permissions.PermissionDenied(
                "You do not have permission to delete this reply."
            )
        return reply


class UserRepliesListView(ListAPIView):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.query_params.get("reply_type") == "web":
            return ReplyWebSerializer
        else:
            return ReplySerializer

    def get_queryset(self):
        user = self.request.user
        replies_model = Reply.objects.filter(user=user)
        replies_web_model = ReplyWeb.objects.filter(user=user)
        return replies_model.union(replies_web_model)
