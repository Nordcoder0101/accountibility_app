from django.db import models
from apps.login_and_registration.models import User

class AgreementManager(models.Manager):
    def agreement_validation(self, postData):
        errors = {}
        if len(postData['description']) < 8:
           errors['description'] = "Length of agreement must be at least characters 8 long"
        if postData['frequency'] == "long_term":
            if len(postData['due_date']) == 0:
                errors['due_date'] = "Please enter a date"
        return errors
        

class Agreement(models.Model):
    description = models.CharField(max_length=100)
    frequency_of_agreement = models.CharField(max_length=50, null = True)
    is_longterm = models.BooleanField(default = False)
    is_completed = models.BooleanField(default = False)
    due_date = models.DateTimeField(null = True)
    created_by = models.ForeignKey(User, related_name="agreements")
    objects = AgreementManager()