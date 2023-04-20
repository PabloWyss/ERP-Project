# Generated by Django 4.2 on 2023-04-19 21:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('item_tag', '0001_initial'),
        ('merchant', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='itemtag',
            name='merchant',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='item_tags', to='merchant.merchant'),
        ),
    ]
