from django.db import models

# Create your models here.
class StockData(models.Model):
    ticker = models.CharField("Ticker", max_length=5)
    data = models.JSONField("Data")

    def _str_(self):
        return self.ticker

class Users(models.Model):
    username = models.CharField(max_length=32)
    password = models.CharField(max_length=32)
    ticker = models.CharField("Ticker", max_length=5) # users may have multiple tickers

    def _str_(self):
        return self.username