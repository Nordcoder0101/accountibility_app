# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2018-11-20 19:26
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('login_and_registration', '0003_user_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='image',
        ),
    ]
