# Generated by Django 4.0.1 on 2022-01-30 04:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commissions', '0006_remove_seller_id_seller_remove_user_user_id_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='commissions',
            name='commissions_price',
            field=models.DecimalField(decimal_places=2, default=1, max_digits=10),
        ),
    ]
