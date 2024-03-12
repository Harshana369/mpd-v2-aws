const mongoose = require("mongoose");

// Define row schema and model
const rowSchema = new mongoose.Schema({
  values: Array,
});

const Row = mongoose.model("venderRow", rowSchema);

module.exports = Row;
