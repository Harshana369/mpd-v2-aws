require("dotenv").config({ path: "./config.env" });
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

connectDB();

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());
app.use(express.json());

const authRouts = require("./routes/auth.js");
const privateRouts = require("./routes/private.js");
// Connecting Routes
app.use("/mpd/api", authRouts);
app.use("/mpd/api/private", privateRouts);

const userListGetRoutes = require("./routes/AuthGetRoutes/AuthGetUsersRoutes.js");
const mobitelProjectsDatabases = require("./routes/mobitelProjectsDatabasesRoutes.js");
const pendingTask = require("./routes/pendingTaskRoutes.js");
const accessToPendingTask = require("./routes/accessToPendingTaskRoutes.js");

// -------------------
const mobitelProjectsDatabaseColumnHide = require("./routes/columnHide/mobitelDatabaseColumnHide.js");
const installationPending = require("./routes/columnHide/installationPendingColumnHide.js");
const commissioningPending = require("./routes/columnHide/commissioningPendingColumnHide.js");
const patPending = require("./routes/columnHide/patPendingColumnHide.js");
const sarPending = require("./routes/columnHide/sarPendingColumnHide.js");
const onairPending = require("./routes/columnHide/onAirPendingColumnHide.js");
const matiriyalretuenPending = require("./routes/columnHide/matiriyalReturnPendingColumnHide.js");
const prPending = require("./routes/columnHide/prPendingColumnHide.js");
const poPending = require("./routes/columnHide/poPendingColumnHide.js");
const invoicePending = require("./routes/columnHide/invoiceSubmissionPendingColumnHide.js");
const poClosurePending = require("./routes/columnHide/poClosurePendingColumnHide.js");

// vender part

const VenderColumn = require("./routes/VenderColumnRoutes.js");
const VenderRow = require("./routes/VenderRowRoutes.js");
const huaweiVenderInsights = require("./routes/Vender/Huawei/HuaweiInsights.js");
const zteVenderInsights = require("./routes/Vender/ZTE/ZTEInsights.js");

// Error Handler Middleware
app.use(errorHandler);

app.use("/mpd/api", userListGetRoutes);
app.use("/mpd/api", mobitelProjectsDatabases);
app.use("/mpd/api", pendingTask);
app.use("/mpd/api", accessToPendingTask);

//Column Hide
app.use("/mpd/api", mobitelProjectsDatabaseColumnHide);
app.use("/mpd/api", installationPending);
app.use("/mpd/api", commissioningPending);
app.use("/mpd/api", patPending);
app.use("/mpd/api", sarPending);
app.use("/mpd/api", onairPending);
app.use("/mpd/api", matiriyalretuenPending);
app.use("/mpd/api", prPending);
app.use("/mpd/api", poPending);
app.use("/mpd/api", invoicePending);
app.use("/mpd/api", poClosurePending);

// Huawei Vender

app.use("/mpd/api", VenderColumn);
app.use("/mpd/api", VenderRow);
app.use("/mpd/api", huaweiVenderInsights);
app.use("/mpd/api", zteVenderInsights);

// Boq System with api calling
require("./routes/getBoqRoutes.js");

require("dotenv").config({ path: "./.env" });

// --------------------------------------------------------------------------

app.use(express.static(path.join(__dirname, "/Frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/Frontend/build/index.html"))
);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/materialkit/build")));
//   app.get("*", (req, res) =>
//     res.sendFile(path.join(__dirname, "/materialkit/build/index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running");
//   });
// }

// app.get("/mpd/api/mydata", (req, res) => console.log("ok"));

// --------------------------------------------------------------------------

const PORT = process.env.PORT || 8072;

const server = app.listen(PORT, () =>
  console.log(`Sever is up and running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
