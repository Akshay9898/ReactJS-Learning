from django.db import models

# Create your models here.
class LoginForm(models.Model):
    username = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    password = models.CharField(max_length=50)

    def get_details(self):
        data = {
            "username": self.username,
            "email": self.email,
            "password":self.password
        }
        return data