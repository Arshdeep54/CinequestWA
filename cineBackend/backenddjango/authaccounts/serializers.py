from rest_framework import serializers
from .models import UserAccount
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from .utils import Util


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


class UserChangePassSerializer(serializers.Serializer):
    password = serializers.CharField(
        max_length=255, style={"input_type": "password"}, write_only=True
    )
    password2 = serializers.CharField(
        max_length=255, style={"input_type": "password"}, write_only=True
    )

    class Meta:
        fields = ["password", "password2"]

    def validate(self, attrs):
        password = attrs.get("password")
        password2 = attrs.get("password2")
        user = self.context.get("user")
        if password != password2:
            raise serializers.ValidationError(
                "password and confirm password didn't matched"
            )
        user.set_password(password)
        user.save()
        return attrs


class SendPasswordResetEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        fields = ["email"]

    def validate(self, attrs):
        email = attrs.get("email")
        if UserAccount.objects.filter(email=email).exists():
            user = UserAccount.objects.get(email=email)
            uid = urlsafe_base64_encode(force_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            link = "http://localhost:3000/auth/user/reset" + uid + "/" + token
            print(link)
            email_data = {
                "email_subject": "Password Reset Auto Generated Mail",
                "email_body": "Hey "
                + user.name
                + ",\n"
                + "This is an auto generated Email from CineQuest-Img.Click the link below to reset password \n"
                + link
                + " \nLink valid only for 20 minutes ",
                "email_to": email,
            }
            Util.sendEmail(email_data)

            return attrs
        else:
            raise serializers.ValidationError("Not a registered email ")


class UserResetPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(
        max_length=255, style={"input_type": "password"}, write_only=True
    )
    password2 = serializers.CharField(
        max_length=255, style={"input_type": "password"}, write_only=True
    )

    class Meta:
        fields = ["password", "password2"]

    def validate(self, attrs):
        try:
            password = attrs.get("password")
            password2 = attrs.get("password2")
            uid = self.context.get("uid")
            token = self.context.get("token")
            if password != password2:
                raise serializers.ValidationError(
                    "password and confirm password didn't matched"
                )
            id = smart_str(urlsafe_base64_decode(uid))
            user = UserAccount.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise serializers.ValidationError(
                    "Token is expired or not valid try again"
                )
            user.set_password(password)
            user.save()
            return attrs
        except DjangoUnicodeDecodeError as identifier:
            PasswordResetTokenGenerator().check_token(user, token)
            raise serializers.ValidationError("Token is expired or not valid try again")
