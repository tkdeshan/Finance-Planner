import React, { useState } from "react";
import styled from "styled-components";
import { dateFormat } from "../../utils/dateFormat";
import {
  bitcoin,
  book,
  calender,
  card,
  circle,
  clothing,
  comment,
  food,
  freelance,
  medical,
  money,
  piggy,
  stocks,
  takeaway,
  trash,
  edit,
  tv,
  users,
  yt,
  chat,
} from "../../utils/icons";
import EditModal from "../UpdateIncome/updateIncome";
import Button from "../Button/Button";
import { useGlobalContext } from "../../context/globalContext";
import Swal from "sweetalert2";
import ChatBox from "../ChatBox/ChatBox";
import axios from "axios";

function IncomeItem({ id, title, amount, date, category, description, deleteItem, indicatorColor, type }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isChatOpen, setChatOpen] = useState(false); // State to control chat box visibility
  const { updateIncome, setError, getIncomes } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState("");

  const handleEdit = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleUpdate = async (updatedItem) => {
    const result = await updateIncome(updatedItem).catch((err) => {
      console.error("Update failed:", err);
      setError(err.response?.data.message || "Failed to update income.");
    });

    if (result === "success") {
      Swal.fire({
        title: "Success!",
        text: "Income updated successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
      handleClose();
      getIncomes();
    } else {
      console.error("Failed to update item:");
    }
  };

  const handleGetRecommendations = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/get-income-recommendation/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRecommendations(response.data);
      if (response) {
        setChatOpen(!isChatOpen);
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  const categoryIcon = () => {
    switch (category) {
      case "salary":
        return money;
      case "freelancing":
        return freelance;
      case "investments":
        return stocks;
      case "stocks":
        return users;
      case "bitcoin":
        return bitcoin;
      case "bank":
        return card;
      case "youtube":
        return yt;
      case "other":
        return piggy;
      default:
        return "";
    }
  };

  const expenseCatIcon = () => {
    switch (category) {
      case "education":
        return book;
      case "groceries":
        return food;
      case "health":
        return medical;
      case "subscriptions":
        return tv;
      case "takeaways":
        return takeaway;
      case "clothing":
        return clothing;
      case "travelling":
        return freelance;
      case "other":
        return circle;
      default:
        return "";
    }
  };

  return (
    <>
      <IncomeItemStyled indicator={indicatorColor}>
        <div className="icon">{type === "expense" ? expenseCatIcon() : categoryIcon()}</div>
        <div className="content">
          <h5>{title}</h5>
          <div className="inner-content">
            <div className="text">
              <p>LKR {amount}</p>
              <p>
                {calender} {dateFormat(date)}
              </p>
            </div>

            <div className="btn-con">
              <Button
                icon={edit}
                bPad={"0.6rem"}
                bRad={"50%"}
                bg={"var(--primary-color)"}
                color={"#fff"}
                iColor={"#fff"}
                hColor={"var(--color-green)"}
                onClick={handleEdit}
              />
              <Button
                icon={trash}
                bPad={"0.6rem"}
                bRad={"50%"}
                bg={"var(--primary-color)"}
                color={"#fff"}
                iColor={"#fff"}
                hColor={"var(--color-green)"}
                onClick={() => deleteItem(id)}
              />
              <Button
                icon={chat}
                bPad={"0.6rem"}
                bRad={"50%"}
                bg={"var(--primary-color)"}
                color={"#fff"}
                iColor={"#fff"}
                hColor={"var(--color-green)"}
                onClick={handleGetRecommendations}
              />
            </div>
          </div>
          <p>{description}</p>
        </div>
      </IncomeItemStyled>
      <EditModal
        isOpen={isModalOpen}
        onClose={handleClose}
        item={{ id, title, amount, date, category, description }}
        onUpdate={handleUpdate}
      />
      {isChatOpen && <ChatBox isOpen={isChatOpen} recommendations={recommendations} onClose={() => setChatOpen(false)} />}
    </>
  );
}

const IncomeItemStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  color: #222260;
  .icon {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #ffffff;
    i {
      font-size: 2.6rem;
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    h5 {
      font-size: 1.3rem;
      padding-left: 2rem;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background: ${(props) => props.indicator};
      }
    }

    .btn-con {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }

    .inner-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .text {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        p {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary-color);
          opacity: 0.8;
        }
      }
    }
  }
`;

export default IncomeItem;
