import React, { useState } from "react";
import axios from "axios";
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

// User profile view function
function User() {
  const [userType, setUserType] = useState('student');
  const [showMajorInput, setShowMajorInput] = useState(true);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Allow user to change type
  const handleUserTypeChange = (e) => {
    const selectedType = e.target.value;
    setUserType(selectedType);
    setShowMajorInput(selectedType === 'student');
  };

  // Handle data update when the user clicks submit changes
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Authenticate user before changing information
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    // Required form data
    const formData = {
      user_type: userType,
      major: e.target.elements.major.value || 'n/a',
      username: e.target.elements.username.value,
      email: e.target.elements.email.value,
      first_name: e.target.elements.first_name.value,
      last_name: e.target.elements.last_name.value,
      address: e.target.elements.address.value,
      city: e.target.elements.city.value,
      country: e.target.elements.country.value,
      postal_code: e.target.elements.postal_code.value,
      about_student: e.target.elements.about_student.value,
      password: password,
    };

    try {
      // Use axios to connect to the backend at port 8000
      const response = await axios.post("http://127.0.0.1:8000/save-data", formData);
      console.log("Response:", response.data);
      setRegistrationComplete(true);
      window.location.href = '/login'; // Redirect to /login page upon success
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Register</h5>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col className="pr-1" md="5">
                      <FormGroup>
                        <label>User Type:</label>
                        <div className="radio-options">
                          <div className="radio-option">
                            <input
                              type="radio"
                              id="student"
                              name="userType"
                              value="student"
                              checked={userType === 'student'}
                              onChange={handleUserTypeChange}
                            />
                            <label htmlFor="student">Student</label>
                          </div>
                          <div className="radio-option">
                            <input
                              type="radio"
                              id="parent"
                              name="userType"
                              value="parent"
                              checked={userType === 'parent'}
                              onChange={handleUserTypeChange}
                            />
                            <label htmlFor="parent">Parent</label>
                          </div>
                          <div className="radio-option">
                            <input
                              type="radio"
                              id="teacher"
                              name="userType"
                              value="teacher"
                              checked={userType === 'teacher'}
                              onChange={handleUserTypeChange}
                            />
                            <label htmlFor="teacher">Teacher</label>
                          </div>
                          <div className="radio-option">
                            <input
                                type="radio"
                                id="advisor"
                                name="userType"
                                value="advisor"
                                checked={userType === 'advisor'}
                                onChange={handleUserTypeChange}
                            />
                            <label htmlFor="advisor">Advisor</label>
                          </div>
                          <div className="radio-option">
                            <input
                                type="radio"
                                id="secretary"
                                name="userType"
                                value="secretary"
                                checked={userType === 'secretary'}
                                onChange={handleUserTypeChange}
                            />
                            <label htmlFor="secretary">Secretary</label>
                          </div>
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    {showMajorInput && (
                      <Col className="pr-1" md="5">
                        <FormGroup>
                          <label>Major</label>
                          <Input name="major" placeholder="Major" type="text" />
                        </FormGroup>
                      </Col>
                    )}
                  </Row>
                  <Row>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Username</label>
                        <Input name="username" placeholder="Username" type="text" />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>Email address</label>
                        <Input name="email" placeholder="Email" type="email" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>First Name</label>
                        <Input name="first_name" placeholder="First Name" type="text" />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Last Name</label>
                        <Input name="last_name" placeholder="Last Name" type="text" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Address</label>
                        <Input name="address" placeholder="Address" type="text" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>City</label>
                        <Input name="city" placeholder="City" type="text" />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="4">
                      <FormGroup>
                        <label>Country</label>
                        <Input name="country" placeholder="Country" type="text" />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>Postal Code</label>
                        <Input name="postal_code" placeholder="ZIP Code" type="number" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>About Student</label>
                        <Input name="about_student" placeholder="Description" type="textarea" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Password</label>
                        <Input
                          name="password"
                          placeholder="Password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Confirm Password</label>
                        <Input
                          name="confirmPassword"
                          placeholder="Confirm Password"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Button color="primary" type="submit">
                    Register
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default User;
