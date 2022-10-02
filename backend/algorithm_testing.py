import requests
import pandas as pd
import matplotlib.pyplot as plt

def data_linear_regression_graph(sym, name, graph, figname):
    # Cache Series from data DataFrame
    partial_data = data[name]

    # Get the number of consecutive pairs in the data
    x = partial_data.size - 1

    # Create the regression line
    avg_slope = 0
    intercept = partial_data[0]

    for i in range(x):
        avg_slope += partial_data[i + 1] - partial_data[i]
    avg_slope /= x

    # If permitted, graph out the data with the regression line
    if graph:
        partial_data_plot = partial_data.plot(figsize = (8, 5))
        partial_data_plot.plot([intercept + avg_slope * i for i in range(x + 1)])
        partial_data_plot.get_figure().savefig(figname)

    # Print out the next predicted value and the deviation (range the actual value could fall on)
    deviation = None
    prediction = None

    ## Volume needs to be a whole number
    if name == "volume":
        deviation = round(partial_data.std())
        prediction = round(intercept + avg_slope * (x + 1))
    else:
        deviation = round(partial_data.std(), 2)
        prediction = round(intercept + avg_slope * (x + 1), 2)

    print("(" + sym + ")", name, "next day:", prediction, "+-", deviation)


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

# Reverse all data
data = data.iloc[::-1]

###### Regression Techniques WIP

data_linear_regression_graph(symbol, "close", False, "")
