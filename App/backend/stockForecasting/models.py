from django.db import models

# Create your models here.
class StockData(models.Model):
    ticker = models.CharField("Ticker", max_length=5)
    data = models.JSONField("Data")

    def _str_(self):
        return self.ticker