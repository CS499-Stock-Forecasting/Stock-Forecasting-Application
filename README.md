# Stock Forecasting Application

# Installation

### Backend

_Note: depending on python version `python` and `pip` commands may need to be replaced with `python3` and `pip3` respectively_

1. Clone repository in desired file location by opening terminal, navigating to file location and using command:

    ```
    git clone https://github.com/CS499-Stock-Forecasting/Stock-Forecasting-Application.git
    ```

2. Install latest version of python by visiting https://www.python.org/downloads/

3. Install pip environment:

    ```
    pip install pipenv
    ```

4. Navigate to /Stock-Forecasting-Application/App/ and open a pipenv shell:

    ```
    pipenv shell
    ```

5. Navigate to /Stock-Forecasting-Application/App/backend and install dependencies from requirements.txt

    ```
    pip install -r requirements.txt
    ```

6. Start server:
    ```
    python manage.py runserver
    ```

### Frontend

1. Install nodejs and npm by visiting https://nodejs.org/en/download/

2. Open a new terminal window and navigate to `/Stock-Forecasting-Application/frontend`

3. Download dependencies:
    ```
    npm install
    ```
4. Start the application:
    ```
    npm start
    ```
