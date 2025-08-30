import uuid
from django.db import models
from django.conf import settings

class House(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=10, unique=True, blank=True)
    members = models.ManyToManyField(settings.AUTH_USER_MODEL, through='HouseUser', related_name='houses')

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.code:
            base_code = self.name[:3].upper()
            unique_part = str(uuid.uuid4())[:4].upper()
            self.code = f"{base_code}{unique_part}"
        
        super().save(*args, **kwargs)