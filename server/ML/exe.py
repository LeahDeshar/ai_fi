import pandas as pd
import joblib
import numpy as np
from fastapi import FastAPI,HTTPException
from pydantic import BaseModel

app = FastAPI()


model_filename = 'exercise_recommender_model.pkl'
encoder_filename = 'label_encoders.pkl'
model = joblib.load(model_filename)
label_encoders = joblib.load(encoder_filename)

df = pd.read_csv('gym/exercises.csv')
df['target'] = df['target'].astype(str)  
df['target'] = label_encoders['target'].transform(df['target'])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Exercise Recommender API"}

@app.get("/recommend-exe")
async def recommend_exercises(target_input: str, k: int = 5):
    try:
        available_targets = label_encoders['target'].classes_
        
        if target_input not in available_targets:
            return {"error": f"Target input '{target_input}' not found in available target classes: {list(available_targets)}"}

        target_encoded = label_encoders['target'].transform([target_input])[0]

        similar_exercises = df[df['target'] == target_encoded]

        if similar_exercises.empty:
            return {"error": f"No exercises found for the target '{target_input}' (encoded as {target_encoded})."}

        recommendations = similar_exercises.head(k)

        recommendations_dict = recommendations.fillna("N/A").to_dict(orient='records')
        return {"recommendations": recommendations_dict}

    except ValueError as e:
        return {"error": f"Value error occurred: {str(e)}"}
    except Exception as e:
        return {"error": str(e)}

@app.get("/recommend-exe")
async def recommend_exercises(target_input: str, k: int = 5):
    try:
        available_targets = label_encoders['target'].classes_
        
        print("target_input",target_input)
        
        if target_input not in available_targets:
            return {"error": f"Target input '{target_input}' not found in available target classes: {list(available_targets)}"}

      
        target_encoded = label_encoders['target'].transform([target_input])[0]
        print(target_encoded)

        
        df['target'] = label_encoders['target'].transform(df['target'].astype(str))

        similar_exercises = df[df['target'] == target_encoded]

        if similar_exercises.empty:
            return {"error": f"No exercises found for the target '{target_input}' (encoded as {target_encoded})."}

        recommendations = similar_exercises.head(k)
        recommendations_dict = recommendations.fillna("N/A").to_dict(orient='records')
        return {"recommendations": recommendations_dict}

    except ValueError as e:
        return {"error": f"Value error occurred: {str(e)}"}

    except Exception as e:
        return {"error": str(e)}







# SLEEP RECOMENDATION==================================

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


# CALORIE INTAKE RECOMENDATION==================================

# Load the pre-trained model and scaler
model = joblib.load('calorie_model.joblib')
scaler = joblib.load('calorie_scaler.joblib')

# Define the input data model
class CalorieInput(BaseModel):
    age: int
    weight_kg: float
    height_m: float
    gender: int  
    BMI: float
    BMR: float
    activity_level: int 


@app.post("/predict-calorie")
async def predict_calories(input_data: CalorieInput):
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









# DIET RECOMENDATION==================================

# Load the model
model_filename = 'recipe_recommender_knn.pkl'
model = joblib.load(model_filename)

# Define request body
class RecipeRequest(BaseModel):
    recipe_id: int
    k: int = 5  
@app.post("/recommend-diet")
async def recommend_recipes(request: RecipeRequest):
    try:
        
        diet_data = pd.read_csv("diet/recipes.csv")
        nutritional_cols = ["RecipeId", "Calories", "FatContent", "SaturatedFatContent", 
                            "CholesterolContent", "SodiumContent", "CarbohydrateContent", 
                            "FiberContent", "SugarContent", "ProteinContent"]
        
        nutritional_df = diet_data[nutritional_cols]
        
        input_recipe = nutritional_df[nutritional_df["RecipeId"] == request.recipe_id]
        if input_recipe.empty:
            raise HTTPException(status_code=404, detail="Recipe not found")

        distances, indices = model.kneighbors(input_recipe[nutritional_cols[1:]], n_neighbors=request.k + 1)
        
        closest_indices = indices[0][1:]  
        closest_recipes = diet_data.iloc[closest_indices]
       
        closest_recipes = closest_recipes.replace([np.inf, -np.inf], 0).fillna(0)

        return closest_recipes.to_dict(orient='records')
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))