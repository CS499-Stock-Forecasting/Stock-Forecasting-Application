from rest_framework import serializers
from .models import StockData, Users

class StockDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockData
        fields = ('ticker', 'data') # may not need to serialize data since it is stored in JSON format

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('username', 'password', 'ticker') # may not need to serialize data since it is stored in JSON format