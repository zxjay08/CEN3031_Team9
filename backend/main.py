# main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS (Cross-Origin Resource Sharing) to allow requests from the React frontend
# Replace the origin URL with the URL of your React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update with your React app's URL
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Dummy data representing scholarship trends
scholarship_trends = [
    {"year": 2020, "total_students": 100},
    {"year": 2021, "total_students": 120},
    {"year": 2022, "total_students": 90},
]

@app.get("/api/scholarship/trends")
async def get_scholarship_trends():
    return scholarship_trends
