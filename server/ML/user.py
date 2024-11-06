# import socketio
# import pandas as pd
# from sklearn.ensemble import IsolationForest
# import numpy as np


# def detect_anomalies(user_data):
#     df = pd.DataFrame(user_data)

    
#     features = ['waterIntake', 'calorieIntake', 'sleepDuration', 'dailySteps']

#     # Filter out rows with missing or non-numeric data
#     df = df[features].apply(pd.to_numeric, errors='coerce').dropna()

#     # Initialize the Isolation Forest model
#     model = IsolationForest(contamination=0.05, random_state=42)  # Adjust contamination as needed

#     # Fit the model and predict anomalies
#     predictions = model.fit_predict(df)

#     # Convert the predictions to a pandas Series for easier handling
#     df['anomaly'] = predictions
#     # 1 indicates normal, -1 indicates anomaly
#     anomalies = df[df['anomaly'] == -1]

#     return anomalies
# # Create a Socket.IO client
# sio = socketio.Client()

# # Define the event handler for the userActivities event
# @sio.event
# def connect():
#     print("Connected to server!")

# @sio.event
# def disconnect():
#     print("Disconnected from server!")

# @sio.event
# def userActivities(data):
#     # print("Received user activities:", data)
#     activities = data['activities']  

#     # Call the anomaly detection function
#     anomalies = detect_anomalies(activities)

#     if not anomalies.empty:
#         print(f"Anomalies detected: {anomalies}")
#         sio.emit('anomaliesDetected', anomalies.to_dict(orient='records'))
#     else:
#         print("No anomalies detected.")
#         sio.emit('anomaliesDetected', [])
    
    
   
# sio.connect('http://localhost:8080')  
# sio.wait()


import socketio
import pandas as pd
from sklearn.ensemble import IsolationForest

# Create a Socket.IO client
sio = socketio.Client()

# Define the motivational messages for each feature
MOTIVATIONAL_MESSAGES = {
    "waterIntake": "It seems you didn't drink enough water today. Stay hydrated!",
    "calorieIntake": "Your calorie intake is unusually low. Remember to fuel your body well!",
    "sleepDuration": "Your sleep duration was lower than usual. Consider getting some rest!",
    "dailySteps": "Your daily steps are unusually low today. Consider going for a walk.",
}

def detect_feature_anomalies(df):
    """Detect anomalies for each feature and return anomalies with messages."""
    anomalies = []
    
    # Isolation Forest model parameters
    contamination = 0.05
    random_state = 42
    
    # Detect anomalies in each feature
    for feature in MOTIVATIONAL_MESSAGES.keys():
        # Check if the feature has at least one valid data point
        if df[feature].dropna().shape[0] > 0:
            # Initialize an Isolation Forest model for each feature
            model = IsolationForest(contamination=contamination, random_state=random_state)
            
            # Fit the model and predict anomalies
            predictions = model.fit_predict(df[[feature]])
            
            # Identify anomalies in the feature
            df[f'{feature}_anomaly'] = predictions
            feature_anomalies = df[df[f'{feature}_anomaly'] == -1]
            
            # If anomalies are found, generate messages
            if not feature_anomalies.empty:
                anomalies.append({
                    "feature": feature,
                    "anomalies": feature_anomalies[[feature]].to_dict(orient='records'),
                    "message": MOTIVATIONAL_MESSAGES[feature]
                })
        else:
            print(f"Skipping feature '{feature}' due to insufficient data.")
    
    return anomalies
# Define the event handler for the userActivities event
@sio.event
def connect():
    print("Connected to server!")

@sio.event
def disconnect():
    print("Disconnected from server!")

@sio.event
def userActivities(data):
    activities = data['activities']
    df = pd.DataFrame(activities)

    # Filter out rows with missing or non-numeric data
    df = df.apply(pd.to_numeric, errors='coerce').dropna()

    # Detect anomalies in individual features
    anomalies = detect_feature_anomalies(df)

    if anomalies:
        print(f"Anomalies detected with messages: {anomalies}")
        sio.emit('anomaliesDetected', {"anomalies": anomalies})
    else:
        print("No anomalies detected.")
        sio.emit('anomaliesDetected', {"anomalies": []})

# Connect to the Socket.IO server
sio.connect('http://localhost:8080')
sio.wait()
