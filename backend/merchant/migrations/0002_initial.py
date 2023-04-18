# Generated by Django 4.2 on 2023-04-18 09:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('merchant', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='merchant',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, related_name='merchant', to=settings.AUTH_USER_MODEL),
        ),
    ]
