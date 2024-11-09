const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  personalDetails: {
    name: String,
    age: Number,
    address: String,
  },
  income: Number,
  expenses: Number,
  assets: Number,
  liabilities: Number,
});

module.exports = mongoose.model("Application", applicationSchema);
