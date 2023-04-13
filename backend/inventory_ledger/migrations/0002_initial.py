# Generated by Django 4.2 on 2023-04-12 12:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('warehouse', '0001_initial'),
        ('inventory_ledger', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='inventoryledger',
            name='warehouse',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='inventory_ledgers', to='warehouse.warehouse'),
        ),
    ]
