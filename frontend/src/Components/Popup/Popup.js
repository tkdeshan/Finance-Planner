import React from "react";
import styled from "styled-components";

function Popup({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <PopupStyled>
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </PopupStyled>
  );
}

const PopupStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
   background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure the popup is on top of other content */

  .popup-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    position: relative;
    max-width: 500px;
    width: 100%;
    z-index: 1001; /* Ensure the content is above the overlay */
  }

  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }
`;

export default Popup;
