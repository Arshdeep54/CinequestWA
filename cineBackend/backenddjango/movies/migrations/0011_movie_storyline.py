# Generated by Django 5.0 on 2023-12-24 09:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0010_reviewfromweb_review_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='movie',
            name='storyline',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
    ]
