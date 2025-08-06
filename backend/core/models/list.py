from django.db import models
from .house import House

class List(models.Model):
    title = models.CharField(max_length=255)
    house = models.ForeignKey(House, on_delete=models.CASCADE, related_name='lists')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'list'