# Generated by Django 4.2 on 2023-04-15 09:12

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('item', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ItemVariantSpecification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('valid_from', models.DateTimeField()),
                ('valid_to', models.DateTimeField()),
                ('weight_net_kg', models.FloatField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0)])),
                ('weight_gross_kg', models.FloatField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0)])),
                ('length_cm', models.FloatField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0)])),
                ('width_cm', models.FloatField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0)])),
                ('height_cm', models.FloatField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0)])),
                ('size', models.CharField(choices=[('S', 'S'), ('M', 'M'), ('L', 'L'), ('XL', 'XL'), ('XXL', 'XXL'), ('3XL', '3XL'), ('4XL', '4XL'), ('5XL', '5XL'), ('36', '36'), ('37', '37'), ('38', '38'), ('39', '39'), ('40', '40'), ('41', '41'), ('42', '42'), ('43', '43'), ('44', '44'), ('45', '45'), ('46', '46')], max_length=50)),
                ('purchase_price_net_eur', models.FloatField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0)])),
                ('sale_price_net_eur', models.FloatField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0)])),
                ('stock_level_minimum', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0)])),
                ('stock_level_reorder', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0)])),
                ('item_changes', models.CharField(max_length=150)),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='item_variant_specifications', to='item.item')),
            ],
        ),
    ]
