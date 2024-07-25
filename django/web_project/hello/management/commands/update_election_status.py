# hello/management/commands/update_election_status.py

from django.core.management.base import BaseCommand
from django.utils import timezone
from hello.models import Election

class Command(BaseCommand):
    help = 'Update election statuses based on current time'

    def handle(self, *args, **kwargs):
        now = timezone.now()
        elections = Election.objects.all()
        for election in elections:
            if election.startDate > now:
                election.status = 'Scheduled'
            elif election.startDate <= now <= election.endDate:
                election.status = 'Ongoing'
            else:
                election.status = 'Completed'
            election.save()
        self.stdout.write(self.style.SUCCESS('Successfully updated election statuses'))
