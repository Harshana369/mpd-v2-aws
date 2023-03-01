const router = require("express").Router();

const Posts = require("../models/mobitelProjectsDatabaseModel.js");

// ------------------------- Posting sites data to the database  ---------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------

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

//---------------------post mobitelprojectsdatabasHeaders-------------------------------

// router.post("/mobitelProjectsDatabaseHeaders", async (req, res, next) => {
//   const data = req.body;

//   try {
//     Posts.updateOne(
//       {
//         $push: {
//           headerproperties: { $each: data },
//         },
//       },
//       (err, result) => {}
//     );
//   } catch (err) {
//     console.log(err);
//   }
// });

// ------------------get Deta for mobitelProjectDatabase-------------------------

router.get("/mobitelProjectsDatabasesSiteData", async (req, res, next) => {
  Posts.find().exec((err, posts) => {
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
//------------------------------------------------------------------------------------------

//----------------Getting Installation Pending Task data--------------------
router.get("/getInstalling", async (req, res, next) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      Installing: getInstalling(posts),
    });
  });
});

function getInstalling(posts) {
  return posts.filter((post) => post.Installation_Completed === null);
}

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

  const artist = await Posts.updateOne(
    { Task_Ref: `${Tr}` },
    {
      $set: {
        Installation_Completed: formattedDate,
      },
    }
  );

  if (artist) {
    res.send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

//------------------------------------------------------------------------------------------

//----------------Getting Commissioning data--------------------
router.get("/getCommissioning", async (req, res, next) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      commissioning: getCommissiioning(posts),
    });
  });
});

function getCommissiioning(posts) {
  return posts.filter((post) => post.Commission === null);
}

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

  const artist = await Posts.updateOne(
    { Task_Ref: `${Tr}` },
    {
      $set: {
        Commission: formattedDate,
      },
    }
  );

  if (artist) {
    res.send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

//------------------------------------------------------------------------------------------

//----------------Getting Pat data--------------------
router.get("/getPat", async (req, res, next) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      Pat: getPat(posts),
    });
  });
});

function getPat(posts) {
  return posts.filter((post) => post.PAT_Pass === null);
}

//-----------------------Update Pat Pending Task-----------------------------
router.route("/updatePat").put(async (req, res) => {
  const Tr = req.body.Task_Ref;
  const today = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);

  const artist = await Posts.updateOne(
    { Task_Ref: `${Tr}` },
    {
      $set: {
        PAT_Pass: formattedDate,
      },
    }
  );

  if (artist) {
    res.send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

//------------------------------------------------------------------------------------------

//---------------Getting Sar data--------------------
router.get("/getSar", async (req, res, next) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      Sar: getSar(posts),
    });
  });
});

function getSar(posts) {
  return posts.filter((post) => post.SAR_Pass === null);
}

//-----------------------Update Sar Pending Task-----------------------------
router.route("/updateSar").put(async (req, res) => {
  const Tr = req.body.Task_Ref;
  const today = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);

  const artist = await Posts.updateOne(
    { Task_Ref: `${Tr}` },
    {
      $set: {
        SAR_Pass: formattedDate,
      },
    }
  );

  if (artist) {
    res.send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

//------------------------------------------------------------------------------------------

//-------------Getting OnAir data-----------------------

router.get("/getOnAir", async (req, res, next) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      OnAir: getOnAir(posts),
    });
  });
});

function getOnAir(posts) {
  return posts.filter((post) => post.On_air === null);
}

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

  const artist = await Posts.updateOne(
    { Task_Ref: `${Tr}` },
    {
      $set: {
        On_air: formattedDate,
      },
    }
  );

  if (artist) {
    res.send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

//------------------------------------------------------------------------------------------

//-------------Getting Material Return data-----------------------

router.get("/getMaterialReturn", async (req, res, next) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      MaterialReturn: getMaterialReturn(posts),
    });
  });
});

function getMaterialReturn(posts) {
  return posts.filter((post) => post.Material_Return === null);
}

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

  const artist = await Posts.updateOne(
    { Task_Ref: `${Tr}` },
    {
      $set: {
        Material_Return: formattedDate,
      },
    }
  );

  if (artist) {
    res.send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

//------------------------------------------------------------------------------------------

//-------------Getting Pr data-----------------------

router.get("/getPr", async (req, res, next) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      Pr: getPr(posts),
    });
  });
});

function getPr(posts) {
  return posts.filter((post) => post.PR_Raise === null);
}
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

  const artist = await Posts.updateOne(
    { Task_Ref: `${Tr}` },
    {
      $set: {
        PR_Raise: formattedDate,
      },
    }
  );

  if (artist) {
    res.send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

//------------------------------------------------------------------------------------------

//-------------Getting Po data-----------------------
router.get("/getPo", async (req, res, next) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      Po: getPo(posts),
    });
  });
});

function getPo(posts) {
  return posts.filter((post) => post.PO_issue === null);
}

//-----------------------Update Po Pending Task-----------------------------
router.route("/updatePo").put(async (req, res) => {
  const Tr = req.body.Task_Ref;
  const today = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);

  const artist = await Posts.updateOne(
    { Task_Ref: `${Tr}` },
    {
      $set: {
        PO_issue: formattedDate,
      },
    }
  );

  if (artist) {
    res.send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

//------------------------------------------------------------------------------------------

//-------------Getting Invoice data-----------------------
router.get("/geInvoice", async (req, res, next) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      Invoice: getInvoice(posts),
    });
  });
});

function getInvoice(posts) {
  return posts.filter((post) => post.Submit_Invoice === null);
}

router.route("/updateInvoice").put(async (req, res) => {
  const Tr = req.body.Task_Ref;
  const today = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);

  const artist = await Posts.updateOne(
    { Task_Ref: `${Tr}` },
    {
      $set: {
        Submit_Invoice: formattedDate,
      },
    }
  );

  if (artist) {
    res.send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

//------------------------------------------------------------------------------------------

//-------------Getting Po Closure data-----------------------
router.get("/gePoClosure", async (req, res, next) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      PoClosure: getPoClosure(posts),
    });
  });
});

function getPoClosure(posts) {
  return posts.filter((post) => post.PO_closure === null);
}

router.route("/updatePoClosure").put(async (req, res) => {
  const Tr = req.body.Task_Ref;
  const today = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);

  const artist = await Posts.updateOne(
    { Task_Ref: `${Tr}` },
    {
      $set: {
        PO_closure: formattedDate,
      },
    }
  );

  if (artist) {
    res.send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

router.get("/mobitelProjectsDatabasesPendingTasks", async (req, res, next) => {
  Posts.find().exec((err, posts) => {
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

  return InstallationPendingTasks.length;
}

function getCommissioningPendingTasks(posts) {
  let CommissioningPendingTasks = [];

  CommissioningPendingTasks = posts.filter((post) => post.Commission === null);

  return CommissioningPendingTasks.length;
}
function getPatPendingTasks(posts) {
  let PatPendingTasks = [];

  PatPendingTasks = posts.filter((post) => post.PAT_Pass === null);

  return PatPendingTasks.length;
}

function getSarPendingTasks(posts) {
  let SarPendingTasks = [];

  SarPendingTasks = posts.filter((post) => post.SAR_Pass === null);

  return SarPendingTasks.length;
}

function getOnAirPendingTasks(posts) {
  let OnAirPendingTasks = [];
  OnAirPendingTasks = posts.filter((post) => post.On_air === null);
  return OnAirPendingTasks.length;
}

function getMaterialReturnPendingTask(posts) {
  let MaterialReturnPendingTasks = [];

  MaterialReturnPendingTasks = posts.filter(
    (post) => post.Material_Return === null
  );
  return MaterialReturnPendingTasks.length;
}

function getPrPendingTasks(posts) {
  let PrPendingTasks = [];

  PrPendingTasks = posts.filter((post) => post.PR_Raise === null);

  return PrPendingTasks.length;
}

function getPoPendingTasks(posts) {
  let PoPendingTasks = [];

  PoPendingTasks = posts.filter((post) => post.PO_issue === null);

  return PoPendingTasks.length;
}

function getInvoicePendingTasks(posts) {
  let InvoicePendingTasks = [];

  InvoicePendingTasks = posts.filter((post) => post.Submit_Invoice === null);

  return InvoicePendingTasks.length;
}

function getPoClosurePendingTasks(posts) {
  let PoClosurePendingTasks = [];

  PoClosurePendingTasks = posts.filter((post) => post.PO_closure === null);

  return PoClosurePendingTasks.length;
}

module.exports = router;
