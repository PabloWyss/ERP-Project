# Generated by Django 4.2 on 2023-04-18 09:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('item_model_specification', '0001_initial'),
        ('item_image', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='attachment',
            name='item_model_specification',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='item_model_specification.itemmodelspecification'),
        ),
    ]