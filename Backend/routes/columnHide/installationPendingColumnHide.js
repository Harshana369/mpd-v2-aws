const router = require("express").Router();
let Posts = require("../../models/columnHide/installationPendingColumnHide.js");

router.route("/installationPendingColumnEdit").put(async (req, res) => {
  id = "63f87cc2a9c146260cb1bf61";

  Posts.findByIdAndUpdate(id, req.body)
    .then((Posts) => res.json(Posts))
    .catch((err) => res.status(422).json(err));
});

router.get("/installationPendingColumnGet", async function (req, res) {
  id = "63f87cc2a9c146260cb1bf61";

  Posts.findById(id)
    .then((Posts) => res.send(Posts))
    .catch((err) => res.status(422).json(err));
});

//add hide column object
// router.post("/installationPendingColumnAdd", (req, res) => {
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
