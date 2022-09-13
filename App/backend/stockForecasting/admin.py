from django.contrib import admin
from .models import StockData

class StockDataModelAdmin(admin.ModelAdmin):
    list_display = ('ticker', 'data')

# Register your models here.

admin.site.register(StockData, StockDataModelAdmin)