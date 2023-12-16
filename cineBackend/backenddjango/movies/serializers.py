from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Movie


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
