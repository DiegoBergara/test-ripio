# Generated by Django 3.0.4 on 2020-03-18 22:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Account",
            fields=[
                ("account_id", models.AutoField(primary_key=True, serialize=False)),
                ("funds", models.FloatField(default=1000)),
            ],
        ),
        migrations.CreateModel(
            name="Currency",
            fields=[
                (
                    "currency_name",
                    models.CharField(max_length=5, primary_key=True, serialize=False),
                ),
                ("exchange_rate", models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name="Transaction",
            fields=[
                ("transaction_id", models.AutoField(primary_key=True, serialize=False)),
                ("amount", models.IntegerField()),
                ("description", models.CharField(max_length=200)),
                ("date_time", models.DateTimeField(auto_now=True)),
                (
                    "destiny",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="destiny",
                        to="myapi.Account",
                    ),
                ),
                (
                    "origin",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="origin",
                        to="myapi.Account",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Person",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=20)),
                ("lastname", models.CharField(max_length=20)),
                ("ci", models.IntegerField()),
                ("birthday", models.DateField()),
                ("address", models.CharField(max_length=60)),
                ("creation_date", models.DateField(auto_now=True)),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="account",
            name="currency",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="myapi.Currency"
            ),
        ),
        migrations.AddField(
            model_name="account",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL
            ),
        ),
    ]
