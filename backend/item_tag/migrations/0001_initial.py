# Generated by Django 4.2 on 2023-04-19 21:38

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('item', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ItemTag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tag_name', models.CharField(max_length=50, unique=True)),
                ('items', models.ManyToManyField(blank=True, related_name='item_tags', to='item.item')),
            ],
        ),
    ]
