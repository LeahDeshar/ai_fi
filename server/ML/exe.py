import pandas as pd
import joblib
import numpy as np
from fastapi import FastAPI

# Load the dataset
df = pd.read_csv('gym/exercises.csv')

# Load the RandomForest model and label encoders
rf = joblib.load('exe_model.pkl')
label_encoders = joblib.load('exe_label_encoders.pkl')

# Define the FastAPI app
app = FastAPI()


# @app.get("/recommend/")
# async def recommend_exercises(target_input: str, k: int = 5):
#     try:
#         # Print available target classes for debugging
#         available_targets = label_encoders['target'].classes_
#         print(f"Available target classes: {available_targets}")
        
#         # Check if the target input is valid
#         if target_input not in available_targets:
#             return {"error": f"Target input '{target_input}' not found in available target classes: {list(available_targets)}"}

#         # Encode the target input using the label encoder
#         target_encoded = label_encoders['target'].transform([target_input])[0]
#         print(f"Encoded target input: {target_encoded}")

#         # Properly encode the 'target' column in the dataframe
#         df['target'] = label_encoders['target'].transform(df['target'].astype(str))

#         # Check how the encoded 'target' column looks after encoding
#         print(f"Sample encoded target column in dataset: {df['target'].head()}")

#         # Filter exercises based on the encoded target
#         similar_exercises = df[df['target'] == target_encoded]
#         print(f"Number of exercises found for the encoded target: {len(similar_exercises)}")

#         if similar_exercises.empty:
#             return {"error": f"No exercises found for the target '{target_input}' (encoded as {target_encoded})."}

#         # Return top k similar exercises
#         recommendations = similar_exercises.head(k)

#         # Convert recommendations to a dictionary
#         # recommendations_dict = recommendations.to_dict(orient='records')

#         recommendations = recommendations.fillna("N/A")  # Replace NaN with "N/A"

#         # Convert recommendations to a dictionary for JSON response
#         recommendations_dict = recommendations.to_dict(orient='records')

#         return {"recommendations": recommendations_dict}

#     except Exception as e:
#         # Log the error and return the exception message
#         print(f"Error occurred: {e}")
#         return {"error": str(e)}

from pydantic import BaseModel
@app.get("/recommend/")
async def recommend_exercises(target_input: str, k: int = 5):
    try:
        # Ensure the target input is valid
        available_targets = label_encoders['target'].classes_
        if target_input not in available_targets:
            return {"error": f"Target input '{target_input}' not found in available target classes: {list(available_targets)}"}

        # Encode the target input using the label encoder
        target_encoded = label_encoders['target'].transform([target_input])[0]

        # Properly encode the 'target' column in the dataframe
        # Ensure no unseen labels are present in the dataframe
        df['target'] = df['target'].astype(str)  # Ensure type consistency
        df['target'] = label_encoders['target'].transform(df['target'].astype(str))

        # Filter exercises based on the encoded target
        similar_exercises = df[df['target'] == target_encoded]

        if similar_exercises.empty:
            return {"error": f"No exercises found for the target '{target_input}' (encoded as {target_encoded})."}

        # Return top k similar exercises
        recommendations = similar_exercises.head(k)

        # Convert recommendations to a dictionary
        recommendations_dict = recommendations.fillna("N/A").to_dict(orient='records')

        return {"recommendations": recommendations_dict}

    except ValueError as e:
        # Handle unseen labels and other value errors
        return {"error": f"Value error occurred: {str(e)}"}

    except Exception as e:
        # Handle any other exceptions
        return {"error": str(e)}








# Load the saved model, scaler, and label encoders
model = joblib.load("sleep_duration_model.pkl")
scaler = joblib.load("scaler.pkl")
label_encoders = joblib.load("label_encoders.pkl")



# Define the input structure for the API
class UserInput(BaseModel):
    Gender: int  # 0 for Male, 1 for Female
    Age: int
    Occupation: int
    Physical_Activity_Level: int
    Stress_Level: int
    BMI_Category: int  # Encoded BMI Category

# API root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to the Sleep Recommendation API!"}

@app.post("/predict")
def predict_sleep_duration(user_input: UserInput):
    input_data = np.array([[user_input.Gender, user_input.Age, 
                            user_input.Occupation, user_input.Physical_Activity_Level, 
                            user_input.Stress_Level, user_input.BMI_Category]])
    
    # Scale the input data
    scaled_data = scaler.transform(input_data)
    
    # Predict sleep duration
    predicted_sleep_duration = model.predict(scaled_data)
    
    return {"predicted_sleep_duration": predicted_sleep_duration[0]}

# To retrieve label encoding for occupation and BMI categories
@app.get("/encodings")
def get_encodings():
    encodings = {}
    print(label_encoders)
    for column, le in label_encoders.items():
        
        encodings[column] = dict(zip(le.classes_, le.transform(le.classes_)))
    return encodings
