import pandas as pd
import joblib
import numpy as np
from fastapi import FastAPI,HTTPException

# Load the dataset
df = pd.read_csv('gym/exercises.csv')

# Load the RandomForest model and label encoders
# rf = joblib.load('exe_model.pkl')
# label_encoders = joblib.load('exe_label_encoders.pkl')

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




# Load the pre-trained model and scaler
model = joblib.load('calorie_model.joblib')
scaler = joblib.load('calorie_scaler.joblib')

# Define the input data model
class CalorieInput(BaseModel):
    age: int
    weight_kg: float
    height_m: float
    gender: int  # 0 for female, 1 for male
    BMI: float
    BMR: float
    activity_level: int  # 1 for sedentary, 2 for lightly active, etc.


# Define a POST method for predictions
@app.post("/predict-calorie")
async def predict_calories(input_data: CalorieInput):
    # Convert input data to pandas DataFrame
    new_data = pd.DataFrame({
        'age': [input_data.age],
        'weight(kg)': [input_data.weight_kg],
        'height(m)': [input_data.height_m],
        'gender': [input_data.gender],
        'BMI': [input_data.BMI],
        'BMR': [input_data.BMR],
        'activity_level': [input_data.activity_level]
    })

    # Scale the input data
    new_data_scaled = scaler.transform(new_data)

    # Make predictions
    predicted_calories = model.predict(new_data_scaled)

    # Return the prediction result
    return {"predicted_calories": predicted_calories[0]}










# Diet recommender

# Load the model
model_filename = 'recipe_recommender_knn.pkl'
model = joblib.load(model_filename)

# Define request body
class RecipeRequest(BaseModel):
    recipe_id: int
    k: int = 5  # Default number of closest recipes to return
@app.post("/recommend-diet")
async def recommend_recipes(request: RecipeRequest):
    try:
        # Assume nutritional_df is still available
        # You may need to load it from the CSV or prepare it again
        diet_data = pd.read_csv("diet/recipes.csv")
        nutritional_cols = ["RecipeId", "Calories", "FatContent", "SaturatedFatContent", 
                            "CholesterolContent", "SodiumContent", "CarbohydrateContent", 
                            "FiberContent", "SugarContent", "ProteinContent"]
        
        nutritional_df = diet_data[nutritional_cols]
        
        input_recipe = nutritional_df[nutritional_df["RecipeId"] == request.recipe_id]
        if input_recipe.empty:
            raise HTTPException(status_code=404, detail="Recipe not found")

        distances, indices = model.kneighbors(input_recipe[nutritional_cols[1:]], n_neighbors=request.k + 1)
        
        closest_indices = indices[0][1:]  # Exclude the first element (recipe itself)
        closest_recipes = diet_data.iloc[closest_indices]
         # Replace infinite values with a specific value (e.g., 0) and NaN values
        closest_recipes = closest_recipes.replace([np.inf, -np.inf], 0).fillna(0)

        return closest_recipes.to_dict(orient='records')
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))