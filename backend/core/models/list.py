from django.db import models
from .house import House

class ListType(models.TextChoices):
    EMERGENCY = 'EMERGENCY', 'Emergencial'
    MONTHLY = 'MONTHLY', 'Mensal'

class List(models.Model):
    title = models.CharField(max_length=255)
    house = models.ForeignKey(House, on_delete=models.CASCADE, related_name='lists')
    list_type = models.CharField(
        max_length=10,
        choices=ListType.choices,
        default=ListType.MONTHLY
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'list'