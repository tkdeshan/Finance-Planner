import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../context/globalContext";
import Button from "../Button/Button";
import { plus } from "../../utils/icons";
import Popup from "../Popup/Popup";
import axios from "axios";
import Swal from "sweetalert2";

function ExpenseForm() {
  const { addExpense, getExpenses, error, setError } = useGlobalContext();
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    description: "",
  });

  const [recommendations, setRecommendations] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isModalOpen, setModalOpen] = useState(false);
  const { title, amount, date, category, description } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError("");
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addExpense(inputState);

    if (result === "success") {
      Swal.fire({
        title: "Success!",
        text: "Expence created successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
      handleClose();
      getExpenses();
    } else {
      console.error("Failed to create item:");
    }

    setInputState({
      title: "",
      amount: "",
      date: "",
      category: "",
      description: "",
    });
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <ExpenseFormStyled onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <div className="input-control">
        <input
          required
          type="text"
          value={title}
          name="title"
          placeholder="Expense Title"
          onChange={handleInput("title")}
        />
      </div>
      <div className="input-control">
        <input
          required
          value={amount}
          type="number"
          name="amount"
          placeholder="Expense Amount"
          onChange={handleInput("amount")}
        />
      </div>
      <div className="input-control">
        <DatePicker
          required
          id="date"
          placeholderText="Enter A Date"
          selected={date}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => {
            setInputState({ ...inputState, date: date });
          }}
        />
      </div>
      <div className="selects input-control">
        <select required value={category} name="category" id="category" onChange={handleInput("category")}>
          <option value="" disabled>
            Select Option
          </option>
          <option value="education">Education</option>
          <option value="groceries">Groceries</option>
          <option value="health">Health</option>
          <option value="subscriptions">Subscriptions</option>
          <option value="takeaways">Takeaways</option>
          <option value="clothing">Clothing</option>
          <option value="travelling">Travelling</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="input-control">
        <textarea
          required
          name="description"
          value={description}
          placeholder="Add A Reference"
          id="description"
          cols="30"
          rows="4"
          onChange={handleInput("description")}></textarea>
      </div>
      <div className="submit-btn">
        <Button
          name="Add Expense"
          icon={plus}
          bPad=".8rem 1.6rem"
          bRad="30px"
          bg="var(--color-accent"
          color="#fff"
        />
      </div>

      {/* Popup for Recommendations */}
      <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
        <h2>Expense Recommendations</h2>
        <p>{recommendations}</p>
      </Popup>
    </ExpenseFormStyled>
  );
}

const ExpenseFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);
    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
  }
  .input-control {
    input,
    textarea {
      width: 100%;
    }
  }

  .selects {
    display: flex;
    justify-content: flex-end;
    select {
      color: rgba(34, 34, 96, 0.4);
      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  .submit-btn {
    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }
`;

export default ExpenseForm;
