const app = require("express").Router();

const Row = require("../models/VenderRowModel.js");

// Retrieve Data for ZTE
app.get("/zte/rows", async (req, res) => {
  try {
    const zteRows = await Row.find({
      "values.7": "ZTE",
    });
    res.json(zteRows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Retrieve Data for Huawei
app.get("/huawei/rows", async (req, res) => {
  try {
    const huaweiRows = await Row.find({
      "values.7": "Huawei",
    });
    res.json(huaweiRows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Retrieve Data All
app.get("/vender/rows", async (req, res) => {
  try {
    const rows = await Row.find();
    res.json(rows);
  } catch (error) {
    console.error("Error fetching rows:", error);
    res.status(500).json({ error: "Error fetching rows" });
  }
});

// Add a new row to MongoDB
app.post("/vender/rows", async (req, res) => {
  try {
    const newRow = await Row.create({ values: req.body });
    res.json(newRow);
  } catch (error) {
    console.error("Error adding row:", error);
    res.status(500).json({ error: "Error adding row" });
  }
});

// Update a row in MongoDB
app.put("/vender/rows/:id", async (req, res) => {
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
app.delete("/vender/rows/:id", async (req, res) => {
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
