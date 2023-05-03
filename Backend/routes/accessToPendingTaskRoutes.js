const express = require("express");
const router = express.Router();
const Moderator = require("../models/accessToPendingTaskModel.js");

// ------------------get Deta -------------------------

router.get("/getUpdatePendingTaskPrivilegeLevel", async (req, res, next) => {
  Moderator.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: posts,
    });
  });
});

router.put("/updatePendingTaskPrivilegeLevel/:my", async (req, res) => {
  const temp = req.params;

  const user = temp.my;

  const moderator = req.body.chosen;
  const admin = req.body.chosen;
  const editor = req.body.chosen;

  try {
    if (user === "Moderator") {
      const result = await Moderator.updateOne(
        {},
        { $set: { moderator } },
        { upsert: true }
      );

      res.status(200).send("Document updated successfully");
    } else if (user === "Admin") {
      const result = await Moderator.updateOne(
        {},
        { $set: { admin } },
        { upsert: true }
      );
      res.status(200).send("Document updated successfully");
    } else {
      const result = await Moderator.updateOne(
        {},
        { $set: { editor } },
        { upsert: true }
      );
      res.status(200).send("Document updated successfully");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;
