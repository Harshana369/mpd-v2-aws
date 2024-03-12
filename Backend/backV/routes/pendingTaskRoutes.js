const router = require("express").Router();

const Posts = require("../models/mobitelProjectsDatabaseModel.js");
const Users = require("../models/User.js");

//-----------------------Update Installing Pending Task-----------------------------

router.route("/updateInstalling").put(async (req, res) => {
  const Tr = req.body.Task_Ref;
  const today = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);
  const date = new Date(formattedDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const yyyyMmDd = `${year}-${month}-${day}`;

  const artist = await Posts.updateOne(
    { Task_Ref: `${Tr}` },
    {
      $set: {
        Installation_Completed: yyyyMmDd,
      },
    }
  );

  if (artist) {
    res.send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

//-----------------------Update Commissioning Pending Task-----------------------------
router.route("/updateCommissioning").put(async (req, res) => {
  const Tr = req.body.Task_Ref;
  const today = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);
  const date = new Date(formattedDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const yyyyMmDd = `${year}-${month}-${day}`;

  const artist = await Posts.updateOne(
    { Task_Ref: `${Tr}` },
    {
      $set: {
        Commission: yyyyMmDd,
      },
    }
  );

  if (artist) {
    res.send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

//-----------------------Update Pat Pending Task-----------------------------

//------------------------Pss--------------------
router.route("/updatePat").put(async (req, res) => {
  const Tr = req.body.Task_Ref;
  const today = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);
  const date = new Date(formattedDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const yyyyMmDd = `${year}-${month}-${day}`;

  const artist = await Posts.updateOne(
    { Task_Ref: `${Tr}` },
    {
      $set: {
        PAT_Pass: yyyyMmDd,
      },
    }
  );

  if (artist) {
    res.send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

//---------------------- Submitted--------------------

router.route("/updatePatSubmitted").put(async (req, res) => {
  const Tr = req.body.Task_Ref;
  const today = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);
  const date = new Date(formattedDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const yyyyMmDd = `${year}-${month}-${day}`;

  const artist = await Posts.updateOne(
    { Task_Ref: `${Tr}` },
    {
      $set: {
        Submit_PAT: yyyyMmDd,
      },
    }
  );

  if (artist) {
    res.send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

//---------------------- Update Sar Submitted  Task--------------------

router.route("/updateSarSubmitted").put(async (req, res) => {
  const Tr = req.body.Task_Ref;
  const today = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const formattedDate = today.toLocaleDateString("en-US", options);
  const date = new Date(formattedDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const yyyyMmDd = `${year}-${month}-${day}`;
  const artist = await Posts.updateOne(
    { Task_Ref: `${Tr}` },
    {
      $set: {
        Submit_SAR: yyyyMmDd,
      },
    }
  );

  if (artist) {
    res.send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

//-----------------------Update Sar Pass Task-----------------------------
router.route("/updateSarPass").put(async (req, res) => {
  const Tr = req.body.Task_Ref;
  const today = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);
  const date = new Date(formattedDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const yyyyMmDd = `${year}-${month}-${day}`;

  const artist = await Posts.updateOne(
    { Task_Ref: `${Tr}` },
    {
      $set: {
        SAR_Pass: yyyyMmDd,
      },
    }
  );

  if (artist) {
    res.send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

//-----------------------Update OnAir Pending Task-----------------------------
router.route("/updateOnAir").put(async (req, res) => {
  const Tr = req.body.Task_Ref;
  const today = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);
  const date = new Date(formattedDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const yyyyMmDd = `${year}-${month}-${day}`;

  const artist = await Posts.updateOne(
    { Task_Ref: `${Tr}` },
    {
      $set: {
        On_air: yyyyMmDd,
      },
    }
  );

  if (artist) {
    res.send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

//-----------------------Update MaterialReturn Pending Task-----------------------------
router.route("/updateMaterialReturn").put(async (req, res) => {
  const Tr = req.body.Task_Ref;
  const today = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);
  const date = new Date(formattedDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const yyyyMmDd = `${year}-${month}-${day}`;

  const artist = await Posts.updateOne(
    { Task_Ref: `${Tr}` },
    {
      $set: {
        Material_Return: yyyyMmDd,
      },
    }
  );

  if (artist) {
    res.send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

//-----------------------Update Pr Pending Task-----------------------------
router.route("/updatePr").put(async (req, res) => {
  const Tr = req.body.Task_Ref;
  const today = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);
  const date = new Date(formattedDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const yyyyMmDd = `${year}-${month}-${day}`;

  const artist = await Posts.updateOne(
    { Task_Ref: `${Tr}` },
    {
      $set: {
        PR_Raise: yyyyMmDd,
      },
    }
  );

  if (artist) {
    res.send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

//-----------------------Update Po  Data-----------------------------
router.route("/updatePo").put(async (req, res) => {
  const Tr = req.body.Task_Ref;
  const today = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);
  const date = new Date(formattedDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const yyyyMmDd = `${year}-${month}-${day}`;

  const artist = await Posts.updateOne(
    { Task_Ref: `${Tr}` },
    {
      $set: {
        PO_issue: yyyyMmDd,
      },
    }
  );

  if (artist) {
    res.send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

//-------------update Invoice data-----------------------

router.route("/updateInvoice").put(async (req, res) => {
  const Tr = req.body.Task_Ref;
  const today = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);
  const date = new Date(formattedDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const yyyyMmDd = `${year}-${month}-${day}`;

  const artist = await Posts.updateOne(
    { Task_Ref: `${Tr}` },
    {
      $set: {
        Submit_Invoice: yyyyMmDd,
      },
    }
  );

  if (artist) {
    res.send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

//-------------update Po Closure data-----------------------

router.route("/updatePoClosure").put(async (req, res) => {
  const Tr = req.body.Task_Ref;
  const today = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);
  const date = new Date(formattedDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const yyyyMmDd = `${year}-${month}-${day}`;

  const artist = await Posts.updateOne(
    { Task_Ref: `${Tr}` },
    {
      $set: {
        PO_closure: yyyyMmDd,
      },
    }
  );

  if (artist) {
    res.send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

//------------------------------------------ Get All SiteEngineers For PendingTask------------------------------------------------

router.get("/AllSiteEngineersNames", (req, res) => {
  Posts.find().exec((err, mobitelProjects) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      siteEngineersNamesArray: getSiteEngineerNames(mobitelProjects),
    });
  });
});

function getSiteEngineerNames(mobitelProjects) {
  var siteEngineersNamesArray = [];

  const uniqueProjects = mobitelProjects
    .map((project) => project.Site_Engineer)
    .filter((project, index, projects) => projects.indexOf(project) === index);

  for (let i = 0; i < uniqueProjects.length; i++) {
    siteEngineersNamesArray.push({
      value: uniqueProjects[i],
      label: uniqueProjects[i],
    });
  }
  return siteEngineersNamesArray;
}

// router.get("/AllSiteEngineersNames", async (req, res, next) => {
//   Users.find().exec((err, users) => {
//     if (err) {
//       return res.status(400).json({
//         error: err,
//       });
//     }

//     return res.status(200).json({
//       AllSiteEngineersNames: getSiteEngineerNames(users),
//     });
//   });
// });

// function getSiteEngineerNames(users) {
//   const siteEngineers = users.filter(
//     (users) => users.designation === "Site Engineer"
//   );

//   const names = siteEngineers.map(
//     (engineer) => `${engineer.username} ${engineer.lastName}`
//   );

//   const siteEngineersNamesArray = [];

//   for (let i = 0; i < names.length; i++) {
//     siteEngineersNamesArray.push({
//       value: names[i],
//       label: names[i],
//     });
//   }
//   return siteEngineersNamesArray;
// }

// -------------------Get All Pending Data--------------

router.get("/mobitelPendingTaskData", async (req, res, next) => {
  let reqQuery = [];
  if (req.query.Site_Engineer === "All Site Engineers") {
    reqQuery = {};
  } else {
    reqQuery = { ...req.query };
  }

  let queryStr = JSON.stringify(reqQuery);
  //   console.log(queryStr);
  Posts.find(JSON.parse(queryStr)).exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    return res.status(200).json({
      success: true,
      InstallationPendingTasks: getInstallationPendingTasks(posts),
      CommissioningPendingTasks: getCommissioningPendingTasks(posts),
      PatPendingTasks: getPatPendingTasks(posts),
      SarPendingTasks: getSarPendingTasks(posts),
      OnAirPendingTasks: getOnAirPendingTasks(posts),
      MaterialReturnPendingTasks: getMaterialReturnPendingTask(posts),
      PrPendingTasks: getPrPendingTasks(posts),
      PoPendingTasks: getPoPendingTasks(posts),
      InvoicePendingTasks: getInvoicePendingTasks(posts),
      PoClosurePendingTasks: getPoClosurePendingTasks(posts),
    });
  });
});
function getInstallationPendingTasks(posts) {
  let InstallationPendingTasks = [];

  InstallationPendingTasks = posts.filter(
    (post) => post.Installation_Completed === null
  );

  //   console.log(InstallationPendingTasks);
  return InstallationPendingTasks;
}

function getCommissioningPendingTasks(posts) {
  let CommissioningPendingTasks = [];

  CommissioningPendingTasks = posts.filter((post) => post.Commission === null);

  return CommissioningPendingTasks;
}

function getPatPendingTasks(posts) {
  let PatPendingTasks = [];

  PatPendingTasks = posts.filter((post) => post.PAT_Pass === null);

  return PatPendingTasks;
}

function getSarPendingTasks(posts) {
  let SarPendingTasks = [];

  SarPendingTasks = posts.filter((post) => post.SAR_Pass === null);

  return SarPendingTasks;
}

function getOnAirPendingTasks(posts) {
  let OnAirPendingTasks = [];
  OnAirPendingTasks = posts.filter((post) => post.On_air === null);
  return OnAirPendingTasks;
}
function getMaterialReturnPendingTask(posts) {
  let MaterialReturnPendingTasks = [];

  MaterialReturnPendingTasks = posts.filter(
    (post) => post.Material_Return === null
  );
  return MaterialReturnPendingTasks;
}

function getPrPendingTasks(posts) {
  let PrPendingTasks = [];

  PrPendingTasks = posts.filter((post) => post.PR_Raise === null);

  return PrPendingTasks;
}

function getPoPendingTasks(posts) {
  let PoPendingTasks = [];

  PoPendingTasks = posts.filter((post) => post.PO_issue === null);

  return PoPendingTasks;
}

function getInvoicePendingTasks(posts) {
  let InvoicePendingTasks = [];

  InvoicePendingTasks = posts.filter((post) => post.Submit_Invoice === null);

  return InvoicePendingTasks;
}

function getPoClosurePendingTasks(posts) {
  let PoClosurePendingTasks = [];

  PoClosurePendingTasks = posts.filter((post) => post.PO_closure === null);

  return PoClosurePendingTasks;
}

module.exports = router;
