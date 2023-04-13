# Generated by Django 4.2 on 2023-04-12 12:59

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('item', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ItemModelSpecification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('color', models.CharField(choices=[('Beige', 'Beige'), ('Black', 'Black'), ('Blue', 'Blue'), ('Brown', 'Brown'), ('Green', 'Green'), ('Red', 'Red'), ('Yellow', 'Yellow'), ('White', 'White')], max_length=50)),
                ('valid_from', models.DateTimeField()),
                ('valid_to', models.DateTimeField()),
                ('condition', models.CharField(choices=[('New', 'New'), ('Used', 'Used')], default='New')),
                ('category', models.CharField(choices=[('Shoes', 'Shoes'), ('Apparel', 'Apparel')], default='Shoes')),
                ('brand_name', models.CharField(max_length=50)),
                ('brand_collection', models.CharField(max_length=50)),
                ('description_long', models.CharField(max_length=1000)),
                ('description_short', models.CharField(max_length=150)),
                ('style', models.CharField(max_length=50)),
                ('care_instructions', models.CharField(max_length=150)),
                ('items', models.ManyToManyField(blank=True, related_name='item_model_specifications', to='item.item')),
            ],
        ),
    ]
