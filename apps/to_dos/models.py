from django.db import models
from apps.login_and_registration.models import User

class Agreement(models.Model):
    description = models.CharField(max_length=100)
    is_daily = models.BooleanField()
    is_weekly = models.BooleanField()
    is_monthly = models.BooleanField()
    is_longterm = models.BooleanField()
    is_completed = models.BooleanField()
    due_date = models.DateTimeField(null = True)
    created_by = models.ForeignKey(User, related_name="agreements")