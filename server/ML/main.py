import json, os
from fastapi import FastAPI, Request, Form, Cookie
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
import pandas as pd
from pymongo import MongoClient
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel, cosine_similarity

# Initialize FastAPI app
app = FastAPI()

# Set up Jinja2 templates for HTML rendering
templates = Jinja2Templates(directory="templates")

# Data directory and paths
data_dir = os.path.join(os.path.dirname(__file__), 'data')
json_file_path = os.path.join(data_dir, 'exercises.json')
csv_cleaned_file_path = os.path.join(data_dir, 'exercises_cleaned.csv')

# Load and preprocess JSON data
with open(json_file_path, 'r', encoding='utf-8') as file:
    exercises = json.load(file)
    for exercise in exercises:
        images = exercise["images"]
        exercise["images"] = [image.split('/')[-1] for image in images]

# Convert exercises data to DataFrame and save as CSV
dataframe = pd.DataFrame(exercises)
csv_file_path = os.path.join(data_dir, 'exercises.csv')
dataframe.to_csv(csv_file_path, index=False, sep=',')

# Load cleaned data from CSV
df = pd.read_csv(csv_cleaned_file_path)
df['images'] = df['images'].apply(lambda x: [image.strip(" '") for image in x.strip("[]").split(", ")])

# MongoDB setup
client = MongoClient("mongodb://localhost:27017/")
db = client["exercisesdb"]
collection = db["exercises"]
df_dict = df.to_dict(orient='records')
collection.insert_many(df_dict)

# Priority fields and weights
priority_fields = ['primaryMuscles', 'level', 'equipment', 'secondaryMuscles', 'force', 'mechanic', 'category']
priority_weights = [20, 15, 10, 5, 3, 2, 1]

# Content concatenation for recommendations
df['content'] = df[priority_fields].apply(
    lambda row: (
        ' '.join([str(val) * weight for val, weight in zip(row, priority_weights)])
    ),
    axis=1
)

# Create a TF-IDF vectorizer and calculate cosine similarity
tfidf_vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf_vectorizer.fit_transform(df['content'])
cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

# Route for the welcome page
@app.get("/", response_class=HTMLResponse)
async def welcome(request: Request):
    return templates.TemplateResponse("welcome.html", {"request": request})

@app.get("/beginner", response_class=HTMLResponse)
async def beginner(request: Request, selectedPrimaryMuscle: str = Cookie(None)):
    primary_muscles = ["Chest", "Biceps", "Abdominals", "Quadriceps", "Middle Back", "Glutes", "Hamstrings", "Calves"]
    return templates.TemplateResponse(
        "beginner.html",
        {"request": request, "primary_muscles": primary_muscles, "selectedPrimaryMuscle": selectedPrimaryMuscle}
    )

@app.post("/beginner")
async def set_primary_muscle(request: Request, selectedPrimaryMuscle: str = Form(...)):
    response = RedirectResponse(url="/recommend", status_code=303)
    response.set_cookie(key="selectedPrimaryMuscle", value=selectedPrimaryMuscle)
    return response

@app.get("/advanced", response_class=HTMLResponse)
async def advanced(request: Request, selectedPrimaryMuscle: str = Cookie(None)):
    primary_muscles = [
        "Neck", "Shoulders", "Chest", "Biceps", "Forearms", "Abdominals", "Quadriceps", "Adductors", "Calves",
        "Traps", "Triceps", "Lats", "Middle Back", "Lower Back", "Abductors", "Glutes", "Hamstrings", "Calves"
    ]
    return templates.TemplateResponse(
        "advanced.html",
        {"request": request, "primary_muscles": primary_muscles, "selectedPrimaryMuscle": selectedPrimaryMuscle}
    )

@app.post("/advanced")
async def set_advanced_primary_muscle(request: Request, selectedPrimaryMuscle: str = Form(...)):
    response = RedirectResponse(url="/recommend", status_code=303)
    response.set_cookie(key="selectedPrimaryMuscle", value=selectedPrimaryMuscle)
    return response

@app.get("/recommend", response_class=HTMLResponse)
async def recommend_exercises(request: Request, selectedPrimaryMuscle: str = Cookie(None)):
    return templates.TemplateResponse("recommendations.html", {"request": request, "selectedPrimaryMuscle": selectedPrimaryMuscle})

@app.post("/recommend")
async def recommend_exercises_post(
    request: Request,
    selectedPrimaryMuscle: str = Cookie(None),
    level: str = Form(""),
    equipment: str = Form(""),
    secondaryMuscles: list = Form([]),
    force: str = Form(""),
    mechanic: str = Form(""),
    category: str = Form("")
):
    # Prepare user input and content for recommendations
    user_content = (
        selectedPrimaryMuscle * priority_weights[0] + ' ' +
        level * priority_weights[1] + ' ' +
        equipment * priority_weights[2] + ' ' +
        ' '.join(secondaryMuscles) * priority_weights[3] + ' ' +
        force * priority_weights[4] + ' ' +
        mechanic * priority_weights[5] + ' ' +
        category * priority_weights[6]
    )

    # Convert user content to TF-IDF and calculate similarity
    user_tfidf_matrix = tfidf_vectorizer.transform([user_content])
    user_cosine_sim = linear_kernel(user_tfidf_matrix, tfidf_matrix)
    sim_scores = user_cosine_sim[0]
    exercise_indices = sim_scores.argsort()[::-1][:5]  # Select top 5

    exercise_data = []
    for index in exercise_indices:
        exercise = df.iloc[index].to_dict()
        exercise["instructions"] = exercise.get("instructions", "").replace('.,', '<br>')
        exercise_data.append(exercise)

    return templates.TemplateResponse(
        "recommendations.html",
        {"request": request, "recommendations": exercise_data, "selectedPrimaryMuscle": selectedPrimaryMuscle}
    )

@app.get("/more_recommendations", response_class=HTMLResponse)
async def more_recommendations(request: Request, selectedPrimaryMuscle: str = Cookie(None)):
    return templates.TemplateResponse("more_recommendations.html", {"request": request, "selectedPrimaryMuscle": selectedPrimaryMuscle})

@app.post("/more_recommendations", response_class=HTMLResponse)
async def more_recommendations_post(
    request: Request,
    user_input: str = Form(...),
    selectedPrimaryMuscle: str = Cookie(None),
    secondaryMuscles: list = Form([])
):
    # Load user input and calculate recommendations
    user_content = (
        selectedPrimaryMuscle * priority_weights[0] + ' ' +
        ' '.join(secondaryMuscles) * priority_weights[3]
    )
    
    # Convert user content to TF-IDF and calculate item-based similarity
    user_tfidf_matrix = tfidf_vectorizer.transform([user_content])
    item_sim_scores = cosine_similarity(user_tfidf_matrix, tfidf_matrix.T)[0]
    exercise_indices = item_sim_scores.argsort()[-5:][::-1]

    exercise_data = []
    for index in exercise_indices:
        exercise = df.iloc[index].to_dict()
        exercise["instructions"] = exercise.get("instructions", "").replace('.,', '<br>')
        exercise_data.append(exercise)

    return templates.TemplateResponse(
        "more_recommendations.html",
        {"request": request, "recommendations": exercise_data, "selectedPrimaryMuscle": selectedPrimaryMuscle}
    )
