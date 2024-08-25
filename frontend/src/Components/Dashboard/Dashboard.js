import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import History from "../../History/History";
import { InnerLayout } from "../../styles/Layouts";
import { LKR } from "../../utils/icons";
import Chart from "../Chart/Chart";

function Dashboard() {
  const {
    totalExpenses,
    incomes,
    expenses,
    investments,
    savings,
    totalInvestments,
    totalSavings,
    totalIncome,
    totalBalance,
    getIncomes,
    getExpenses,
    getInvestments,
    getSavings,
  } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
    getInvestments();
    getSavings();
  }, []);

  return (
    <DashboardStyled>
      <InnerLayout>
        <h1>All Transactions</h1>
        <div className="stats-con">
          <div className="chart-con">
            <Chart />
            <div className="amount-con">
              <div className="income">
                <h2>Total Income</h2>
                <p>LKR {totalIncome()}</p>
              </div>
              <div className="expense">
                <h2>Total Expense</h2>
                <p>LKR {totalExpenses()}</p>
              </div>
              <div className="investment">
                <h2>Total Investment</h2>
                <p>LKR {totalInvestments()}</p>
              </div>
              <div className="saving">
                <h2>Total Saving</h2>
                <p>LKR {totalSavings()}</p>
              </div>
              <div className="balance">
                <h2>Total Balance</h2>
                <p>LKR {totalBalance()}</p>
              </div>
            </div>
          </div>
          <div className="history-con">
            <History />
            <div className="salary-info">
              <h2 className="salary-title">
                Min <span>Salary</span>Max
              </h2>
              <div className="salary-item">
                <p>LKR{Math.min(...incomes.map((item) => item.amount))}</p>
                <p>LKR{Math.max(...incomes.map((item) => item.amount))}</p>
              </div>
              <h2 className="salary-title">
                Min <span>Expense</span>Max
              </h2>
              <div className="salary-item">
                <p>LKR{Math.min(...expenses.map((item) => item.amount))}</p>
                <p>LKR{Math.max(...expenses.map((item) => item.amount))}</p>
              </div>
              <h2 className="salary-title">
                Min <span>Investment</span>Max
              </h2>
              <div className="salary-item">
                <p>LKR{Math.min(...investments.map((item) => item.amount))}</p>
                <p>LKR{Math.max(...investments.map((item) => item.amount))}</p>
              </div>
              <h2 className="salary-title">
                Min <span>Saving</span>Max
              </h2>
              <div className="salary-item">
                <p>LKR{Math.min(...savings.map((item) => item.amount))}</p>
                <p>LKR{Math.max(...savings.map((item) => item.amount))}</p>
              </div>
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  .stats-con {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;

    @media (max-width: 1200px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .chart-con {
      grid-column: 1 / 4;
      height: 300px; // Reduced chart height

      @media (max-width: 1200px) {
        grid-column: 1 / -1;
      }

      .amount-con {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        margin-top: 2rem;

        @media (max-width: 1200px) {
          grid-template-columns: repeat(2, 1fr);
        }

        @media (max-width: 768px) {
          grid-template-columns: 1fr;
        }

        .income,
        .expense,
        .investment,
        .saving {
          grid-column: span 2;

          @media (max-width: 768px) {
            grid-column: span 1;
          }
        }

        .income,
        .expense,
        .investment,
        .saving,
        .balance {
          background: #fcf6f9;
          border: 2px solid #ffffff;
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          padding: 1rem;
          p {
            font-size: 3.5rem;
            font-weight: 700;
          }
        }

        .balance {
          grid-column: 2 / 4;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          @media (max-width: 1200px) {
            grid-column: span 2;
          }

          @media (max-width: 768px) {
            grid-column: span 1;
          }

          p {
            color: var(--color-green);
            opacity: 0.6;
            font-size: 4.5rem;
          }
        }
      }
    }

    .history-con {
      grid-column: 4 / -1;

      @media (max-width: 1200px) {
        grid-column: 1 / -1;
      }

      @media (max-width: 768px) {
        grid-column: 1 / -1;
      }

      .salary-info {
        background: #fcf6f9;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;

        .salary-title {
          font-size: 1.2rem;
          span {
            font-size: 1.8rem;
          }
        }

        .salary-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          p {
            font-weight: 600;
            font-size: 1.6rem;
          }
        }
      }
    }
  }
`;

export default Dashboard;
