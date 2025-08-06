from django.db import models
from .list import List

class Item(models.Model):
    list = models.ForeignKey(List, on_delete=models.CASCADE, related_name='items')
    description = models.CharField(max_length=255)
    amount = models.IntegerField(default=1)
    unit_of_measure = models.CharField(max_length=50, blank=True)
    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'item'