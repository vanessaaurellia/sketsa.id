# Generated by Django 4.0.1 on 2022-01-30 07:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('commissions', '0008_commissions_main_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='seller',
            name='user',
        ),
    ]
