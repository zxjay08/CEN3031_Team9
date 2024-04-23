import React, { useState, useEffect } from "react";
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
import axios from "axios";


// Shows a single assignment
function AssignmentDetails({ assignment }) {
  if (!assignment) {
    return null;  // Fail if the assignment does not exist
  }
  // Return information inside the assignment
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
        </ul>
      </CardBody>
    </Card>
  );
}

// Assignments view handler
function User() {
  // Include 2 basic assignments
  const [assignments, setAssignments] = useState([
    { id: 1, title: "Assignment 1", description: "Description for Assignment 1", dueDate: new Date("2024-04-10") },
    { id: 2, title: "Assignment 2", description: "Description for Assignment 2", dueDate: new Date("2024-04-15") },
  ]);
  const [newAssignmentTitle, setNewAssignmentTitle] = useState('');
  const [newAssignmentDescription, setNewAssignmentDescription] = useState('');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  

  useEffect(() => {
    const initLoad = async () => {
      const backendAssignments = await axios.get('http://127.0.0.1:8000/get-assignments')
      setAssignments(backendAssignments.data)
      return
    };
    initLoad();
  }, [])
  // Show information upon clicking the assignment
  const handleAssignmentClick = async (date) => {
  const assignmentForDate = assignments.find((assignment) => {
    const assignmentDate = new Date(assignment.dueDate);
    return (
      assignmentDate.getFullYear() === date.getFullYear() &&
      assignmentDate.getMonth() === date.getMonth() &&
      assignmentDate.getDate()+1 === date.getDate()
    );
  });
  setSelectedAssignment(assignmentForDate || null);
  const backendAssignments = await axios.get('http://127.0.0.1:8000/get-assignments')
      setAssignments(backendAssignments.data)
};

  // Handler that creates assignments
  const handleAssignmentRegistration = async (e) => {
    if (newAssignmentTitle.trim() !== '') {
      const newAssignment = {
        title: newAssignmentTitle,
        description: newAssignmentDescription,
        dueDate: selectedDate.getFullYear() + "-" + (parseInt(selectedDate.getMonth())+1).toString() + "-" + selectedDate.getDate()
      };
      console.log(newAssignment.dueDate)
      await axios.post('http://127.0.0.1:8000/create-assignment', newAssignment)
      setNewAssignmentTitle('');
      setNewAssignmentDescription('');
      setSelectedDate(null);
      const backendAssignments = await axios.get('http://127.0.0.1:8000/get-assignments')
      setAssignments(backendAssignments.data)
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
                          // Show assignment information
                        assignmentDate.getFullYear() === date.getFullYear() &&
                        assignmentDate.getMonth() === date.getMonth() &&
                        assignmentDate.getDate()+1 === date.getDate()
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
                          value={selectedDate ? selectedDate: ''}
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
