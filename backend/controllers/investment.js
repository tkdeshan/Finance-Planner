const InvestmentSchema = require("../models/InvestmentModel");
const sendRequestToGemini = require("../gemini");
const axios = require("axios");

exports.addInvestment = async (req, res) => {
  const { title, amount, description, category, type, date } = req.body;
  const userId = req.user._id;

  const saving = new InvestmentSchema({
    userId,
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
    await saving.save();
    res.status(200).json({ msg: "Investment added successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getInvestments = async (req, res) => {
  try {
    const userId = req.user._id;
    const investments = await InvestmentSchema.find({ userId });

    if (investments.length === 0) {
      return res.status(404).json({ msg: "No investments found" });
    }

    res.status(200).json(investments);
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

    return res.status(200).json({
      msg: "Investment updated successfully",
      investment: updatedInvestment,
    });
  } catch (err) {
    console.error("Error updating investment:", err);
    // Handling specific Mongoose error codes here if needed
    if (err.name === "ValidationError") {
      return res.status(400).json({ msg: "Validation Error", errors: err.errors });
    }
    return res.status(500).json({ msg: "Server Error" });
  }
};

exports.getInvestmentRecommendation = async (req, res) => {
  try {
    const { id } = req.params;

    // Step 1: Fetch all investments with category and amount
    const investment = await InvestmentSchema.findById(id).select("title category amount");

    // Step 2: Format the data as required by the external API
    const formattedData = `${investment.category} ${investment.title} ${investment.amount}LKR. Please give recommendations for valuble invesment.`;

    // Step 3: Send the data to the external API
    const textContent = await sendRequestToGemini(formattedData);

    // Step 4: Return the API response to the client
    res.status(200).json({
      formattedData: formattedData,
      recommendations: textContent,
    });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};
