# Generated by Django 5.0.7 on 2024-11-27 14:03

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0023_notification"),
    ]

    operations = [
        migrations.CreateModel(
            name="HospitalNotification",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("consultation_type", models.CharField(max_length=20)),
                ("message", models.TextField()),
                ("created_at", models.DateTimeField(default=django.utils.timezone.now)),
                ("is_read", models.BooleanField(default=False)),
                (
                    "hospital",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="app.hospital"
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
