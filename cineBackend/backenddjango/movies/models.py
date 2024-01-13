from django.db import models
from django.conf import settings


class Movie(models.Model):
    title = models.CharField(max_length=255)
    trailer_link = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    storyline = models.TextField()
    poster_link = models.TextField()
    duration = models.CharField(max_length=255)
    language = models.CharField(max_length=255, default="Hindi")
    rating = models.DecimalField(max_digits=2, decimal_places=1)
    platform = models.CharField(max_length=255, default="Youtube")
    platform_link = models.CharField(max_length=255, default="")
    genre = models.CharField(max_length=255, default="comedy")
    release_date = models.DateField()
    director = models.CharField(max_length=255)
    writers = models.TextField()
    starcast = models.TextField()
    production = models.CharField(max_length=255)


class FavouriteMovie(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    movie = models.ForeignKey(
        Movie, on_delete=models.CASCADE, related_name="isfavourite"
    )
    # last_update = models.DateTimeField(auto_now_add=True)


class Review(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    oneliner = models.TextField()
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name="reviews")
    description = models.TextField()
    userProfile = models.TextField(
        default="http://arshdeep54.pythonanywhere.com/media/profile_images/defaultprofile.png"
    )
    made_at = models.DateTimeField(auto_now_add=True)
    likes = models.PositiveIntegerField(default=0)
    dislikes = models.PositiveIntegerField(default=0)


class ReviewFromWeb(models.Model):
    review_id = models.CharField(max_length=255)
    user = models.CharField(max_length=255)
    movie = models.ForeignKey(
        Movie, on_delete=models.CASCADE, related_name="webreviews"
    )
    userProfile = models.TextField(
        default="http://arshdeep54.pythonanywhere.com/media/profile_images/defaultprofile.png"
    )
    oneliner = models.TextField()
    description = models.TextField()
    made_at = models.DateField()
    likes = models.PositiveIntegerField(default=0)
    dislikes = models.PositiveIntegerField(default=0)


class Like(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    review = models.ForeignKey(Review, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


class Dislike(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    review = models.ForeignKey(Review, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


class Reply(models.Model):
    review = models.ForeignKey(Review, on_delete=models.CASCADE, related_name="replies")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    userProfile = models.TextField(
        default="http://arshdeep54.pythonanywhere.com/media/profile_images/defaultprofile.png"
    )


class LikeWeb(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    review = models.ForeignKey(ReviewFromWeb, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


class DislikeWeb(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    review = models.ForeignKey(ReviewFromWeb, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


class ReplyWeb(models.Model):
    review = models.ForeignKey(
        ReviewFromWeb, on_delete=models.CASCADE, related_name="replies"
    )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    userProfile = models.TextField(
        default="http://arshdeep54.pythonanywhere.com/media/profile_images/defaultprofile.png"
    )
