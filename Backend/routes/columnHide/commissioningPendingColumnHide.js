const router = require("express").Router();
let Posts = require("../../models/columnHide/commissioningPendingColumnHide");

router.route("/commissioningPendingColumnEdit").put(async (req, res) => {
  id = "63fa4841583f1b2d5c88a5b7";

  Posts.findByIdAndUpdate(id, req.body)
    .then((Posts) => res.json(Posts))
    .catch((err) => res.status(422).json(err));
});

router.get("/commissioningPendingColumnGet", async function (req, res) {
  id = "63fa4841583f1b2d5c88a5b7";

  Posts.findById(id)
    .then((Posts) => res.send(Posts))
    .catch((err) => res.status(422).json(err));
});

//add hide column object
// router.post("/commissioningPendingColumnAdd", (req, res) => {
//   let newPost = new Posts(req.body);

//   newPost.save((err, posts) => {
//     if (err) {
//       return res.status(400).json({
//         error: err,
//       });
//     }
//     return res.status(200).json({
//       //   success: "Project Details Added Successfully",
//       success: posts,
//     });
//   });
// });
module.exports = router;
