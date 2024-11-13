from fastapi import FastAPI, HTTPException
import pandas as pd
import pickle
import numpy as np
import joblib
from collections import Counter
from pydantic import BaseModel
import random
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Load the dataset
df = pd.read_csv('./gym/Exersices.csv')

# Manual label encoding for categorical columns
categorical_columns = ['bodyPart', 'equipment', 'target']
label_encoders = {}
for col in categorical_columns:
    unique_values = df[col].unique()
    label_encoders[col] = {value: idx for idx, value in enumerate(unique_values)}
    df[col] = df[col].map(label_encoders[col])

# Separate features and target
X = df[['bodyPart', 'equipment', 'target']].values
y = df['target'].values

# Manual train-test split
def train_test_split_manual(X, y, test_size=0.2):
    indices = list(range(len(X)))
    test_indices = random.sample(indices, int(test_size * len(X)))
    train_indices = list(set(indices) - set(test_indices))
    
    X_train = X[train_indices]
    y_train = y[train_indices]
    X_test = X[test_indices]
    y_test = y[test_indices]
    return X_train, X_test, y_train, y_test

X_train, X_test, y_train, y_test = train_test_split_manual(X, y, test_size=0.2)

# Helper functions for building the Decision Tree
class DecisionNode:
    def __init__(self, feature=None, threshold=None, left=None, right=None, *, value=None):
        self.feature = feature
        self.threshold = threshold
        self.left = left
        self.right = right
        self.value = value

def gini(y):
    counts = np.bincount(y)
    probabilities = counts / len(y)
    return 1 - np.sum(probabilities ** 2)

def split_dataset(X, y, feature, threshold):
    left_indices = np.where(X[:, feature] <= threshold)[0]
    right_indices = np.where(X[:, feature] > threshold)[0]
    return X[left_indices], X[right_indices], y[left_indices], y[right_indices]

def grow_tree(X, y, depth=0, max_depth=10):
    num_samples, num_features = X.shape
    if num_samples <= 1 or depth >= max_depth:
        leaf_value = most_common_label(y)
        return DecisionNode(value=leaf_value)

    best_gini = 1.0
    best_feature, best_threshold = None, None

    for feature in range(num_features):
        thresholds = np.unique(X[:, feature])
        for threshold in thresholds:
            X_left, X_right, y_left, y_right = split_dataset(X, y, feature, threshold)
            if len(y_left) == 0 or len(y_right) == 0:
                continue
            gini_left = gini(y_left)
            gini_right = gini(y_right)
            weighted_gini = (len(y_left) * gini_left + len(y_right) * gini_right) / len(y)
            if weighted_gini < best_gini:
                best_gini = weighted_gini
                best_feature = feature
                best_threshold = threshold

    if best_gini == 1.0:
        leaf_value = most_common_label(y)
        return DecisionNode(value=leaf_value)

    X_left, X_right, y_left, y_right = split_dataset(X, y, best_feature, best_threshold)
    left_child = grow_tree(X_left, y_left, depth + 1, max_depth)
    right_child = grow_tree(X_right, y_right, depth + 1, max_depth)
    return DecisionNode(best_feature, best_threshold, left_child, right_child)

def most_common_label(y):
    counter = Counter(y)
    return counter.most_common(1)[0][0]

class DecisionTreeClassifier:
    def __init__(self, max_depth=10):
        self.max_depth = max_depth
        self.root = None

    def fit(self, X, y):
        self.root = grow_tree(X, y, max_depth=self.max_depth)

    def _predict(self, inputs):
        node = self.root
        while node.value is None:
            if inputs[node.feature] <= node.threshold:
                node = node.left
            else:
                node = node.right
        return node.value

    def predict(self, X):
        return np.array([self._predict(inputs) for inputs in X])

class RandomForestClassifierFromScratch:
    def __init__(self, n_trees=10, max_depth=10, sample_size=None):
        self.n_trees = n_trees
        self.max_depth = max_depth
        self.sample_size = sample_size
        self.trees = []

    def _bootstrap_sample(self, X, y):
        n_samples = X.shape[0]
        indices = np.random.choice(n_samples, self.sample_size or n_samples, replace=True)
        return X[indices], y[indices]

    def fit(self, X, y):
        self.trees = []
        for _ in range(self.n_trees):
            tree = DecisionTreeClassifier(max_depth=self.max_depth)
            X_sample, y_sample = self._bootstrap_sample(X, y)
            tree.fit(X_sample, y_sample)
            self.trees.append(tree)

    def predict(self, X):
        tree_preds = np.array([tree.predict(X) for tree in self.trees])
        tree_preds = np.swapaxes(tree_preds, 0, 1)
        y_pred = [most_common_label(tree_pred) for tree_pred in tree_preds]
        return np.array(y_pred)

# Initialize and train the model
rf_scratch = RandomForestClassifierFromScratch(n_trees=10, max_depth=10)
rf_scratch.fit(X_train, y_train)

# Predict on test set and calculate accuracy
y_pred = rf_scratch.predict(X_test)
accuracy = np.mean(y_pred == y_test)
print(f'Random Forest Accuracy (from scratch): {accuracy * 100:.2f}%')

# Exercise recommendation based on target muscle group
def recommend_exercises(target_input, k=5):
    target_encoded = label_encoders['target'][target_input]
    probabilities = np.mean([tree.predict(X_test) == target_encoded for tree in rf_scratch.trees], axis=0)
    recommended_indices = np.argsort(probabilities)[-k:][::-1]
    recommendations = df.iloc[recommended_indices]
    return recommendations

# # Example usage
# target_input = 'traps'  # Example muscle group to target
# recommended_exercises = recommend_exercises(target_input)
# print(recommended_exercises)

class RecommendationRequest(BaseModel):
    target_input: str
    k: int = 5  # Default to 5 recommendations

class RecommendationResponse(BaseModel):
    exercises: list

# Helper function to get exercise recommendations
# def recommend_exercises(target_input, k=5):
#     target_encoded = label_encoders['target'].get(target_input)
#     if target_encoded is None:
#         raise ValueError("Invalid target input")
#     probabilities = np.mean([tree.predict(X_test) == target_encoded for tree in rf_scratch.trees], axis=0)
#     recommended_indices = np.argsort(probabilities)[-k:][::-1]
#     recommendations = df.iloc[recommended_indices][['bodyPart', 'equipment', 'target', 'instructions','name']]
    
#     return recommendations.to_dict(orient="records")
# Reverse the label encoders to create label decoders
label_decoders = {col: {idx: value for value, idx in encoder.items()} for col, encoder in label_encoders.items()}

def recommend_exercises(target_input, k=5):
    target_encoded = label_encoders['target'].get(target_input)
    if target_encoded is None:
        raise ValueError("Invalid target input")
    
    probabilities = np.mean([tree.predict(X_test) == target_encoded for tree in rf_scratch.trees], axis=0)
    recommended_indices = np.argsort(probabilities)[-k:][::-1]
    recommendations = df.iloc[recommended_indices][['bodyPart', 'equipment', 'target', 'instructions', 'name']]
    
    # Decode the categorical columns in recommendations
    decoded_recommendations = []
    for _, row in recommendations.iterrows():
        decoded_recommendations.append({
            "bodyPart": label_decoders['bodyPart'][row['bodyPart']],
            "equipment": label_decoders['equipment'][row['equipment']],
            "target": label_decoders['target'][row['target']],
            "instructions": row['instructions'],
            "name": row['name']
        })
    
    return decoded_recommendations

# API endpoint for exercise recommendation
@app.post("/recommend_exercises", response_model=RecommendationResponse)
def get_recommendations(request: RecommendationRequest):
    try:
        recommended_exercises = recommend_exercises(request.target_input, request.k)
        return {"exercises": recommended_exercises}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))




model = joblib.load("isolation_forest_model.pkl")
explainer = joblib.load("shap_explainer.pkl")


class UserActivity(BaseModel):
    waterIntake: float
    calorieIntake: float
    sleepDuration: float
    dailySteps: int

@app.post("/detect_anomaly/")
async def detect_anomaly(data: UserActivity):
    user_data = pd.DataFrame([data.dict()])
    
    contamination_level = 0.1
    anomaly_score = model.decision_function(user_data)
    threshold = np.percentile(anomaly_score, 100 * contamination_level)
    is_anomaly = anomaly_score < threshold
    
    shap_values = explainer.shap_values(user_data)

    response = {
        "is_anomaly": bool(is_anomaly),
        "anomaly_score": anomaly_score[0],
        "feature_contributions": dict(zip(user_data.columns, shap_values[0].tolist()))
    }
    return response