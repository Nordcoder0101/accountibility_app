from django.db import models
from apps.login_and_registration.models import User

class Message(models.Model):
    created_by = models.ForeignKey(User, related_name="created_messages")
    sent_by = models.ForeignKey(User, related_name="received_messages")
    content = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

class Comment(models.Model): 
    pass

class Group(models.Model):
    name = models.CharField(max_length=100)
    users_in_group = models.ManyToManyField(User, related_name="groups_user_is_in")


