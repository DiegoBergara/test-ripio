# Generated by Django 3.0.4 on 2020-03-24 04:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('myapi', '0003_remove_person_creation_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='transaction',
            name='description',
        ),
        migrations.AddField(
            model_name='transaction',
            name='transaction_currency',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.SET_DEFAULT, to='myapi.Currency'),
        ),
    ]