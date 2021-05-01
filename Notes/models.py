from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class User(AbstractUser):
    verified = models.BooleanField(default=False)
    reset = models.BooleanField(default=False)
    photoURL = models.URLField(blank=True, default="")
    themeid = models.IntegerField(default=0)
    pass
