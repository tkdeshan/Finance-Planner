import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Button/Button";
import { sendMessage, closeButton } from "../../utils/icons";
import axios from "axios";

const ChatBox = ({ isOpen, onClose, recommendations, request }) => {
  const [chatHistory, setChatHistory] = useState([
    { sender: "user", message: request }, // As a user request message
    { sender: "bot", message: recommendations }, // As a bot response
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendRequestToGemini = async (prompt) => {
    try {
      const requestData = {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      };
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAdSwKohVCrS20S26iPNTtaUjllcU4j180`;
      const response = await axios.post(apiUrl, requestData);

      // Apply formatting to the AI response
      const formattedRecommendations = response.data?.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold text
        .replace(/\*/g, "<br><br>"); // New line

      return formattedRecommendations;
    } catch (error) {
      throw error;
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      // Add user message to chat history
      const updatedHistory = [...chatHistory, { sender: "user", message: newMessage }];
      setChatHistory(updatedHistory);

      // Clear input field
      setNewMessage("");

      try {
        // Get AI response
        const aiResponse = await sendRequestToGemini(updatedHistory.map((msg) => msg.message).join("\n"));

        // Add AI response to chat history
        setChatHistory([...updatedHistory, { sender: "bot", message: aiResponse }]);
      } catch (error) {
        // Handle error (e.g., show error message)
        setChatHistory([...updatedHistory, { sender: "bot", message: "Error in AI response." }]);
      }
    }
  };

  return (
    <>
      {isOpen && (
        <Overlay>
          <ChatBoxStyled>
            <div className="header">
              <h4>Chat with AI bot</h4>
              <Button icon={closeButton} onClick={onClose} />
            </div>
            <div className="chatbox-body">
              {chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`message ${chat.sender === "user" ? "user-message" : "bot-message"}`}>
                  {chat.sender === "bot" ? (
                    <div dangerouslySetInnerHTML={{ __html: chat.message }} />
                  ) : (
                    <p>{chat.message}</p>
                  )}
                </div>
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
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChatBoxStyled = styled.div`
  width: 800px;
  max-height: 500px;
  overflow: auto;
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  position: relative; /* Set position to relative */
  z-index: 10000; /* Ensure it is below the ChatBox */

  .header {
    padding: 0.5rem;
    background: #e3bbf0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .chatbox-body {
    flex-grow: 1;
    padding: 1rem;
    overflow-y: auto;

    .message {
      max-width: 70%;
      margin-bottom: 1rem;
      padding: 0.75rem;
      border-radius: 10px;
    }

    .user-message {
      margin-left: auto;
      align-self: flex-end;
      background: #e6e8e6;
      color: #000;
      text-align: right;
    }

    .bot-message {
      align-self: flex-start;
      background: #e6e8e6;
      color: #fff;
      color: #000;
    }
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
