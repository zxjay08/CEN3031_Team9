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
