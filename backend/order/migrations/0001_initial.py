# Generated by Django 4.2 on 2023-04-16 15:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('warehouse', '0001_initial'),
        ('item', '0002_initial'),
        ('partner', '0001_initial'),
        ('merchant', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_date', models.DateTimeField(auto_now_add=True)),
                ('is_refund', models.BooleanField(default=False)),
                ('quantity', models.IntegerField()),
                ('is_merchant_supplier', models.BooleanField(default=True)),
                ('items', models.ManyToManyField(blank=True, related_name='orders', to='item.item')),
                ('merchant', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='orders', to='merchant.merchant')),
                ('partner', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='orders', to='partner.partner')),
                ('warehouse', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='orders', to='warehouse.warehouse')),
            ],
        ),
    ]
