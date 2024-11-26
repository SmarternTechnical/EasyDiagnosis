import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models
from app.models import UserAccount  # Import the UserAccount model

# Function to set a default UserAccount for existing rows
def set_user_account(apps, schema_editor):
    UserInfo = apps.get_model('app', 'UserInfo')
    default_user_account = UserAccount.objects.first()  # Use an existing UserAccount or create a new one if needed
    if not default_user_account:
        # If no UserAccount exists, create one as a default (optional)
        default_user_account = UserAccount.objects.create(username="default_user")  # Customize as needed
    
    # Set the default user_account for rows where it's None
    for user_info in UserInfo.objects.filter(user_account=None):
        user_info.user_account = default_user_account
        user_info.save()

class Migration(migrations.Migration):

    dependencies = [
        ("app", "0021_merge_20241125_2310"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="userinfo",
            name="user_id",
        ),
        migrations.AddField(
            model_name="userinfo",
            name="id",
            field=models.BigAutoField(
                auto_created=True,
                default=1,
                primary_key=True,
                serialize=False,
                verbose_name="ID",
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="userinfo",
            name="user_account",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="userinfo",
                to=settings.AUTH_USER_MODEL,
            ),
            preserve_default=False,
        ),
        migrations.RunPython(set_user_account),  # Add this line to run the custom function
    ]
