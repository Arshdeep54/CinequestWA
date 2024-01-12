from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Movie, Review, ReviewFromWeb, FavouriteMovie, Reply


# class LanguageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = language
#         fields = ["name"]


# class PlatformSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = platform
#         fields = ["name"]


class MovieSerializer(serializers.ModelSerializer):
    # language = LanguageSerializer(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = "__all__"


class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.name")
    movie = serializers.ReadOnlyField(source="movie.id")

    class Meta:
        model = Review
        fields = "__all__"


class WebReviewSerializer(serializers.ModelSerializer):
    movie = serializers.ReadOnlyField(source="movie.id")

    class Meta:
        model = ReviewFromWeb
        fields = "__all__"


class FavoriteMovieSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.name")

    class Meta:
        model = FavouriteMovie
        fields = "__all__"


class LikedReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"


class ReplySerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.name")
    review = serializers.ReadOnlyField(source="review.id")

    class Meta:
        model = Reply
        fields = "__all__"
