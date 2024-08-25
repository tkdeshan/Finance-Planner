import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Button/Button";
import { sendMessage, closeButton } from "../../utils/icons";

const ChatBox = ({ isOpen, onClose, recommendations, request }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, newMessage]);
      setNewMessage("");
    }
  };

  return (
    <>
      {isOpen && (
        <Overlay>
          <ChatBoxStyled>
            <div className="header">
              <h4>Chat with Ai bot</h4>
              <Button icon={closeButton} onClick={onClose} />
            </div>
            <div className="chatbox-body">
              {recommendations ? (
                <div dangerouslySetInnerHTML={{ __html: recommendations }} />
              ) : (
                <p>No recommendations available.</p>
              )}
            </div>
            <div>{request}</div>
            <div className="messages">
              {messages.map((msg, index) => (
                <p key={index}>{msg}</p>
              ))}
            </div>
            <div className="footer">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
              />
              <Button icon={sendMessage} onClick={handleSendMessage} />
            </div>
          </ChatBoxStyled>
        </Overlay>
      )}
    </>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4); /* Dark background with opacity */
  backdrop-filter: blur(5px); /* Optional: adds a blur effect */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChatBoxStyled = styled.div`
  width: 800px;
  max-height: 500px;
  overflow: auto;
  background: #f2eded;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;

  .header {
    padding: 0.5rem;
    background: #f5f5f5;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .chatbox-body {
    padding: 1rem;
    margin: 1rem;
    width: 70%;
    border-radius: 10px;
    background: #20b9e8;
    border: 1px solid #4d4f4d;
  }

  .messages {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin: 1rem;
    width: 70%;
    margin-left: auto;
    border-radius: 10px;
    background: #20e866;
    border-bottom: 1px solid #4d4f4d;
  }

  .footer {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    background: #f5f5f5;

    input {
      flex: 1;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 5px;
    }

    button {
      margin-left: 0.5rem;
    }
  }
`;

export default ChatBox;
