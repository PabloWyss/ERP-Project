# Generated by Django 4.2 on 2023-04-19 21:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('partner', '0001_initial'),
        ('merchant', '0001_initial'),
        ('item', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='merchant',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='items', to='merchant.merchant'),
        ),
        migrations.AddField(
            model_name='item',
            name='partners',
            field=models.ManyToManyField(blank=True, related_name='items', to='partner.partner'),
        ),
    ]
