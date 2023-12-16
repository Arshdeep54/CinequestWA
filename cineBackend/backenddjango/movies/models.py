from django.db import models
from django.conf import settings


# Create your models here.
# class language(models.Model):
#     name = models.CharField(max_length=255, default="hindi")

#     def __str__(self) -> str:
#         return self.name


# class platform(models.Model):
#     name = models.CharField(max_length=255, default="Youtube", unique=True)

#     def __str__(self) -> str:
#         return self.name


class Movie(models.Model):
    title = models.CharField(max_length=255)
    trailer_link = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    poster_link = models.TextField()
    language = models.CharField(max_length=255, default="Hindi")
    rating = models.DecimalField(max_digits=2, decimal_places=2)
    platform = models.CharField(max_length=255, default="Youtube")
    release_date = models.DateField()


class Review(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name="reviews")
    description = models.TextField()
    made_at = models.DateTimeField(auto_now_add=True)
