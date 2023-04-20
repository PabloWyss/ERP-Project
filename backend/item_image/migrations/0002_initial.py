# Generated by Django 4.2 on 2023-04-20 08:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('item_image', '0001_initial'),
        ('item_model', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='attachment',
            name='item_model',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='item_model.itemmodel'),
        ),
    ]
