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

function Form() {
  const { addIncome, getIncomes, error, setError } = useGlobalContext();
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

  const handleGetRecommendations = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/get-income-recommendation`);
      setRecommendations(response.data);
      setIsPopupOpen(true);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addIncome(inputState);

    if (result === "success") {
      Swal.fire({
        title: "Success!",
        text: "Income created successfully",
        icon: "success",
        confirmButtonText: "OK",
      })
      handleClose();
      getIncomes();
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

  return (
    <FormStyled onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <div className="input-control">
        <input
          type="text"
          required
          value={title}
          name={"title"}
          placeholder="Salary Title"
          onChange={handleInput("title")}
        />
      </div>
      <div className="input-control">
        <input
          value={amount}
          required
          type="number"
          name={"amount"}
          placeholder={"Salary Amount"}
          onChange={handleInput("amount")}
        />
      </div>
      <div className="input-control">
        <DatePicker
          id="date"
          placeholderText="Enter A Date"
          selected={date}
          required
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
          <option value="salary">Salary</option>
          <option value="freelancing">Freelancing</option>
          <option value="investments">Investments</option>
          <option value="stocks">Stocks</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="bank">Bank Transfer</option>
          <option value="youtube">Youtube</option>
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
          name={"Add Income"}
          icon={plus}
          bPad={".8rem 1.6rem"}
          bRad={"30px"}
          bg={"var(--color-accent"}
          color={"#fff"}
        />
      </div>
      <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
        <h2>Income Recommendations</h2>
        <p>{recommendations}</p>
      </Popup>
    </FormStyled>
  );
}

const FormStyled = styled.form`
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
    input {
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
export default Form;
