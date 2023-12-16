from django.contrib import admin
from . import models


# Register your models here.
@admin.register(models.Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ["title"]


# admin.site.register(models.platform)
# admin.site.register(models.language)
