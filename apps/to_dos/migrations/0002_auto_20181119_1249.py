# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2018-11-19 20:49
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('to_dos', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='agreement',
            name='due_date',
            field=models.DateTimeField(null=True),
        ),
    ]
