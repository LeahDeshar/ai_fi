from pymongo import MongoClient
import pandas as pd

# Connect to MongoDB
client = MongoClient("mongodb+srv://leahdesar:YIQsgaVrZBJhGUIL@cluster0.cnco2vy.mongodb.net/aifi")
db = client["aifi"]  # Replace with your actual database name
collection = db["useractivities"]  # Replace with your collection name

# Query the database to get the user activity data
query = {}  # Adjust this to get data for specific users or conditions if needed
activities = collection.find(query)

# Convert MongoDB cursor to DataFrame
df = pd.DataFrame(list(activities))

# Check the first few rows to ensure data is loaded correctly
print(df.head())

# Save the DataFrame to a CSV file
df.to_csv('./data/user_activity_data.csv', index=False)

print("Data has been successfully saved to 'user_activity_data.csv'")