# Generated by Django 3.2.25 on 2024-11-12 16:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0014_alter_cart_user_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cart',
            old_name='product',
            new_name='p_id',
        ),
    ]
