from django.db import models

class Products(models.Model):
    product_id = models.IntegerField()
    description = models.CharField(max_length=200)
    datetime = models.DateTimeField()
    longitude = models.FloatField()
    latitude = models.FloatField()
    elevation = models.IntegerField()
    