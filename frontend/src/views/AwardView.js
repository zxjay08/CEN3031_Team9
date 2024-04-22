import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
  Collapse
} from "reactstrap";
import PanelHeader from "components/PanelHeader/PanelHeader.js";

// Sample initial data for the table
const initialStudents = [
    { id: 1, name: "John Doe", amount: 1000, date: "2024-04-01", assignments: [
      { title: "Assignment 1", completionDate: "2024-03-25" },
      { title: "Assignment 2", completionDate: "2024-03-28" },
    ]},
    { id: 2, name: "Jane Smith", amount: 1500, date: "2024-04-02", assignments: [
      { title: "Assignment 3", completionDate: "2024-03-29" },
      { title: "Assignment 4", completionDate: "2024-03-30" },
    ]},
    // Add 10 more people
    { id: 3, name: "Alice Johnson", amount: 1200, date: "2024-04-03", assignments: [
      { title: "Assignment 5", completionDate: "2024-03-31" },
      { title: "Assignment 6", completionDate: "2024-04-01" },
    ]},
    { id: 4, name: "Bob Brown", amount: 1100, date: "2024-04-04", assignments: [
      { title: "Assignment 7", completionDate: "2024-04-02" },
      { title: "Assignment 8", completionDate: "2024-04-03" },
    ]},
    { id: 5, name: "Charlie Williams", amount: 1050, date: "2024-04-05", assignments: [
      { title: "Assignment 9", completionDate: "2024-04-04" },
      { title: "Assignment 10", completionDate: "2024-04-05" },
    ]},
    { id: 6, name: "David Miller", amount: 1025, date: "2024-04-06", assignments: [
      { title: "Assignment 11", completionDate: "2024-04-06" },
      { title: "Assignment 12", completionDate: "2024-04-07" },
    ]},
    { id: 7, name: "Eve Davis", amount: 1013, date: "2024-04-07", assignments: [
      { title: "Assignment 13", completionDate: "2024-04-08" },
      { title: "Assignment 14", completionDate: "2024-04-09" },
    ]},
    { id: 8, name: "Frank Wilson", amount: 1007, date: "2024-04-08", assignments: [
      { title: "Assignment 15", completionDate: "2024-04-10" },
      { title: "Assignment 16", completionDate: "2024-04-11" },
    ]},
    { id: 9, name: "Grace Lee", amount: 1003, date: "2024-04-09", assignments: [
      { title: "Assignment 17", completionDate: "2024-04-12" },
      { title: "Assignment 18", completionDate: "2024-04-13" },
    ]},
    { id: 10, name: "Henry Clark", amount: 1001, date: "2024-04-10", assignments: [
      { title: "Assignment 19", completionDate: "2024-04-14" },
      { title: "Assignment 20", completionDate: "2024-04-15" },
    ]},
  ];

function AwardView() {
  const [selectedStudent, setSelectedStudent] = useState(null);

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Award Ranking</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Amount</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {initialStudents.map((student, index) => (
                      <tr key={student.id} onClick={() => setSelectedStudent(student)}>
                        <td>{index + 1}</td>
                        <td>{student.name}</td>
                        <td>{student.amount}</td>
                        <td>{student.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {selectedStudent && (
          <Row>
            <Col xs={12}>
              <Collapse isOpen={true}>
                <Card>
                  <CardBody>
                    <h4>Details for {selectedStudent.name}</h4>
                    <Table responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>Title</th>
                          <th>Completion Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedStudent.assignments.map((assignment, index) => (
                          <tr key={index}>
                            <td>{assignment.title}</td>
                            <td>{assignment.completionDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Collapse>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
}

export default AwardView;
