from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Place(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name =  models.CharField(max_length=255)
    image = models.CharField(max_length=256)
    number_of_tables = models.IntegerField(default=1)

    def __str__(self):
        return "{}/{}".format(self.owner.username, self.name)

class Category(models.Model):
    place = models.ForeignKey(Place, on_delete=models.CASCADE, related_name="categories")
    name = models.CharField(max_length=255)

    def __str__(self):
        return "{}/{}".format(self.place, self.name)

class MenuItem(models.Model):
    place = models.ForeignKey(Place, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="menu_items")
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=255)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return "{}/{}".format(self.category, self.name)
