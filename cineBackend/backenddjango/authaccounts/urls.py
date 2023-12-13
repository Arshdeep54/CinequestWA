from django.urls import path, include
from .views import (
    UserRegistrationView,
    UserLoginView,
    UserProfileView,
    UserChangePasswordView,
    SendPasswordResetEmailView,
    UserResetPasswordView
)

urlpatterns = [
    path("register/", UserRegistrationView.as_view(), name="register"),
    path("login/", UserLoginView.as_view(), name="login"),
    path("me/", UserProfileView.as_view(), name="profile"),
    path("changepassword/", UserChangePasswordView.as_view(), name="changepassword"),
    path(
        "send-reset-password-email/",
        SendPasswordResetEmailView.as_view(),
        name="sendresetemail",
    ),
    path("resetpassword/<uid>/<token>/", UserResetPasswordView.as_view(), name="resetpassword"),
]
