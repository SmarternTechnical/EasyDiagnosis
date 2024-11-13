# Generated by Django 3.2.25 on 2024-11-12 16:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0012_remove_cart_user_cart_user_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cart',
            name='p_id',
        ),
        migrations.AddField(
            model_name='cart',
            name='product',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='app.pharmasupport'),
        ),
        migrations.AlterField(
            model_name='cart',
            name='item_count',
            field=models.IntegerField(default=0),
        ),
    ]