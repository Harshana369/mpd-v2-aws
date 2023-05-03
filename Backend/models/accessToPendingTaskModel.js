// const mongoose = require("mongoose");

// const dataSchema = new mongoose.Schema(
//   {
//     Moderator: [String],
//     Editor: [String],
//   },
//   {
//     timestamps: true,
//   }
// );

// const MobitelData = mongoose.model("accessToPendingTask", dataSchema);

// module.exports = MobitelData;

const mongoose = require("mongoose");

const moderatorSchema = new mongoose.Schema({
  name: [String],
});

const ModeratorData = mongoose.model("accessToPendingTask", moderatorSchema);

module.exports = ModeratorData;

// const mongoose = require("mongoose");

// const moderatorSchema = new mongoose.Schema({
//   emails: {
//     type: [String],
//     required: true,
//   },
// });

// const Moderator = mongoose.model("accessToPendingTask", moderatorSchema);

// module.exports = Moderator;
