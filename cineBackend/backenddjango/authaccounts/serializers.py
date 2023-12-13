from rest_framework import serializers
from .models import UserAccount


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ["email", "name", "password", "password2"]
        extra_kwargs = {"password": {"write_only": True}}

    password2 = serializers.CharField(style={"input_type": "password"}, write_only=True)

    def validate(self, attrs):
        password = attrs.get("password")
        password2 = attrs.get("password2")
        if password != password2:
            raise serializers.ValidationError(
                "password and confirm password didn't matched"
            )
        return attrs

    def create(self, validated_data):
        return UserAccount.objects.create_user(**validated_data)


class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ["email", "password"]

    email = serializers.CharField(max_length=255)


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ["id", "email", "name"]
