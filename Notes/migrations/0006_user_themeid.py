# Generated by Django 3.1.4 on 2021-04-28 15:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Notes', '0005_auto_20210405_0040'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='themeid',
            field=models.IntegerField(default=0),
        ),
    ]
