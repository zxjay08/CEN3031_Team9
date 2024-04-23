// ChatPage.js
import React from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import {
  Row,
  Col,
} from "reactstrap";

// Create chat page functionality
class ChatPage extends React.Component {
  // First time message
  componentDidMount() {
    addResponseMessage("Welcome to Secretary Bot! How can I assist you today?");
  }

  // Message handler
  handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // TODO: add chat logic
  };

  // View chat page HTML
  render() {
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col md="8">
              <Widget
                handleNewUserMessage={this.handleNewUserMessage}
                title="Secretary Bot"
                subtitle="Ask me anything!"
              />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default ChatPage;
