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

function AssignmentDetails({ assignment }) {
  return (
    <Card>
      <CardHeader>
        <h5 className="title">Assignment Details</h5>
      </CardHeader>
      <CardBody>
        <ul>
          <li><strong>Title:</strong> {assignment.title}</li>
          <li><strong>Description:</strong> {assignment.description}</li>
          <li><strong>Due Date:</strong> {assignment.dueDate}</li>
          {/* Add more details here as needed */}
        </ul>
      </CardBody>
    </Card>
  );
}

function User() {
  // Dummy data for registered students
  const registeredStudents = [
    { id: 1, name: "John Doe", major: "Computer Science", email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", major: "Mathematics", email: "jane.smith@example.com" },
    { id: 3, name: "Michael Johnson", major: "Physics", email: "michael.johnson@example.com" },
    { id: 4, name: "Emily Brown", major: "Biology", email: "emily.brown@example.com" },
  ];

  // Dummy data for assignments
  const [assignments, setAssignments] = useState([
    { id: 1, title: "Assignment 1", description: "Description for Assignment 1", dueDate: "2024-04-10" },
    { id: 2, title: "Assignment 2", description: "Description for Assignment 2", dueDate: "2024-04-15" },
    // Add more assignments as needed
  ]);
  const [newAssignmentTitle, setNewAssignmentTitle] = useState('');
  const [newAssignmentDescription, setNewAssignmentDescription] = useState('');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleAssignmentClick = (assignment) => {
    setSelectedAssignment(assignment);
  };

  const handleAssignmentRegistration = () => {
    if (newAssignmentTitle.trim() !== '') {
      const newAssignment = {
        id: assignments.length + 1,
        title: newAssignmentTitle,
        description: newAssignmentDescription,
        dueDate: selectedDate.toISOString().split('T')[0],
        // You can add more properties here as needed
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
                <div>
                  <Calendar
                    locale="en-US"
                    tileContent={({ date, view }) => {
                      if (view === 'month') {
                        const assignmentForDate = assignments.find(assignment => assignment.dueDate === date.toISOString().split('T')[0]);
                        return assignmentForDate ? (
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => handleAssignmentClick(assignmentForDate)}
                          >
                            {assignmentForDate.title}
                          </span>
                        ) : null;
                      }
                    }}
                    onClickDay={(value) => {
                      setSelectedDate(value);
                      setSelectedAssignment(null);
                    }}
                  />
                </div>
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
