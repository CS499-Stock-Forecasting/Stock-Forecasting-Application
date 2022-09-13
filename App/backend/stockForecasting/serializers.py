from rest_framework import serializers
from .models import StockData

class StockDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockData
        fields = ('ticker', 'data') # may not need to serialize data since it is stored in JSON format