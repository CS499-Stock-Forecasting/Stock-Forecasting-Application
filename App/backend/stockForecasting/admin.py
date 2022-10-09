from django.contrib import admin
from .models import StockData, Users

# Register your models here.
admin.site.register(StockData)
admin.site.register(Users)