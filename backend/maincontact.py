# maincontact.py
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import oracledb
import datetime
from pydantic import BaseModel
import cx_Oracle

app = FastAPI()

# Enable CORS (Cross-Origin Resource Sharing) to allow requests from the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # This backend runs on port 8005 and allows connections from port 3000
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Connect to DB with Oracle DB account information
connection = oracledb.connect(user="bernardor96", password="uBWuX2hBy8rFHXmO7CLnwece", host="oracle.cise.ufl.edu",
                              port=1521, service_name="orcl")
cursor = connection.cursor()

print("Successfully connected to Oracle Database")


class Contact(BaseModel):
    associatedparent: str
    id: int
    name: str
    email: str
    phone: str


@app.post("/save-contact")
async def save_contact(contact: Contact):
    try:
        # Execute SQL query
        cursor.execute("""
            INSERT INTO contacts (associatedparent, id, name, email, phone)
            VALUES (:associatedparent, :id, :name, :email, :phone)
        """, {
            'associatedparent': contact.associatedparent,
            'id': contact.id,
            'name': contact.name,
            'email': contact.email,
            'phone': contact.phone
        })

        # Commit
        connection.commit()

        # Return that the data was saved successfully (returning data not required)
        return {"message": "Data saved successfully"}
    except Exception as e:
        # Rollback and output log when error occurs
        connection.rollback()
        print(e)
        return {"message": "Error occurred while saving data"}


@app.post("/get-contacts")
async def get_contact(associatedparent: str):
    try:
        # Execute SQL query
        result = await cursor.execute("""
            SELECT * FROM contacts
            WHERE associatedparent = :associatedparent
        """, {
            'associatedparent': associatedparent
        })

        # Commit
        connection.commit()

        # Return the associated data
        return {result.rows}
    except Exception as e:
        # Rollback and output log when error occurs
        connection.rollback()
        print(e)
        return {"message": "Error occurred while saving data"}


# Shutdown server on shutdown request
@app.on_event("shutdown")
def shutdown_event():
    connection.close()


# Rerun this file as an uvicorn backend app
if __name__ == "__main__":
    uvicorn.run("main:app", port=8005, log_level="info")
