# Generated by Django 5.1.2 on 2024-11-10 12:30

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0010_remove_cart_pharma_support_cart_p_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='user_id',
            field=models.UUIDField(default=uuid.uuid4, editable=False, null=True),
        ),
    ]
