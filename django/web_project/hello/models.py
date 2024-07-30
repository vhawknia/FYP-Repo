# hello/models.py
from django.db import models

# class Department(models.Model):
#     departmentname = models.CharField(max_length=255)
#     departmentid = models.IntegerField(primary_key=True)

#     class Meta:
#         db_table = 'departments'  # Specify the existing table name

# models.py

class Election(models.Model):
    STATUS_CHOICES = [
        ('Scheduled', 'Scheduled'),
        ('Ongoing', 'Ongoing'),
        ('Completed', 'Completed')
    ]

    ELECTION_TYPE_CHOICES = [
        ('Candidates', 'Candidates'),
        ('Topics', 'Topics')
    ]

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    startDate = models.DateTimeField()
    endDate = models.DateTimeField()
    timezone = models.CharField(max_length=50, blank=True, null=True)
    electionType = models.CharField(max_length=10, choices=ELECTION_TYPE_CHOICES, default='Candidates')
    candidates = models.JSONField(blank=True, null=True)
    topics = models.JSONField(blank=True, null=True)
    voters = models.JSONField(blank=True, null=True)
    votersDept = models.JSONField(blank=True, null=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Scheduled')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'elections'

    def __str__(self):
        return self.title