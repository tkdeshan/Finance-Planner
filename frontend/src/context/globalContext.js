import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api/v1`;

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [savings, setSavings] = useState([]);
  const [error, setError] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const getUserDetails = async () => {
    try {
      const token = getToken();
      const response = await axios.get(`${BASE_URL}/get-user-details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserDetails(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching user details");
    }
  };

  const addIncome = async (income) => {
    const token = getToken();

    try {
      await axios.post(`${BASE_URL}/add-income`, income, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return "success";
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while adding income");
    }
  };

  const updateIncome = async (income) => {
    const token = getToken();
    await axios
      .put(`${BASE_URL}/update-income/${income.id}`, income, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
    return "success";
  };

  const getIncomes = async () => {
    const token = getToken();
    const response = await axios.get(`${BASE_URL}/get-incomes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setIncomes(response.data);
  };

  const deleteIncome = async (id) => {
    const token = getToken();
    await axios.delete(`${BASE_URL}/delete-income/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    getIncomes();
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  const addExpense = async (expense) => {
    const token = getToken();

    try {
      await axios.post(`${BASE_URL}/add-expense`, expense, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return "success";
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while adding income");
    }
  };

  const updateExpense = async (expense) => {
    const token = getToken();
    await axios
      .put(`${BASE_URL}/update-expense/${expense.id}`, expense, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
    return "success";
  };

  const getExpenses = async () => {
    const token = getToken();
    const response = await axios.get(`${BASE_URL}/get-expenses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setExpenses(response.data);
  };

  const deleteExpense = async (id) => {
    const token = getToken();
    await axios.delete(`${BASE_URL}/delete-expense/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    getExpenses();
  };

  const totalExpenses = () => {
    let totalExpenses = 0;
    expenses.forEach((expense) => {
      totalExpenses = totalExpenses + expense.amount;
    });

    return totalExpenses;
  };

  const addInvestment = async (investment) => {
    const token = getToken();

    try {
      await axios.post(`${BASE_URL}/add-investment`, investment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return "success";
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while adding investment");
    }
  };

  const updateInvestment = async (investment) => {
    const token = getToken();
    await axios
      .put(`${BASE_URL}/update-investment/${investment.id}`, investment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
    return "success";
  };

  const getInvestments = async () => {
    const token = getToken();
    const response = await axios.get(`${BASE_URL}/get-investments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setInvestments(response.data);
  };

  const deleteInvestment = async (id) => {
    const token = getToken();
    await axios.delete(`${BASE_URL}/delete-investment/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    getInvestments();
  };

  const totalInvestments = () => {
    let totalInvestments = 0;
    investments.forEach((investment) => {
      totalInvestments = totalInvestments + investment.amount;
    });

    return totalInvestments;
  };

  const addSaving = async (saving) => {
    const token = getToken();

    try {
      await axios.post(`${BASE_URL}/add-saving`, saving, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return "success";
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while adding saving");
    }
  };

  const updateSaving = async (saving) => {
    const token = getToken();
    await axios
      .put(`${BASE_URL}/update-saving/${saving.id}`, saving, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
    return "success";
  };

  const getSavings = async () => {
    const token = getToken();
    const response = await axios.get(`${BASE_URL}/get-savings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setSavings(response.data);
  };

  const deleteSaving = async (id) => {
    const token = getToken();
    await axios.delete(`${BASE_URL}/delete-saving/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    getSavings();
  };

  const totalSavings = () => {
    let totalSavings = 0;
    savings.forEach((saving) => {
      totalSavings = totalSavings + saving.amount;
    });

    return totalSavings;
  };

  const totalBalance = () => {
    return totalIncome() - (totalExpenses() + totalInvestments() + totalSavings());
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses, ...investments, ...savings];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        updateIncome,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        addExpense,
        updateExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        addInvestment,
        updateInvestment,
        getInvestments,
        deleteInvestment,
        totalInvestments,
        addSaving,
        updateSaving,
        getSavings,
        deleteSaving,
        totalSavings,
        investments,
        savings,
        totalBalance,
        transactionHistory,
        getUserDetails,
        userDetails,
        error,
        setError,
        isAuthenticated,
        setIsAuthenticated,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
