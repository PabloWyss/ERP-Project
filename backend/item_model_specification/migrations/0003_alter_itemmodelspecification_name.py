# Generated by Django 4.2 on 2023-04-18 21:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('item_model_specification', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='itemmodelspecification',
            name='name',
            field=models.CharField(max_length=50),
        ),
    ]
