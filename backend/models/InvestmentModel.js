const mongoose = require('mongoose');

const InvestmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    amount: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 20
    },
    type: {
        type: String,
        default: "investment",
    },
    date: {
        type: Date,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
}, {timestamps: true})

module.exports = mongoose.model('Investment', InvestmentSchema) 