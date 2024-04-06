import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import PanelHeader from "components/PanelHeader/PanelHeader.js";

// Sample initial data for the table
const initialContacts = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", phone: "123-456-7890" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", phone: "987-654-3210" },
];

function RegularTables() {
  // State variables for contact form and list of registered contacts
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [contacts, setContacts] = useState(initialContacts);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Create new contact object
    const newContact = {
      id: contacts.length + 1, // Generate unique ID
      name,
      email,
      phone
    };
    // Add new contact to the beginning of the list of contacts
    setContacts([newContact, ...contacts]);
    // Reset form fields
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Contact Information List</CardTitle>
              </CardHeader>
              <CardBody>
                {/* Display registered contacts in a table */}
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map(contact => (
                      <tr key={contact.id}>
                        <td>{contact.name}</td>
                        <td>{contact.email}</td>
                        <td>{contact.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Register Contact</CardTitle>
              </CardHeader>
              <CardBody>
                {/* Contact information registration form */}
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="phone">Phone</Label>
                    <Input
                      type="text"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <Button color="primary" type="submit">
                    Register Contact
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

export default RegularTables;
