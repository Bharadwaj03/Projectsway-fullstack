from django.db import models


from django.db import models
from django.contrib.auth.models import User

class Project(models.Model):
    projectName = models.CharField(max_length=255)
    teamMembers = models.JSONField(default=list)  # Assuming teamMembers is a list of Slack user IDs
    teamMembersDetails = models.JSONField(default=list)  # List of Slack user details (including profile picture URL)
    creationDate = models.DateTimeField(auto_now_add=True)
    createdBy = models.ForeignKey(User, on_delete=models.CASCADE)
   
  


class Documentation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.CharField(max_length=255)
    template_link = models.URLField(blank=True)
    attachment = models.FileField(upload_to='attachments/', null=True, blank=True)


    def __str__(self):
        return self.description 




from django.db import models

class Feedback(models.Model):
   

    
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    priority_choices = [
        ('P3', 'Low (P3)'),
        ('P2', 'Minor (P2)'),
        ('P1', 'Major (P1)'),
        ('P0', 'Critical (P0)'),
    ]

    description = models.TextField()
    attachment = models.FileField(upload_to='feedback_attachments/', blank=True, null=True)
    priority = models.CharField(max_length=2, choices=priority_choices)
    location = models.CharField(max_length=255)
    date = models.DateTimeField(auto_now_add=True)

    
    def __str__(self):
        
        return  self.description
