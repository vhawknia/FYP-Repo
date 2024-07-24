# hello/models.py
from django.db import models

class Department(models.Model):
    departmentname = models.CharField(max_length=255)
    departmentid = models.IntegerField(primary_key=True)

    class Meta:
        db_table = 'departments'  # Specify the existing table name
