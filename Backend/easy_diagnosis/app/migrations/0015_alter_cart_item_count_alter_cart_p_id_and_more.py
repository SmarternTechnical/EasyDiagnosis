# Generated by Django 4.2.16 on 2024-11-22 09:30

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0014_labtestbooking'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cart',
            name='item_count',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='cart',
            name='p_id',
            field=models.CharField(default='temporary_default', max_length=255),
        ),
        migrations.AlterField(
            model_name='cart',
            name='user_id',
            field=models.UUIDField(default=uuid.uuid4, editable=False),
        ),
    ]
