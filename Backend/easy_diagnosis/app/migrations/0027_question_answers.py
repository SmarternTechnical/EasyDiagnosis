# Generated by Django 4.2.16 on 2024-11-27 14:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0026_question'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='answers',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
