from django.shortcuts import render
from rest_framework import viewsets
from .serializers import StockDataSerializer, UsersSerializer
from .models import StockData, Users

# Create your views here.

class StockDataView(viewsets.ModelViewSet):
    serializer_class = StockDataSerializer
    queryset = StockData.objects.all()
    lookup_field = 'ticker'

class UserView(viewsets.ModelViewSet):
    serializer_class = UsersSerializer
    queryset = Users.objects.all()
    lookup_field = 'username'