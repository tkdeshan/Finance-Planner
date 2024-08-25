const InvestmentSchema = require("../models/InvestmentModel");

const axios = require('axios');

exports.addInvestment = async (req, res) => {
  const { title, amount, description, category, type, date } = req.body;

  const saving = new InvestmentSchema({
    title,
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
    await saving.save();
    res.status(200).json({ msg: "Investment added successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getInvestments = async (req, res) => {
  try {
    const investment = await InvestmentSchema.find();
    res.status(200).json(investment);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.deleteInvestment = async (req, res) => {
  const { id } = req.params;
  InvestmentSchema.findByIdAndDelete(id)
    .then((investment) => {
      res.status(200).json({ msg: "Investment deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ msg: "Server Error" });
    });
};

exports.updateInvestment = async (req, res) => {
  console.log("🚀 ~ exports.updateInvestment= ~ req:", req.body);
  const { id } = req.params;
  const updateData = req.body;

  if (!id) {
    return res.status(400).json({ msg: "Missing investment ID" });
  }

  try {
    // Using 'new: true' to return the updated document and 'runValidators: true' to apply schema validations on update
    const updatedInvestment = await InvestmentSchema.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedInvestment) {
      return res.status(404).json({ msg: "Investment not found" });
    }

    return res.status(200).json({
      msg: "Investment updated successfully",
      investment: updatedInvestment,
    });
  } catch (err) {
    console.error("Error updating investment:", err);
    // Handling specific Mongoose error codes here if needed
    if (err.name === "ValidationError") {
      return res
        .status(400)
        .json({ msg: "Validation Error", errors: err.errors });
    }
    return res.status(500).json({ msg: "Server Error" });
  }
};

exports.getInvestmentRecommendation = async (req, res) => {
  try {
    // Step 1: Fetch all investments with category and amount
    const investments = await InvestmentSchema.find().select('category amount');

    // Step 2: Format the data as required by the external API
    const formattedData = investments.map(investment => `('${investment.category}',${investment.amount})`).join(',');

    const requestData = {
      rectype: "invest",
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

