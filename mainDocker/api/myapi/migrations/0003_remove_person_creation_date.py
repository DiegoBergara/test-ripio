# Generated by Django 3.0.4 on 2020-03-19 03:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myapi', '0002_auto_20200318_2357'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='person',
            name='creation_date',
        ),
    ]
