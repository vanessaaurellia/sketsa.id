from email.policy import default
from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(primary_key=True, max_length=255)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    
    def __str__(self):
        return "%s %s" % (self.first_name, self.last_name)
    

class Seller(models.Model):
    seller_name = models.CharField(primary_key=True, max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.seller_name

    
class Commissions(models.Model):
    id_commissions = models.BigAutoField(primary_key=True)
    seller = models.ForeignKey(Seller, on_delete=models.CASCADE)
    commissions_name = models.CharField(max_length=255)
    description = models.CharField(max_length=2000)
    commissions_price = models.DecimalField(default=1, null=False, max_digits=10, decimal_places=2)
    main_image = models.ImageField(upload_to='images/commissions_images/', default='images/commissions_images/default.jpg')
    

class Reviews(models.Model):
    id_review = models.AutoField(primary_key=True)
    commissions = models.ForeignKey(Commissions, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.PositiveSmallIntegerField()
    
    
    
    