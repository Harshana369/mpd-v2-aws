// const router = require("express").Router();
// const Posts = require("../models/mobitelProjectsDatabaseModel.js");

// // ------------------------- Posting sites data to the database  ---------------------------------------------------------------------------------------------------
// //------------------------------------------------------------------------------------------------------------------------------------------------------------------

// router.post("/mobitelProjectsDatabases/save", (req, res) => {
//   let newPost = new Posts(req.body);
//   newPost.save((err, posts) => {
//     if (err) {
//       return res.status(400).json({
//         error: err,
//       });
//     }
//     return res.status(200).json({
//       success: "Project Details Added Successfully",
//     });
//   });
// });

// module.exports = router;
