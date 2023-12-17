from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import (
    ListCreateAPIView,
    ListAPIView,
    RetrieveUpdateDestroyAPIView,
    CreateAPIView,
)
from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from .models import Movie, Review
from .serializers import MovieSerializer, ReviewSerializer
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
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        movie_id = self.kwargs["movie_id"]
        return Review.objects.filter(movie__id=movie_id)

    def perform_create(self, serializer):
        user = self.request.user
        movie_id = self.kwargs["movie_id"]
        movie = Movie.objects.get(id=movie_id)
        serializer.save(user=user, movie=movie)


class ReviewDetails(RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class UserReviewList(ListAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Review.objects.filter(user=user)
