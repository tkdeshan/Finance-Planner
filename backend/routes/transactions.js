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
router.post("/add-expense", addExpense);
router.get("/get-expenses", getExpenses);
router.delete("/delete-expense/:id", deleteExpense);
router.put("/update-expense/:id", updateExpense);
router.get("/get-expense-recommendation", getExpenseRecommendation);

//Saving Routes
router.post("/add-saving", addSaving);
router.get("/get-savings", getSavings);
router.delete("/delete-saving/:id", deleteSaving);
router.put("/update-saving/:id", updateSaving);
router.get("/get-recommendation", getRecommendation);

//Investment Routes
router.post("/add-investment", addInvestment);
router.get("/get-investments", getInvestments);
router.delete("/delete-investment/:id", deleteInvestment);
router.put("/update-investment/:id", updateInvestment);
router.get("/get-invest-recommendation", getInvestmentRecommendation);

//GPT Recommendation
// router.post("/recommendation", async (req, res) => {
//   const { category, amount } = req.body;
//     const recommendation = await getRecommendation(category, amount);
//     res.json(recommendation);
// });

module.exports = router;
