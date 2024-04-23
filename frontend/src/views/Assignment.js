import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import Calendar from 'react-calendar';
import "assets/css/demo.css";

function AssignmentDetails({ assignment }) {
  if (!assignment) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <h5 className="title">Assignment Details</h5>
      </CardHeader>
      <CardBody>
        <ul>
          <li><strong>Title:</strong> {assignment.title}</li>
          <li><strong>Description:</strong> {assignment.description}</li>
          <li><strong>Due Date:</strong> {assignment.dueDate.toLocaleDateString()}</li>
        </ul>
      </CardBody>
    </Card>
  );
}

function User() {
  const [assignments, setAssignments] = useState([
    { id: 1, title: "Assignment 1", description: "Description for Assignment 1", dueDate: new Date("2024-04-10") },
    { id: 2, title: "Assignment 2", description: "Description for Assignment 2", dueDate: new Date("2024-04-15") },
  ]);
  const [newAssignmentTitle, setNewAssignmentTitle] = useState('');
  const [newAssignmentDescription, setNewAssignmentDescription] = useState('');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleAssignmentClick = (date) => {
  const assignmentForDate = assignments.find((assignment) => {
    const assignmentDate = new Date(assignment.dueDate);
    return (
      assignmentDate.getFullYear() === date.getFullYear() &&
      assignmentDate.getMonth() === date.getMonth() &&
      assignmentDate.getDate() === date.getDate()
    );
  });
  setSelectedAssignment(assignmentForDate || null);
};

  const handleAssignmentRegistration = () => {
    if (newAssignmentTitle.trim() !== '') {
      const newAssignment = {
        id: assignments.length + 1,
        title: newAssignmentTitle,
        description: newAssignmentDescription,
        dueDate: selectedDate,
      };
      setAssignments([...assignments, newAssignment]);
      setNewAssignmentTitle('');
      setNewAssignmentDescription('');
      setSelectedDate(null);
    }
  };

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="4">
            <Card>
              <CardHeader>
                <h5 className="title">Calendar</h5>
              </CardHeader>
              <CardBody>
                <Calendar
                  locale="en-US"
                  tileContent={({ date, view }) => {
                    if (view === 'month') {
                      const hasAssignment = assignments.some((assignment) => {
                      const assignmentDate = new Date(assignment.dueDate);
                      return (
                        assignmentDate.getFullYear() === date.getFullYear() &&
                        assignmentDate.getMonth() === date.getMonth() &&
                        assignmentDate.getDate() === date.getDate()
                      );
                    });
                    return hasAssignment ? <span>&#9679;</span> : null;
                  }
                }}
                onClickDay={(value, event) => {
                  setSelectedDate(value);
                  handleAssignmentClick(value);
                }}
              />
              </CardBody>
            </Card>
          </Col>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Assignment Registration</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>Assignment Title</label>
                        <Input
                          placeholder="Enter assignment title"
                          value={newAssignmentTitle}
                          onChange={(e) => setNewAssignmentTitle(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label>Description</label>
                        <Input
                          type="textarea"
                          placeholder="Enter assignment description"
                          value={newAssignmentDescription}
                          onChange={(e) => setNewAssignmentDescription(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Date</label>
                        <Input
                          type="text"
                          value={selectedDate ? selectedDate.toLocaleDateString() : ''}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Button color="primary" onClick={handleAssignmentRegistration}>
                    Register Assignment
                  </Button>
                </Form>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <h5 className="title">Assignment Details</h5>
              </CardHeader>
              <CardBody>
                {selectedAssignment ? (
                  <AssignmentDetails assignment={selectedAssignment} />
                ) : (
                  <p>No assignment selected</p>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default User;