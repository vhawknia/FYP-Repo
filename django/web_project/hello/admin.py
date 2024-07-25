from django.contrib import admin

# Register your models here.
# admin.py

from .models import Election

@admin.register(Election)
class ElectionAdmin(admin.ModelAdmin):
    list_display = ('title', 'startDate', 'endDate', 'timezone')
    search_fields = ('title', 'description')
    list_filter = ('startDate', 'endDate', 'timezone')
