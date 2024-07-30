# hello/models.py
from django.db import models
from django.utils import timezone
import pytz

class Election(models.Model):
    STATUS_CHOICES = [
        ('Scheduled', 'Scheduled'),
        ('Ongoing', 'Ongoing'),
        ('Completed', 'Completed')
    ]
    
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    startDate = models.DateTimeField()
    endDate = models.DateTimeField()
    timezone = models.CharField(max_length=50, blank=True, null=True)
    candidates = models.JSONField(blank=True, null=True)
    voters = models.JSONField(blank=True, null=True)
    votersDept = models.JSONField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Scheduled')

    class Meta:
        db_table = 'elections'
        
    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.timezone:
            timezone_info = pytz.timezone(self.timezone)
            if self.startDate:
                self.startDate = timezone.localtime(self.startDate, timezone_info)
            if self.endDate:
                self.endDate = timezone.localtime(self.endDate, timezone_info)
            if self.created_at:
                self.created_at = timezone.localtime(self.created_at, timezone_info)
            if self.updated_at:
                self.updated_at = timezone.localtime(self.updated_at, timezone_info)

        super(Election, self).save(*args, **kwargs)
