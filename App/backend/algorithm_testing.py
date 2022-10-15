import requests
import math as m
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

def data_linear_regression_graph(sym, name, precision_offset = 0, graph = False, figname = ""):
    # Cache Series from data DataFrame
    partial_data = data[name]

    # Get the number of data points
    x = partial_data.size

    # Create the regression line
    intercept = partial_data[0]
    min_slope = m.inf
    max_slope = -m.inf

    ## Find min and max slope
    for i in range(1, x):
        slope = (partial_data[i] - intercept) / i
        if slope < min_slope:
            min_slope = slope
        if slope > max_slope:
            max_slope = slope

    ## Select the slope that fits the most data, based on the distance from the data to the current line with the current slope
    best_slope = None

    ### Determine how much to increment per slope for a balance between accuracy and speed (triple digit iterations is acceptable)
    diff_slope = max_slope - min_slope
    digits = m.ceil(m.log10(diff_slope))
    offset = 0
    
    if m.fmod(diff_slope, 10**(digits)) == 0:
        offset = 1
    
    precision = 10**(digits - 3 + offset - precision_offset) # precision offset can be used to manually adjust the increments
    
    min_dist = m.inf

    for i in np.arange(min_slope, max_slope, precision):
        dist = 0
        for j in range(x):
            dist += abs(partial_data[j] - (i * j + intercept))
        dist /= x
        if dist < min_dist:
            best_slope = i
            min_dist = dist
        else:
            break

    # If permitted, graph out the data with the regression line
    if graph:
        partial_data_plot = partial_data.plot(figsize = (8, 5))
        partial_data_plot.plot([intercept + best_slope * i for i in range(x + 1)])
        partial_data_plot.get_figure().savefig(figname)

    # Print out the next predicted value and the deviation (range the actual value could fall on)
    deviation = None
    prediction = None

    ## Volume needs to be a whole number
    if name == "volume":
        deviation = round(partial_data.std())
        prediction = round(intercept + best_slope * (x + 1))
    else:
        deviation = round(partial_data.std(), 2)
        prediction = round(intercept + best_slope * (x + 1), 2)

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

data_linear_regression_graph(symbol, "volume")
