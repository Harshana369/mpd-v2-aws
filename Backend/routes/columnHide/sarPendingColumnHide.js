const router = require("express").Router();
let Posts = require("../../models/columnHide/sarPendingColumnHide");

router.route("/sarPendingColumnEdit").put(async (req, res) => {
  id = "63fa4871583f1b2d5c88a5b9";

  Posts.findByIdAndUpdate(id, req.body)
    .then((Posts) => res.json(Posts))
    .catch((err) => res.status(422).json(err));
});

router.get("/sarPendingColumnGet", async function (req, res) {
  id = "63fa4871583f1b2d5c88a5b9";

  Posts.findById(id)
    .then((Posts) => res.send(Posts))
    .catch((err) => res.status(422).json(err));
});

//add hide column object
// router.post("/sarPendingColumnAdd", (req, res) => {
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
