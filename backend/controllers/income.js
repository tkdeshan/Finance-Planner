const IncomeSchema = require("../models/IncomeModel");
const axios = require('axios');

exports.addIncome = async (req, res) => {
  const { title, amount, description, category, type, date } = req.body;

  const income = new IncomeSchema({
    title,
    type,
    amount,
    description,
    category,
    date,
  });
  console.log(income);

  try {
    //validations
    if (!title || !amount || !description || !category || !date) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    if (amount < 0 || !amount === "number") {
      return res.status(400).json({ msg: "Amount cannot be negative" });
    }
    console.log(income);
    await income.save();
    res.status(200).json({ msg: "Income added successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getIncomes = async (req, res) => {
  try {
    const income = await IncomeSchema.find();
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  IncomeSchema.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ msg: "Income deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ msg: "Server Error" });
    });
};

exports.updateIncome = async (req, res) => {
  console.log("🚀 ~ exports.updateIncome= ~ req:", req.body);
  const { id } = req.params;
  const updateData = req.body;

  if (!id) {
    return res.status(400).json({ msg: "Missing income ID" });
  }

  try {
    // Using 'new: true' to return the updated document and 'runValidators: true' to apply schema validations on update
    const updatedIncome = await IncomeSchema.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedIncome) {
      return res.status(404).json({ msg: "Income not found" });
    }

    return res.status(200).json({
      msg: "Income updated successfully",
      income: updatedIncome,
    });
  } catch (err) {
    console.error("Error updating income:", err);
    // Handling specific Mongoose error codes here if needed
    if (err.name === "ValidationError") {
      return res.status(400).json({ msg: "Validation Error", errors: err.errors });
    }
    return res.status(500).json({ msg: "Server Error" });
  }
};

exports.getIncomeRecommendation = async (req, res) => {
  try {
    // Step 1: Fetch all investments with category and amount
    const Incomes = await IncomeSchema.find().select('category amount');

    // Step 2: Format the data as required by the external API
    const formattedData = Incomes.map(Income => `('${Income.category}',${Income.amount})`).join(',');

    const requestData = {
      rectype: "income",
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

