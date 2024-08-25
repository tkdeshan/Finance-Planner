const SavingSchema = require("../models/SavingModel");
const axios = require('axios');

exports.addSaving = async (req, res) => {
  const { title, amount, description, category, type, date } = req.body;

  const saving = new SavingSchema({
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
    const saving = await SavingSchema.find();
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
  console.log("🚀 ~ exports.updateSaving= ~ req:", req.body);
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
      return res
        .status(400)
        .json({ msg: "Validation Error", errors: err.errors });
    }
    return res.status(500).json({ msg: "Server Error" });
  }
};


exports.getRecommendation = async (req, res) => {
  try {
    // Fetch savings data from your database
    const savings = await SavingSchema.find().select('category amount');
    
    // Format the savings data as required
    const formattedData = savings.map(saving => `('${saving.category}',${saving.amount})`).join(',');

    const postData = {
      rectype: "saving",
      data: `[${formattedData}]`
    };

    // Log the postData before making the request
    console.log("Post Data:", postData);

    // Send POST request to the external backend
    const response = await axios.post(
      'https://us-central1-single-scholar-431016-j9.cloudfunctions.net/GPT_Backend', 
      postData
    );

    // Return the response from the external service
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error getting recommendation:", error);
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

