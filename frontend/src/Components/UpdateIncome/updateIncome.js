import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ModalStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 500px;
  }

  .input-group,
  .selects {
    margin-bottom: 10px;

    label {
      display: block;
      margin-bottom: 5px;
    }

    input,
    textarea,
    select,
    .react-datepicker-wrapper {
      width: 100%;
    }

    input,
    textarea,
    select {
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #ccc;
    }
  }
`;

const StyledButton = styled.button`
  padding: 10px 15px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

function EditModal({ isOpen, onClose, item, onUpdate }) {
  const [editedItem, setEditedItem] = useState({ ...item });

  useEffect(() => {
    if (item) {
      setEditedItem(item);
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setEditedItem((prev) => ({ ...prev, date }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prev) => ({ ...prev, [name]: value }));
  };

  return isOpen ? (
    <ModalStyled>
      <div className="modal-content">
        <div className="input-group">
          <label>Title</label>
          <input type="text" name="title" value={editedItem.title || ""} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Amount</label>
          <input type="text" name="amount" value={editedItem.amount || ""} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Description</label>
          <textarea name="description" value={editedItem.description || ""} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label>Date</label>
          <DatePicker
            selected={editedItem.date ? new Date(editedItem.date) : null}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Enter a Date"
          />
        </div>
        <div className="selects input-group">
          <label>Category</label>
          <select name="category" value={editedItem.category || ""} onChange={handleSelectChange}>
            <option value="" disabled>
              Select Category
            </option>
            <option value="salary">Salary</option>
            <option value="freelancing">Freelancing</option>
            <option value="investments">Investments</option>
            <option value="stocks">Stocks</option>
            <option value="bitcoin">Bitcoin</option>
            <option value="bank">Bank Transfer</option>
            <option value="youtube">YouTube</option>
            <option value="other">Other</option>
          </select>
        </div>
        <StyledButton onClick={() => onUpdate(editedItem)}>Update</StyledButton>
        <StyledButton onClick={onClose}>Cancel</StyledButton>
      </div>
    </ModalStyled>
  ) : null;
}

export default EditModal;
