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
    #first, get number of rows to determine next ID
    query = "SELECT MAX(userID) FROM USERS"
    cursor.execute(query)
    result = cursor.fetchone()
    if result[0] is None:
        id = 1
    else:
        id = int(result[0]) + 1

    query = "INSERT INTO USERS VALUES ("
    query += str(id)
    query += ", '"
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
    SELECT * FROM USERS WHERE userID = """
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

def getStudents():
    query = """
    SELECT * FROM USERS WHERE TypeID = 1"""
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
    #first, get number of rows to determine next ID
    query = "SELECT MAX(assignmentID) FROM Assignments"
    cursor.execute(query)
    result = cursor.fetchone()
    if result[0] is None:
        id = 1
    else:
        id = int(result[0]) + 1

    query = "INSERT INTO Assignments VALUES ("
    query += str(id)
    query += ", '"
    query += name
    query += "', TO_DATE('"
    query += dueDate
    query += "', 'YYYY-MM-DD'))"
    cursor.execute(query)
    connection.commit()

def getAssignment(id):
    query = "SELECT * FROM Assignments WHERE assignmentID = "
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
    #first, get number of rows to determine next ID
    query = "SELECT MAX(incentiveID) FROM Incentives"
    cursor.execute(query)
    result = cursor.fetchone()
    if result[0] is None:
        id = 1
    else:
        id = int(result[0]) + 1

    query = "INSERT INTO Incentives VALUES ("
    query += str(id)
    query += ", '"
    query += name
    query += "', "
    query += str(cost)
    query += ")"
    cursor.execute(query)
    connection.commit()

def getIncentive(id):
    query = "SELECT * FROM Incentives WHERE incentiveID = "
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

def addReward(studentid, incentiveid, rewardDate):
    #first, get number of rows to determine next ID
    query = "SELECT MAX(irID) FROM IncentivesRewarded"
    cursor.execute(query)
    result = cursor.fetchone()
    if result[0] is None:
        id = 1
    else:
        id = int(result[0]) + 1

    query = "INSERT INTO IncentivesRewarded VALUES ("
    query += str(id)
    query += ", "
    query += str(studentid)
    query += ", "
    query += str(incentiveid)
    query += ", TO_DATE('"
    query += rewardDate
    query += "', 'YYYY-MM-DD'))"
    cursor.execute(query)
    connection.commit()

def getRewarded(studentid):
    query = """
    SELECT ir.irid, u.email, i.cost, ir.rewardDate FROM IncentivesRewarded ir
    JOIN Incentives i ON ir.incentiveid = i.incentiveid
    JOIN Users u on u.userid = ir.studentid
    WHERE ir.studentid = """
    query += str(studentid)
    cursor.execute(query)
    result = cursor.fetchall()

    formatted_result = [
        {
            "ID": row[0],
            "Name": row[1],
            "Cost": float(row[2]),
            "Reward Date": row[3].strftime("%Y-%m-%d")
        } for row in result
    ]
    return formatted_result

def addGrade(studentid, assignmentid, grade, completedate):
    #first, get number of rows to determine next ID
    query = "SELECT MAX(gradeID) FROM Grades"
    cursor.execute(query)
    result = cursor.fetchone()
    if result[0] is None:
        id = 1
    else:
        id = int(result[0]) + 1
    query = "INSERT INTO Grades VALUES ("
    query += str(id)
    query += ", "
    query += str(studentid)
    query += ", "
    query += str(assignmentid)
    query += ", "
    query += str(grade)
    query += ", TO_DATE('"
    query += completedate
    query += "', 'YYYY-MM-DD'))"
    cursor.execute(query)
    connection.commit()

def getGrades(studentid):
    query = """SELECT g.studentid, u.email, a.name, g.grade, g.completedate
    FROM Grades g
    JOIN Users u ON g.studentid = u.userid
    JOIN Assignments a ON g.assignmentid = a.assignmentid
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

#Functions to collect data for trend views returns a list that contains, for each student, a list that contains dictionaries that describes the row of data. I.e., structure is a list of lists of dictionaries. The dictionary is just a formatted way of describing a row of data in the table
def getScholarships():
    scholarships = []
    studentsList = getStudents();
    for student in studentsList:
        rewarded = getRewarded(student["ID"])
        if (len(rewarded) > 0):
            scholarships.append(getRewarded(student["ID"]))
    return scholarships

def getStudentsRewardedPerYear():
    perYear = {}
    scholarships = getScholarships()
    for student in scholarships:
            for row in student:
                year = row["Reward Date"][0:4]
                if year in perYear.keys():
                    perYear[year] += 1
                else:
                    perYear[year] = 1
    return perYear

def getScholarshipCostPerYear():
    perYear = {}
    scholarships = getScholarships()
    for student in scholarships:
            for row in student:
                year = row["Reward Date"][0:4]
                if year in perYear.keys():
                    perYear[year] += row["Cost"]
                else:
                    perYear[year] = row["Cost"]
    return perYear


#testing
#addUser("example4Teacher@gmail.com", "password", 2)
result = getUser(1)
for value in result:
    print(value)

#addAssignment("Assignment2", "2024-04-22")
result = getAssignment(1)
for value in result:
    print(value)

#addIncentive("Scholarship2", 350.00)
result = getIncentive(1)
for value in result:
    print(value)

addReward(2, 2, "2023-04-18")
#result = getRewarded(5)
#for value in result:
#    print(value)

#addGrade(1, 1, 90.7, "2024-04-17")
result = getGrades(1)
for value in result:
    print(value)

result = getScholarships()
for value in result:
    print(value)

print(getStudentsRewardedPerYear())
print(getScholarshipCostPerYear())
connection.close()
