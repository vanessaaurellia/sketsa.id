# Generated by Django 4.0.1 on 2022-01-31 09:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commissions', '0012_commissions_seller'),
    ]

    operations = [
        migrations.RenameField(
            model_name='commissions',
            old_name='seller',
            new_name='id_seller',
        ),
        migrations.AlterField(
            model_name='commissions',
            name='main_image',
            field=models.ImageField(default='images/commissions_images/default.jpg', upload_to='images/commissions_images/'),
        ),
    ]
