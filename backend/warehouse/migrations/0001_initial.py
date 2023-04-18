# Generated by Django 4.2 on 2023-04-17 12:33

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('item', '0001_initial'),
        ('merchant', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Warehouse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('contact', models.CharField(blank=True, max_length=50, null=True)),
                ('address', models.CharField(blank=True, max_length=50, null=True)),
                ('country_code', models.CharField(blank=True, max_length=2, null=True)),
                ('phone', models.CharField(blank=True, max_length=50, null=True)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('status', models.CharField(choices=[('Active', 'Active'), ('Inactive', 'Inactive')], default='Active')),
                ('is_standard', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='WarehouseItemInventory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stock_level_current', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0)])),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='item.item')),
                ('warehouse', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='warehouse.warehouse')),
            ],
        ),
        migrations.AddField(
            model_name='warehouse',
            name='items',
            field=models.ManyToManyField(related_name='warehouses', through='warehouse.WarehouseItemInventory', to='item.item'),
        ),
        migrations.AddField(
            model_name='warehouse',
            name='merchants',
            field=models.ManyToManyField(related_name='warehouses', to='merchant.merchant'),
        ),
    ]
