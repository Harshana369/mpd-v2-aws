const router = require("express").Router();
const HideColumn = require("../../models/columnHide/mobitelDatabaseColumnHide.js");

router.put("/mobitelDatabaseColumnEdit", async (req, res) => {
  try {
    const updatedColumn = await HideColumn.findOneAndUpdate(req.body);
    res.json(updatedColumn);
  } catch (error) {
    res.status(422).json(error);
  }
});

router.get("/MobitelDatabaseColumnGet", async (req, res) => {
  try {
    const column = await HideColumn.find();
    res.send(column);
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;
