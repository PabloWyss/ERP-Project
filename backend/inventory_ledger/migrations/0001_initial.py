# Generated by Django 4.2 on 2023-04-13 09:00

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('item', '0001_initial'),
        ('warehouse', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='InventoryLedger',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event_date', models.DateTimeField(auto_now_add=True)),
                ('event_type', models.CharField(choices=[('Inbound', 'Inbound'), ('Outbound', 'Outbound'), ('Found', 'Found'), ('Corrected', 'Corrected'), ('Disposed Of', 'Disposed Of')])),
                ('stock_level_initial', models.IntegerField(validators=[django.core.validators.MinValueValidator(0)])),
                ('quantity_altered', models.IntegerField()),
                ('stock_level_final', models.IntegerField(validators=[django.core.validators.MinValueValidator(0)])),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='inventory_ledgers', to='item.item')),
                ('warehouse', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='inventory_ledgers', to='warehouse.warehouse')),
            ],
        ),
    ]
