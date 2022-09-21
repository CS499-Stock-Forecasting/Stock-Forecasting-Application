import requests
import pandas as pd
import matplotlib.pyplot as plt

def data_linear_regression_graph(name, figname):
    partial_data = data[name]

    x = partial_data.size - 1

    avg_slope = 0
    mean = partial_data.mean()

    for i in range(x):
        avg_slope += partial_data[i + 1] - partial_data[i]
    avg_slope /= x

    partial_data_plot = partial_data.plot()
    partial_data_plot.plot([mean + avg_slope * i for i in range(x)])
    partial_data_plot.get_figure().savefig(figname)


###### Get data from AlphaVantage

symbol = "IBM"
url = "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=" + symbol + "&apikey=RO71SZX5F72HYPEQ"

data = requests.get(url).json()["Monthly Time Series"]

###### Data Manipulation

# Convert data from AlphaVantage to DataFrame
data = pd.DataFrame(data)

# Transpose the data so that all values can fall on a few columns
data = data.transpose()

# Remove numbers from columns
data = data.rename(lambda x: x[3:], axis = "columns")

# Convert all string values to floats; we cannot work with numbers that are strings
data = data.astype(float)

###### Linear Regression WIP

data_linear_regression_graph("close", "close_linreg")
