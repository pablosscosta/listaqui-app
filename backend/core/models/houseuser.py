from django.db import models
from .user import User
from .house import House

class HouseUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='house_membership')
    house = models.ForeignKey(House, on_delete=models.CASCADE, related_name='members')
    is_admin = models.BooleanField(default=False)
    
    class Meta:
        unique_together = ('user', 'house')
        verbose_name_plural = "House Users"

    def __str__(self):
        return f"{self.user.email} - {self.house.name}"