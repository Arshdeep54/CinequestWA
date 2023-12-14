from django.db import models
from django.conf import settings
# Create your models here.
class language(models.Model):
    lang_name=models.CharField(max_length=255)

class platform(models.Model):
    platform_name=models.CharField(max_length=255)

class Movie(models.Model):
    title=models.CharField(max_length=255)
    trailer_link=models.CharField(max_length=255)
    description=models.CharField(max_length=255)
    poster_link=models.CharField(max_length=255)
    language=models.ForeignKey(language,on_delete=models.CASCADE,related_name='languages')
    rating=models.DecimalField(max_digits=1,decimal_places=1)
    platform=models.ForeignKey(platform,on_delete=models.CASCADE,related_name='platforms')
    
class Review(models.Modal):
    user=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    description=models.TextField()

