# main.py
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import oracledb
import datetime
from pydantic import BaseModel
import cx_Oracle

app = FastAPI()

# Enable CORS (Cross-Origin Resource Sharing) to allow requests from the React frontend
# Replace the origin URL with the URL of the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update with the React app's URL
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


# Connect to DB with Oracle DB account information
connection = oracledb.connect(user="bernardor96", password="uBWuX2hBy8rFHXmO7CLnwece", host="oracle.cise.ufl.edu",
                              port=1521, service_name="orcl")
cursor = connection.cursor()

print("Successfully connected to Oracle Database")

# Class for general user information
class User(BaseModel):
    user_type: str
    major: str
    username: str
    email: str
    first_name: str
    last_name: str
    address: str
    city: str
    country: str
    postal_code: str
    about_student: str
    password: str


class UserLogin(BaseModel):
    username: str
    password: str
    userType: str


# POST 요청을 처리하는 메서드
# Used to save information about a user
@app.post("/save-data")
async def save_data(user: User):
    try:
        # SQL 쿼리 실행
        cursor.execute("""
            INSERT INTO users2 (user_type, major, username, email, first_name, last_name, address, city, country, postal_code, about_student, password)
            VALUES (:user_type, :major, :username, :email, :first_name, :last_name, :address, :city, :country, :postal_code, :about_student, :password)
        """, {
            'user_type': user.user_type,
            'major': user.major,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'address': user.address,
            'city': user.city,
            'country': user.country,
            'postal_code': user.postal_code,
            'about_student': user.about_student,
            'password': user.password
        })

        # 커밋
        connection.commit()

        # 저장된 데이터를 반환 (실제로는 반환하지 않아도 됨)
        return {"message": "Data saved successfully"}
    except Exception as e:
        # 오류 발생 시 롤백하고 로그를 출력
        connection.rollback()
        print(e)
        return {"message": "Error occurred while saving data"}



@app.post("/login")
async def login(user_data: UserLogin):
    username = user_data.username
    password = user_data.password
    user_type = user_data.userType

# Used to query whether a user login is correct
    try:
        # Check if the user exists in the database
        cursor.execute("""
            SELECT COUNT(*) FROM users2 
            WHERE username = :username AND password = :password AND user_type = :user_type
        """, {
            'username': username,
            'password': password,
            'user_type': user_type
        })
        result = cursor.fetchone()

        if result[0] > 0:
            authenticated = True
        else:
            authenticated = False

        return {"authenticated": authenticated}

    except Exception as e:
        print(e)
        return {"authenticated": False}


@app.on_event("shutdown")
def shutdown_event():
    connection.close()


# def addUser(email, password, typeid):
#     #first, get number of rows to determine next ID
#     query = "SELECT MAX(userID) FROM USERS"
#     cursor.execute(query)
#     result = cursor.fetchone()
#     if result[0] is None:
#         id = 1
#     else:
#         id = int(result[0]) + 1
#
#     query = "INSERT INTO USERS VALUES ("
#     query += str(id)
#     query += ", '"
#     query += email
#     query += "', '"
#     query += password
#     query += "', "
#     query += str(typeid)
#     query += ")"
#
#     cursor.execute(query)
#     connection.commit()
#
# def getUser(id):
#     query = """
#     SELECT * FROM USERS WHERE userID = """
#     query += str(id)
#     cursor.execute(query)
#     result = cursor.fetchall()
#
#
#     formatted_result = [
#         {
#             "ID": row[0],
#             "Email": row[1],
#             "Password": row[2],
#             "Type": row[3],
#         } for row in result
#     ]
#     return formatted_result
#
# def getStudents():
#     query = """
#     SELECT * FROM USERS WHERE TypeID = 1"""
#     cursor.execute(query)
#     result = cursor.fetchall()
#
#     formatted_result = [
#         {
#             "ID": row[0],
#             "Email": row[1],
#             "Password": row[2],
#             "Type": row[3],
#         } for row in result
#     ]
#     return formatted_result
#
# def addAssignment(name, dueDate): #format: YYYY-MM-DD
#     #first, get number of rows to determine next ID
#     query = "SELECT MAX(assignmentID) FROM Assignments"
#     cursor.execute(query)
#     result = cursor.fetchone()
#     if result[0] is None:
#         id = 1
#     else:
#         id = int(result[0]) + 1
#
#     query = "INSERT INTO Assignments VALUES ("
#     query += str(id)
#     query += ", '"
#     query += name
#     query += "', TO_DATE('"
#     query += dueDate
#     query += "', 'YYYY-MM-DD'))"
#     cursor.execute(query)
#     connection.commit()
#
# def getAssignment(id):
#     query = "SELECT * FROM Assignments WHERE assignmentID = "
#     query += str(id)
#     cursor.execute(query)
#     result = cursor.fetchall()
#
#     formatted_result = [
#         {
#             "ID": row[0],
#             "Name": row[1],
#             "Due Date": row[2].strftime("%Y-%m-%d"),
#         } for row in result
#     ]
#     return formatted_result
#
# def getAssignments():
#     query = "SELECT * FROM Assignments"
#     cursor.execute(query)
#     result = cursor.fetchall()
#
#     formatted_result = [
#         {
#             "ID": row[0],
#             "Name": row[1],
#             "Due Date": row[2].strftime("%Y-%m-%d"),
#         } for row in result
#     ]
#     return formatted_result
#
#
# def addIncentive(name, cost):
#     #first, get number of rows to determine next ID
#     query = "SELECT MAX(incentiveID) FROM Incentives"
#     cursor.execute(query)
#     result = cursor.fetchone()
#     if result[0] is None:
#         id = 1
#     else:
#         id = int(result[0]) + 1
#
#     query = "INSERT INTO Incentives VALUES ("
#     query += str(id)
#     query += ", '"
#     query += name
#     query += "', "
#     query += str(cost)
#     query += ")"
#     cursor.execute(query)
#     connection.commit()
#
# def getIncentive(id):
#     query = "SELECT * FROM Incentives WHERE incentiveID = "
#     query += str(id)
#     cursor.execute(query)
#     result = cursor.fetchall()
#
#     formatted_result = [
#         {
#             "ID": row[0],
#             "Name": row[1],
#             "Cost": float(row[2]),
#         } for row in result
#     ]
#     return formatted_result
#
# def getIncentives():
#     query = "SELECT * FROM Incentives"
#     cursor.execute(query)
#     result = cursor.fetchall()
#
#     formatted_result = [
#         {
#             "ID": row[0],
#             "Name": row[1],
#             "Cost": float(row[2]),
#         } for row in result
#     ]
#     return formatted_result
#
# def addReward(studentid, incentiveid, rewardDate):
#     #first, get number of rows to determine next ID
#     query = "SELECT MAX(irID) FROM IncentivesRewarded"
#     cursor.execute(query)
#     result = cursor.fetchone()
#     if result[0] is None:
#         id = 1
#     else:
#         id = int(result[0]) + 1
#
#     query = "INSERT INTO IncentivesRewarded VALUES ("
#     query += str(id)
#     query += ", "
#     query += str(studentid)
#     query += ", "
#     query += str(incentiveid)
#     query += ", TO_DATE('"
#     query += rewardDate
#     query += "', 'YYYY-MM-DD'))"
#     cursor.execute(query)
#     connection.commit()
#
# def getRewarded(studentid):
#     query = """
#     SELECT ir.irid, u.email, i.cost, ir.rewardDate FROM IncentivesRewarded ir
#     JOIN Incentives i ON ir.incentiveid = i.incentiveid
#     JOIN Users u on u.userid = ir.studentid
#     WHERE ir.studentid = """
#     query += str(studentid)
#     cursor.execute(query)
#     result = cursor.fetchall()
#
#     formatted_result = [
#         {
#             "ID": row[0],
#             "Name": row[1],
#             "Cost": float(row[2]),
#             "Reward Date": row[3].strftime("%Y-%m-%d")
#         } for row in result
#     ]
#     return formatted_result
#
# def addGrade(studentid, assignmentid, grade, completedate):
#     #first, get number of rows to determine next ID
#     query = "SELECT MAX(gradeID) FROM Grades"
#     cursor.execute(query)
#     result = cursor.fetchone()
#     if result[0] is None:
#         id = 1
#     else:
#         id = int(result[0]) + 1
#     query = "INSERT INTO Grades VALUES ("
#     query += str(id)
#     query += ", "
#     query += str(studentid)
#     query += ", "
#     query += str(assignmentid)
#     query += ", "
#     query += str(grade)
#     query += ", TO_DATE('"
#     query += completedate
#     query += "', 'YYYY-MM-DD'))"
#     cursor.execute(query)
#     connection.commit()
#
# def getGrades(studentid):
#     query = """SELECT g.studentid, u.email, a.name, g.grade, g.completedate
#     FROM Grades g
#     JOIN Users u ON g.studentid = u.userid
#     JOIN Assignments a ON g.assignmentid = a.assignmentid
#     WHERE g.studentid = """
#     query += str(studentid)
#     cursor.execute(query)
#     result = cursor.fetchall()
#
#     formatted_result = [
#         {
#             "ID": row[0],
#             "Name": row[1],
#             "Assignment": row[2],
#             "Grade": float(row[3]),
#             "Complete Date": row[4].strftime("%Y-%m-%d")
#         } for row in result
#     ]
#     return formatted_result
#
# #Functions to collect data for trend views returns a list that contains, for each student, a list that contains dictionaries that describes the row of data. I.e., structure is a list of lists of dictionaries. The dictionary is just a formatted way of describing a row of data in the table
# def getScholarships():
#     scholarships = []
#     studentsList = getStudents();
#     for student in studentsList:
#         rewarded = getRewarded(student["ID"])
#         if (len(rewarded) > 0):
#             scholarships.append(rewarded)
#     return scholarships
#
# def getStudentsRewardedPerYear():
#     perYear = {}
#     scholarships = getScholarships()
#     for student in scholarships:
#             for row in student:
#                 year = row["Reward Date"][0:4]
#                 if year in perYear.keys():
#                     perYear[year] += 1
#                 else:
#                     perYear[year] = 1
#     return perYear
#
# def getScholarshipCostPerYear():
#     perYear = {}
#     scholarships = getScholarships()
#     for student in scholarships:
#             for row in student:
#                 year = row["Reward Date"][0:4]
#                 if year in perYear.keys():
#                     perYear[year] += row["Cost"]
#                 else:
#                     perYear[year] = row["Cost"]
#     return perYear
#
# #Calculates gpa per month for specific student
# def calculateMonthlyGPAs(studentid):
#     query = """SELECT studentID, extract(year from completedate), extract(month from completedate), AVG(grade)
#     FROM GRADES
#     WHERE studentID = """
#     query += str(studentid)
#     query += """ GROUP BY studentID, extract(year from completedate), extract(month from completedate)"""
#     cursor.execute(query)
#     result = cursor.fetchall()
#     perSemester = {}
#
#     formatted_result = [
#         {
#             "StudentID": row[0],
#             "Year": row[1],
#             "Month": row[2],
#             "GPA": float(row[3]),
#         } for row in result
#     ]
#
#     return formatted_result
#
# def calculateAllStudentGPAs():
#     gpas = []
#     studentsList = getStudents();
#     for student in studentsList:
#         rewarded = calculateMonthlyGPAs(student["ID"])
#         if (len(rewarded) > 0):
#             gpas.append(rewarded)
#     return gpas
#
# #testing
# #addUser("example4Teacher@gmail.com", "password", 2)
# result = getUser(1)
# for value in result:
#     print(value)
#
# #addAssignment("Assignment2", "2024-04-22")
# result = getAssignment(1)
# for value in result:
#     print(value)
#
# #addIncentive("Scholarship2", 350.00)
# result = getIncentive(1)
# for value in result:
#     print(value)
#
# #addReward(2, 2, "2023-04-18")
# #result = getRewarded(5)
# #for value in result:
# #    print(value)
#
# #addGrade(1, 1, 85, "2024-04-05")
# #addGrade(2, 1, 100, "2024-04-15")
# #addGrade(1, 1, 95, "2024-03-14")
# result = getGrades(1)
# for value in result:
#     print(value)
#
# result = getScholarships()
# for value in result:
#     print(value)
#
# print(getStudentsRewardedPerYear())
# print(getScholarshipCostPerYear())
# print(calculateMonthlyGPAs(1))
# print(calculateAllStudentGPAs())
#
# connection.close()

# Rerun this file as an uvicorn backend app
if __name__ == "__main__":
    uvicorn.run("main:app", port=5000, log_level="info")
