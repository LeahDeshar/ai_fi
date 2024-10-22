import pandas as pd
import joblib
import numpy as np
from fastapi import FastAPI,HTTPException
from pydantic import BaseModel

app = FastAPI()
# cors setup
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



model_filename = 'exercise_recommender_model.pkl'
encoder_filename = 'exe_label_encoders.pkl'
model = joblib.load(model_filename)
label_encoders = joblib.load(encoder_filename)

df = pd.read_csv('gym/exercises.csv')
df['target'] = df['target'].astype(str)  
df['target'] = label_encoders['target'].transform(df['target'])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Exercise Recommender API"}

# exercise recommendation

@app.get("/recommend-exes")
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
        return {"errorssss": f"Value error occurred: {str(e)}"}
    except Exception as e:
        return {"errorsss": str(e)}

# @app.get("/recommend-exe")
# async def recommend_exercises(target_input: str, k: int = 5):
#     try:
#         available_targets = label_encoders['target'].classes_
        
#         print("target_input",target_input)
        
#         if target_input not in available_targets:
#             return {"error": f"Target input '{target_input}' not found in available target classes: {list(available_targets)}"}

      
#         target_encoded = label_encoders['target'].transform([target_input])[0]
#         print(target_encoded)

        
#         df['target'] = label_encoders['target'].transform(df['target'].astype(str))

#         similar_exercises = df[df['target'] == target_encoded]

#         if similar_exercises.empty:
#             return {"error": f"No exercises found for the target '{target_input}' (encoded as {target_encoded})."}

#         recommendations = similar_exercises.head(k)
#         recommendations_dict = recommendations.fillna("N/A").to_dict(orient='records')
#         return {"recommendations": recommendations_dict}

#     except ValueError as e:
#         return {"error": f"Value error occurred: {str(e)}"}

#     except Exception as e:
#         return {"error": str(e)}







# SLEEP RECOMENDATION==================================

model1 = joblib.load("sleep_duration_model1.pkl")
class SleepData(BaseModel):
    Gender: int  # 0 for Male, 1 for Female
    Age: int
    Occupation: int
    Physical_Activity_Level: int
    Stress_Level: int
    BMI_Category: int


@app.post("/predict-sleep")
def predict_sleep_duration(data: SleepData):
    # Extract data as a numpy array
    input_data = np.array([[data.Gender, data.Age, data.Occupation,
                            data.Physical_Activity_Level, data.Stress_Level, data.BMI_Category]])
    
    # Make a prediction
    prediction = model1.predict(input_data)
    
    # Return the predicted sleep duration
    return {"predicted_sleep_duration": prediction[0]}

@app.get("/encodings")
def get_encodings():
    encodings = {}
    print(label_encoders)
    for column, le in label_encoders.items():
        
        encodings[column] = dict(zip(le.classes_, le.transform(le.classes_)))
    return encodings


# CALORIE INTAKE RECOMENDATION==================================

# Load the pre-trained model and scaler
model2 = joblib.load('calorie_model.joblib')
scaler2 = joblib.load('calorie_scaler.joblib')

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
    new_data_scaled = scaler2.transform(new_data)

    # Make predictions
    predicted_calories = model2.predict(new_data_scaled)

    # Return the prediction result
    return {"predicted_calories": predicted_calories[0]}









# DIET RECOMENDATION==================================

# Load the model
# model_filename = 'recipe_recommender_knn.pkl'
# model3 = joblib.load(model_filename)

# # Define request body
# class RecipeRequest(BaseModel):
#     recipe_id: int
#     k: int = 5  
# @app.post("/recommend-diet")
# async def recommend_recipes(request: RecipeRequest):
#     try:
        
#         diet_data = pd.read_csv("diet/recipes.csv")
#         nutritional_cols = ["RecipeId", "Calories", "FatContent", "SaturatedFatContent", 
#                             "CholesterolContent", "SodiumContent", "CarbohydrateContent", 
#                             "FiberContent", "SugarContent", "ProteinContent"]
        
#         nutritional_df = diet_data[nutritional_cols]
        
#         input_recipe = nutritional_df[nutritional_df["RecipeId"] == request.recipe_id]
#         if input_recipe.empty:
#             raise HTTPException(status_code=404, detail="Recipe not found")

#         distances, indices = model3.kneighbors(input_recipe[nutritional_cols[1:]], n_neighbors=request.k + 1)
        
#         closest_indices = indices[0][1:]  
#         closest_recipes = diet_data.iloc[closest_indices]
       
#         closest_recipes = closest_recipes.replace([np.inf, -np.inf], 0).fillna(0)

#         return closest_recipes.to_dict(orient='records')
    
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
from fastapi.responses import JSONResponse

model_filename = 'recipe_recommender_knn.pkl'
try:
    model3 = joblib.load(model_filename)
except FileNotFoundError:
    raise HTTPException(status_code=500, detail="Model file not found.")

# Load the dataset once globally
diet_data = pd.read_csv("diet/recipes.csv")
nutritional_cols = ["RecipeId", "Calories", "FatContent", "SaturatedFatContent", 
                    "CholesterolContent", "SodiumContent", "CarbohydrateContent", 
                    "FiberContent", "SugarContent", "ProteinContent"]
nutritional_df = diet_data[nutritional_cols]

# Define request body
class RecipeRequest(BaseModel):
    recipe_id: int
    k: int = 5  # Default value of 5 if not provided

@app.post("/recommend-diet")
async def recommend_recipes(request: RecipeRequest) -> JSONResponse:
    try:
        # Find the input recipe
        input_recipe = nutritional_df[nutritional_df["RecipeId"] == request.recipe_id]
        if input_recipe.empty:
            raise HTTPException(status_code=404, detail="Recipe not found")
        
        # Prepare input data for the model
        input_data = input_recipe[nutritional_cols[1:]].replace([np.inf, -np.inf], 0).fillna(0)
        
        # Get the nearest neighbors (k+1 because the first result will be the input recipe itself)
        distances, indices = model3.kneighbors(input_data, n_neighbors=request.k + 1)
        
        # Exclude the first match (which is the recipe itself)
        closest_indices = indices[0][1:]
        closest_recipes = diet_data.iloc[closest_indices]
        
        # Clean up the data (replace inf and NaN values with 0)
        closest_recipes = closest_recipes.replace([np.inf, -np.inf], 0).fillna(0)
        
        # Return the closest recipes as a JSON response
        return JSONResponse(content=closest_recipes.to_dict(orient='records'))
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")