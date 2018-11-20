from django.db import models
from apps.login_and_registration.models import User

class Agreement(models.Model):
    description = models.CharField(max_length=100)
    frequency_of_agreement = models.CharField(max_length=50, null = True)
    is_longterm = models.BooleanField(default = False)
    is_completed = models.BooleanField(default = False)
    due_date = models.DateTimeField(null = True)
    created_by = models.ForeignKey(User, related_name="agreements")