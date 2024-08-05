# hello/models.py
from django.db import models

class Department(models.Model):
    departmentid = models.AutoField(primary_key=True)
    departmentname = models.CharField(max_length=255, unique=True)

    class Meta:
        db_table = 'departments'

    def __str__(self):
        return self.departmentname
    
class UserType(models.Model):
    usertypeid = models.AutoField(primary_key=True)
    usertype = models.CharField(max_length=255, unique=True)

    class Meta:
        db_table = 'user_types'

    def __str__(self):
        return self.usertype

    
class UserAccount(models.Model):
    userid = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    firstname = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    usertype = models.CharField(max_length=255, default='Voter')
    department = models.ForeignKey(
        Department,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        to_field='departmentname',  # Reference the 'departmentname' field in the Department model
        db_column='department'  # Column name in the UserAccount table
    )

    class Meta:
        db_table = 'user_accounts'

    def __str__(self):
        return f"{self.firstname} {self.lastname} ({self.username})"



class Election(models.Model):
    STATUS_CHOICES = [
        ('Scheduled', 'Scheduled'),
        ('Completed', 'Completed'),
        ('Ongoing', 'Ongoing'),
    ]

    ELECTION_TYPE_CHOICES = [
        ('Candidates', 'Candidates'),
        ('Topics', 'Topics'),
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

     
    
class ElectionVoterStatus(models.Model):
    status_id = models.AutoField(primary_key=True)
    election = models.ForeignKey(Election, on_delete=models.CASCADE, db_column='election_id')
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, db_column='userid')
    has_voted = models.BooleanField(default=False)

    class Meta:
        unique_together = ('election', 'user')
        db_table = 'election_voter_status'

    def __str__(self):
        return f"User: {self.user}, Election: {self.election}, Has Voted: {self.has_voted}"

