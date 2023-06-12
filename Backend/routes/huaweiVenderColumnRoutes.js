const app = require("express").Router();

const Column = require("../models/huaweiVenderColumnModel.js");

// Retrieve columns from MongoDB
app.get("/huawei/columns", async (req, res) => {
  try {
    const columns = await Column.find();
    res.json(columns);
  } catch (error) {
    console.error("Error fetching columns:", error);
    res.status(500).json({ error: "Error fetching columns" });
  }
});

// Add a new column to MongoDB
app.post("/huawei/columns", async (req, res) => {
  try {
    const newColumn = await Column.create(req.body);
    res.json(newColumn);
  } catch (error) {
    console.error("Error adding column:", error);
    res.status(500).json({ error: "Error adding column" });
  }
});

// Update a column in MongoDB
app.put("/huawei/columns/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { headerName, width } = req.body;
    const updatedColumn = await Column.findByIdAndUpdate(
      id,
      { headerName, width },
      { new: true }
    );
    res.json(updatedColumn);
  } catch (error) {
    console.error("Error updating column:", error);
    res.status(500).json({ error: "Error updating column" });
  }
});

// Delete a column from MongoDB
app.delete("/huawei/columns/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Column.findByIdAndDelete(id);
    res.json({ message: "Column deleted successfully" });
  } catch (error) {
    console.error("Error deleting column:", error);
    res.status(500).json({ error: "Error deleting column" });
  }
});

module.exports = app;
