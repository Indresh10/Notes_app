# Generated by Django 3.1.4 on 2021-03-12 13:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Notes', '0002_user_reset'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='photoURl',
            field=models.URLField(blank=True, default=''),
        ),
    ]
