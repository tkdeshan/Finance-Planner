const ExpenseSchema = require("../models/ExpenseModel");

const axios = require('axios');

exports.addExpense = async (req, res) => {
  console.log(req.body);
  const { title, amount, description, category, type, date } = req.body;

  const expense = new ExpenseSchema({
    title,
    type,
    amount,
    description,
    category,
    date,
  });

  try {
    //validations
    if (!title || !amount || !description || !category || !date) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    if (amount < 0 || !amount === "number") {
      return res.status(400).json({ msg: "Amount cannot be negative" });
    }
    await expense.save();
    res.status(200).json({ msg: "Expense added successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await ExpenseSchema.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  ExpenseSchema.findByIdAndDelete(id)
    .then((expense) => {
      res.status(200).json({ msg: "Expense deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ msg: "Server Error" });
    });
};

exports.updateExpense = async (req, res) => {
  console.log("🚀 ~ exports.updateExpense= ~ req:", req.body);
  const { id } = req.params;
  const updateData = req.body;

  if (!id) {
    return res.status(400).json({ msg: "Missing expense ID" });
  }

  try {
    // Using 'new: true' to return the updated document and 'runValidators: true' to apply schema validations on update
    const updatedExpense = await ExpenseSchema.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedExpense) {
      return res.status(404).json({ msg: "Expense not found" });
    }

    return res.status(200).json({
      msg: "Expense updated successfully",
      expense: updatedExpense,
    });
  } catch (err) {
    console.error("Error updating expense:", err);
    // Handling specific Mongoose error codes here if needed
    if (err.name === "ValidationError") {
      return res
        .status(400)
        .json({ msg: "Validation Error", errors: err.errors });
    }
    return res.status(500).json({ msg: "Server Error" });
  }
};


exports.getExpenseRecommendation = async (req, res) => {
  try {
    // Step 1: Fetch all investments with category and amount
    const Expenses = await ExpenseSchema.find().select('category amount');

    // Step 2: Format the data as required by the external API
    const formattedData = Expenses.map(Expense => `('${Expense.category}',${Expense.amount})`).join(',');

    const requestData = {
      rectype: "expense",
      data: `[${formattedData}]`
    };
    console.log("Post Data:", requestData);
    

    // Step 3: Send the data to the external API
    const apiUrl = 'https://us-central1-single-scholar-431016-j9.cloudfunctions.net/GPT_Backend';
    const response = await axios.post(apiUrl, requestData);

    // Step 4: Return the API response to the client
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching investment recommendation:", error.message);
    res.status(500).json({ msg: "Server Error" });
  }
};
