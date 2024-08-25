const {
  addIncome,
  getIncomes,
  deleteIncome,
  updateIncome,
  getIncomeRecommendation,
} = require("../controllers/income");
const {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
  getExpenseRecommendation,
} = require("../controllers/expense");
const {
  addSaving,
  getSavings,
  deleteSaving,
  updateSaving,
  getRecommendation,
} = require("../controllers/saving");
const {
  addInvestment,
  getInvestments,
  deleteInvestment,
  getInvestmentRecommendation,
  updateInvestment,
} = require("../controllers/investment");
const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");

//Income Routes
router.post("/add-income", verifyToken, addIncome);
router.get("/get-incomes", verifyToken, getIncomes);
router.delete("/delete-income/:id", verifyToken, deleteIncome);
router.put("/update-income/:id", verifyToken, updateIncome);
router.get("/get-income-recommendation/:id", verifyToken, getIncomeRecommendation);

//Expense Routes
router.post("/add-expense", verifyToken, addExpense);
router.get("/get-expenses", verifyToken, getExpenses);
router.delete("/delete-expense/:id", verifyToken, deleteExpense);
router.put("/update-expense/:id", verifyToken, updateExpense);
router.get("/get-expense-recommendation/:id", verifyToken, getExpenseRecommendation);

//Saving Routes
router.post("/add-saving", verifyToken, addSaving);
router.get("/get-savings", verifyToken, getSavings);
router.delete("/delete-saving/:id", verifyToken, deleteSaving);
router.put("/update-saving/:id", verifyToken, updateSaving);
router.get("/get-recommendation/:id", verifyToken, getRecommendation);

//Investment Routes
router.post("/add-investment", verifyToken, addInvestment);
router.get("/get-investments", verifyToken, getInvestments);
router.delete("/delete-investment/:id", verifyToken, deleteInvestment);
router.put("/update-investment/:id", verifyToken, updateInvestment);
router.get("/get-invest-recommendation/:id", verifyToken, getInvestmentRecommendation);

module.exports = router;
