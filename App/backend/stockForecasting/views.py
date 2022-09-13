from django.shortcuts import render
from rest_framework import viewsets
from .serializers import StockDataSerializer
from .models import StockData

# Create your views here.

class StockDataView(viewsets.ModelViewSet):
    serializer_class = StockDataSerializer
    queryset = StockData.objects.all()