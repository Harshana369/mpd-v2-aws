const app = require("express").Router();

const Row = require("../models/huaweiVenderRowModel.js");
// Retrieve Rows from MongoDB

app.get("/huawei/rows", async (req, res) => {
  try {
    const rows = await Row.find();
    res.json(rows);
  } catch (error) {
    console.error("Error fetching rows:", error);
    res.status(500).json({ error: "Error fetching rows" });
  }
});

// Add a new row to MongoDB
app.post("/huawei/rows", async (req, res) => {
  try {
    const newRow = await Row.create({ values: req.body });
    res.json(newRow);
  } catch (error) {
    console.error("Error adding row:", error);
    res.status(500).json({ error: "Error adding row" });
  }
});

// Update a row in MongoDB
app.put("/huawei/rows/:id", async (req, res) => {
  const data = req.body;
  const temp = data.filter((value) => value !== "Empty");

  try {
    const { id } = req.params;
    const values = temp;
    const updatedRow = await Row.findByIdAndUpdate(
      id,
      { $set: { values } },
      { new: true }
    );
    res.json(updatedRow);
  } catch (error) {
    console.error("Error updating row:", error);
    res.status(500).json({ error: "Error updating row" });
  }
});

// Delete a row from MongoDB
app.delete("/huawei/rows/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Row.findByIdAndDelete(id);
    res.json({ message: "Row deleted successfully" });
  } catch (error) {
    console.error("Error deleting row:", error);
    res.status(500).json({ error: "Error deleting row" });
  }
});

module.exports = app;
