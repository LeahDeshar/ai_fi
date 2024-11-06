import socketio
import pandas as pd
from sklearn.ensemble import IsolationForest
import numpy as np


def detect_anomalies(user_data):
    df = pd.DataFrame(user_data)

    
    features = ['waterIntake', 'calorieIntake', 'sleepDuration', 'dailySteps']

    # Filter out rows with missing or non-numeric data
    df = df[features].apply(pd.to_numeric, errors='coerce').dropna()

    # Initialize the Isolation Forest model
    model = IsolationForest(contamination=0.05, random_state=42)  # Adjust contamination as needed

    # Fit the model and predict anomalies
    predictions = model.fit_predict(df)

    # Convert the predictions to a pandas Series for easier handling
    df['anomaly'] = predictions
    # 1 indicates normal, -1 indicates anomaly
    anomalies = df[df['anomaly'] == -1]

    return anomalies
# Create a Socket.IO client
sio = socketio.Client()

# Define the event handler for the userActivities event
@sio.event
def connect():
    print("Connected to server!")

@sio.event
def disconnect():
    print("Disconnected from server!")

@sio.event
def userActivities(data):
    # print("Received user activities:", data)
    activities = data['activities']  

    # Call the anomaly detection function
    anomalies = detect_anomalies(activities)

    if not anomalies.empty:
        print(f"Anomalies detected: {anomalies}")
        sio.emit('anomaliesDetected', anomalies.to_dict(orient='records'))
    else:
        print("No anomalies detected.")
        sio.emit('anomaliesDetected', [])
    
    
   
sio.connect('http://localhost:8080')  
sio.wait()


