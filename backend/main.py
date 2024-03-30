# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import oracledb

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

# Connect to DB 
connection = oracledb.connect(user="bernardor96", password="uBWuX2hBy8rFHXmO7CLnwece", host="oracle.cise.ufl.edu", port=1521, service_name="orcl")
cursor = connection.cursor()

print("Successfully connected to Oracle Database")

#User Types: 1-Student 2-Teacher 3-Parent 4-Advisor 5-Admin

def addUser(email, password, typeid):
    query = "INSERT INTO USERS (email, password, typeid) VALUES ('"
    query += email
    query += "', '"
    query += password
    query += "', "
    query += str(typeid)
    query += ")"

    cursor.execute(query)
    connection.commit()

def getUser(id):
    query = """
    SELECT * FROM USERS WHERE ID = """
    query += str(id)
    cursor.execute(query)
    result = cursor.fetchall()

    formatted_result = [
        {
            "ID": row[0],
            "Email": row[1],
            "Password": row[2],
            "Type": row[3],
        } for row in result
    ]
    return formatted_result

def addAssignment(name, dueDate): #format: YYYY-MM-DD
    query = "INSERT INTO Assignments (name, duedate) VALUES ("
    query += name
    query += ", TO_DATE("
    query += dueDate
    query += ", 'YYYY-MM-DD'))"
    cursor.execute(query)
    connection.commit()

def getAssignment(id):
    query = "SELECT * FROM Assignments WHERE ID = "
    query += str(id)
    cursor.execute(query)
    result = cursor.fetchall()

    formatted_result = [
        {
            "ID": row[0],
            "Name": row[1],
            "Due Date": row[2].strftime("%D"),
        } for row in result
    ]
    return formatted_result

def addIncentive(name, cost):
    query = "INSERT INTO Incentives (name, cost) VALUES ('"
    query += name
    query += "', "
    query += str(cost)
    query += ")"
    cursor.execute(query)
    connection.commit()

def getIncentive(id):
    query = "SELECT * FROM Incentives WHERE ID = "
    query += str(id)
    cursor.execute(query)
    result = cursor.fetchall()

    formatted_result = [
        {
            "ID": row[0],
            "Name": row[1],
            "Cost": float(row[2]),
        } for row in result
    ]
    return formatted_result

def addReward(studentid, incentiveid):
    query = "INSERT INTO IncentivesRewarded (studentid, incentiveid) VALUES ('"
    query += str(studentid)
    query += "', "
    query += str(incentiveid)
    query += ")"
    cursor.execute(query)
    connection.commit()

def getRewarded(studentid):
    query = """
    SELECT ir.id, u.email, i.cost FROM IncentivesRewarded ir
    JOIN Incentives i ON ir.incentiveid = i.id
    JOIN Users u on u.id = ir.studentid
    WHERE ir.studentid = """
    query += str(studentid)
    cursor.execute(query)
    result = cursor.fetchall()

    formatted_result = [
        {
            "ID": row[0],
            "Name": row[1],
            "Cost": float(row[2]),
        } for row in result
    ]
    return formatted_result

def addGrade(studentid, assignmentid, grade, completedate):
    query = "INSERT INTO Grades (studentid, assignmentid, grade, completedate) VALUES ("
    query += str(studentid)
    query += ", "
    query += str(assignmentid)
    query += str(", ")
    query += str(grade)
    query += ", TO_DATE("
    query += completedate
    query += ", 'YYYY-MM-DD'))"
    cursor.execute(query)
    connection.commit()

def getGrades(studentid):
    query = """SELECT g.id, u.email, a.name, g.grade, g.completedate
    FROM Grades g
    JOIN Users u ON g.studentid = u.id
    JOIN Assignments a ON g.assignmentid = a.id
    WHERE g.studentid = """
    query += str(studentid)
    cursor.execute(query)
    result = cursor.fetchall()

    formatted_result = [
        {
            "ID": row[0],
            "Name": row[1],
            "Assignment": row[2],
            "Grade": float(row[3]),
            "Complete Date": row[4].strftime("%D")
        } for row in result
    ]
    return formatted_result



#testing
#addUser("example3@gmail.com", "password", 2)
result = getUser(3)
for value in result:
    print(value)

#addAssignment("'Assignment1'", "'2024-04-22'")
result = getAssignment(4)
for value in result:
    print(value)

#addIncentive("Scholarship1", 350.00)
result = getIncentive(1)
for value in result:
    print(value)

#addReward(3, 1)
result = getRewarded(3)
for value in result:
    print(value)

#addGrade(3, 4, 90.7, "'2024-04-17'")
result = getGrades(3)
for value in result:
    print(value)
connection.close()
