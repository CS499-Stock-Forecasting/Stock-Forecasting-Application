import requests
import math
import datetime
import copy

def predict(originalJsonData):
    ## Get data from AlphaVantage
    url = " https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=" + originalJsonData["ticker"] + "&apikey=RO71SZX5F72HYPEQ"
    originalJsonData["data"] = requests.get(url).json()
    data = originalJsonData["data"]["Monthly Time Series"]

    ## Dictionary to store each stock data type per date
    columns = {"1. open" : [0, 0, 0], "2. high" : [0, 0, 0], "3. low" : [0, 0, 0], "4. close" : [0, 0, 0], "5. volume" : [0, 0, 0]}

    ## Size of AlphaVantage data
    s = len(data)

    ## Calculate the intercept and slope of each stock data type
    for col in columns:
        # Calculate intercept and initial slope
        # Based on https://en.wikipedia.org/wiki/Simple_linear_regression#Numerical_example
        index = 1

        x = 0
        y = 0
        x_sqr = 0
        xy = 0

        intercept = None

        for i in reversed(data):
            point = float(data[i][col])

            # For the intercept, we just need the first data point
            if index == 1:
                intercept = point

            x += index
            y += point
            x_sqr += index * index
            xy += index * point

            index += 1

        slope = (s * xy - x * y) / (s * x_sqr - x * x)
        
        # Calculate the positive or negative bias towards the slope, based on z-scores calulated from the mean and standard deviation
        mean = y / s
        sample_sd = 0

        for i in reversed(data):
            point = float(data[i][col])
            
            sample_sd += (point - mean) * (point - mean)

        sample_sd = math.sqrt(sample_sd / (s - 1))

        # The z-scores will determine if the data is more "optimistic" or "pessimistic" about the future
        # Positive z-scores indicate good days, while negative z-scores indicate bad days
        n_z_scores = 0
        z_scores = 0
        adj_s = s

        for i in reversed(data):
            point = float(data[i][col])

            z_score = (point - mean) / sample_sd

            if z_score > 0:
                z_s_ceil = math.ceil(z_score)
                z_scores += z_s_ceil
                adj_s += z_s_ceil - 1
            elif z_score < 0:
                z_s_floor = -math.floor(z_score)
                n_z_scores += z_s_floor
                adj_s += z_s_floor - 1

        # The bias is essentially the ratio of (scaled) negative to positive z-scores, with a significant digits adjustment based off the mean
        log_mean = math.log10(math.trunc(math.fabs(mean)))

        slope += ((z_scores - n_z_scores) / adj_s) * math.pow(10, math.ceil(log_mean + (math.ceil(log_mean) == log_mean)) - 3)

        columns[col][0] = intercept
        columns[col][1] = slope

    ## Predict specified number of days
    num_new_days = 5

    for i in range(1, num_new_days + 1):
        next_date = datetime.date.today() + datetime.timedelta(i)
        for col in columns:
            columns[col][2] = columns[col][0] + columns[col][1] * (s + i)
        originalJsonData["data"]["Monthly Time Series"][next_date.isoformat()] = copy.deepcopy(columns)

    return originalJsonData
