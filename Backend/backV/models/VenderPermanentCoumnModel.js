const mongoose = require("mongoose");

// Define column schema and model
const columnSchema = new mongoose.Schema({
  field: String,
  headerName: String,
  headerClassName: String,
  width: Number,
  editable: Boolean,
});

const Column = mongoose.model("venderPermanentColumn", columnSchema);

module.exports = Column;
