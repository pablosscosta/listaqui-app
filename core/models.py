from django.db import models
from django.utils.text import slugify

class House(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class List(models.Model):
    name = models.CharField(max_length=255)
    house = models.ForeignKey(House, on_delete=models.CASCADE, related_name='lists')

    def __str__(self):
        return f"{self.name} ({self.house.name})"

class Item(models.Model):
    name = models.CharField(max_length=255)
    list = models.ForeignKey(List, on_delete=models.CASCADE, related_name='items')
    purchased = models.BooleanField(default=False)

    def __str__(self):
        return self.name