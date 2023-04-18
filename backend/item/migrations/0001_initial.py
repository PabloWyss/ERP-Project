# Generated by Django 4.2 on 2023-04-18 11:10

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('release_date', models.DateTimeField(auto_now_add=True)),
                ('status', models.CharField(choices=[('Active', 'Active'), ('Inactive', 'Inactive')], default='Active')),
                ('sku', models.CharField(max_length=20, unique=True)),
                ('ean', models.CharField(blank=True, max_length=20, null=True)),
                ('upc', models.CharField(blank=True, max_length=20, null=True)),
                ('series', models.CharField(blank=True, max_length=20, null=True)),
                ('amazon_asin', models.CharField(blank=True, max_length=20, null=True)),
                ('amazon_fnsku', models.CharField(blank=True, max_length=20, null=True)),
                ('name', models.CharField(max_length=50, unique=True)),
                ('has_variants', models.BooleanField(default=False)),
            ],
        ),
    ]
