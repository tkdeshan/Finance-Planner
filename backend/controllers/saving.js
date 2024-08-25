const SavingSchema = require("../models/SavingModel");
const axios = require("axios");
const sendRequestToGemini = require("../gemini");

exports.addSaving = async (req, res) => {
  const { title, amount, description, category, type, date } = req.body;
  const userId = req.user._id;

  const saving = new SavingSchema({
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
    res.status(200).json({ msg: "Saving added successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getSavings = async (req, res) => {
  try {
    const userId = req.user._id;
    const saving = await SavingSchema.find({ userId });
    res.status(200).json(saving);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.deleteSaving = async (req, res) => {
  const { id } = req.params;
  SavingSchema.findByIdAndDelete(id)
    .then((saving) => {
      res.status(200).json({ msg: "Saving deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ msg: "Server Error" });
    });
};

exports.updateSaving = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!id) {
    return res.status(400).json({ msg: "Missing saving ID" });
  }

  try {
    // Using 'new: true' to return the updated document and 'runValidators: true' to apply schema validations on update
    const updatedSaving = await SavingSchema.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedSaving) {
      return res.status(404).json({ msg: "Saving not found" });
    }

    return res.status(200).json({
      msg: "Saving updated successfully",
      saving: updatedSaving,
    });
  } catch (err) {
    console.error("Error updating saving:", err);
    // Handling specific Mongoose error codes here if needed
    if (err.name === "ValidationError") {
      return res.status(400).json({ msg: "Validation Error", errors: err.errors });
    }
    return res.status(500).json({ msg: "Server Error" });
  }
};

exports.getRecommendation = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch savings data from your database
    const saving = await SavingSchema.findById(id).select("title category amount");

    // Format the savings data as required
    const formattedData = `${saving.category} ${saving.title} ${saving.amount}LKR. Please give recommendations for increase saving.`;

    const textContent = await sendRequestToGemini(formattedData);

    // Step 4: Return the API response to the client
    res.status(200).json({
      formattedData: formattedData,
      recommendations: textContent,
    });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};
