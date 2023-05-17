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

//--------------------------------------------

router.get("/mobitelProjectsDatabases", async (req, res, next) => {
  const { Project, Engineer } = req.query;

  let reqQuery = {};

  if (Project === "All Projects" && Engineer === "All siteEngineers") {
    // return all data related to all Site_Engineers, without filtering by project
    reqQuery = {};
  } else if (Project === "All Projects") {
    // return data related to the specified Site_Engineer for all projects
    reqQuery = { Site_Engineer: Engineer };
  } else if (Engineer === "All siteEngineers") {
    // return data related to the specified Site_Engineer for all projects
    reqQuery = { Project: Project };
  } else {
    // return data related to the specified project and Site_Engineer
    reqQuery = { Project, Site_Engineer: Engineer };
  }

  let queryStr = JSON.stringify(reqQuery);

  Posts.find(JSON.parse(queryStr)).exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    return res.status(200).json({
      success: true,
      projectsScopeDataCount: getProjectsScopeDataCount(posts, Project),
      projectsHandOverDataCount: getProjectsHandOverDataCount(posts, Project),
      projectsPatDataCount: getProjectsPatDataCount(posts, Project),
      projectsOnAirDataCount: getProjectsOnAirDataCount(posts, Project),
      //   HoldSitesDataforSquares: getHoldSitesData(posts),
      projectScopeData: getProjectScopeData(posts, Project),
      projectHandOverData: getProjectsHandOverData(posts, Project),
      projectsPatData: getProjectsPatData(posts, Project),
      projectsOnAirData: getProjectsOnAirData(posts, Project),
    });
  });
});

//---------------------------------------------------------------------------------------------------------------------------
//--------------------- Function for Getting Get Scope Data to the Front End Squares of Mobitel Projects ---------------------
//---------------------------------------------------------------------------------------------------------------------------

function getProjectsScopeDataCount(posts, projectName) {
  var ScopeDataCount = [];

  if (projectName === "All Projects") {
    ScopeDataCount.push(posts.filter((obj) => obj.Scope !== null).length);
    return ScopeDataCount;
  } else {
    ScopeDataCount.push(
      posts
        .filter((obj) => obj.Project === projectName)
        .filter((obj) => obj.Scope !== null).length
    );
  }

  return ScopeDataCount;
}

function getProjectScopeData(posts, projectName) {
  var scopeData = [];

  if (projectName === "All Projects") {
    scopeData.push(...posts.filter((obj) => obj.Scope !== null));

    return scopeData;
  } else {
    scopeData.push(
      ...posts
        .filter((obj) => obj.Project === projectName)
        .filter((obj) => obj.Scope !== null)
    );
  }

  //   console.log(scopeData);
  return scopeData;
}

//---------------------------------------------------------------------------------------------------------------------------
//--------------------- Function for Getting Handover Data to the Front End Squares of Mobitel Projects ---------------------
//---------------------------------------------------------------------------------------------------------------------------

function getProjectsHandOverDataCount(posts, projectName) {
  var handOverDataCount = [];

  if (projectName === "All Projects") {
    handOverDataCount.push(posts.filter((obj) => obj.Handover !== null).length);

    return handOverDataCount;
  } else {
    handOverDataCount.push(
      posts
        .filter((obj) => obj.Project === projectName)
        .filter((obj) => obj.Handover !== null).length
    );
  }

  //   console.log(handOverDataCount);
  return handOverDataCount;
}

function getProjectsHandOverData(posts, projectName) {
  var handOverData = [];

  if (projectName === "All Projects") {
    handOverData.push(...posts.filter((obj) => obj.Handover !== null));

    return handOverData;
  } else {
    handOverData.push(
      ...posts
        .filter((obj) => obj.Project === projectName)
        .filter((obj) => obj.Handover !== null)
    );
  }

  //   console.log(handOverData);
  return handOverData;
}

//---------------------------------------------------------------------------------------------------------------------------
//--------------------- Function for Getting Pat Pass Data to the Front End Squares of Mobitel Projects ---------------------
//---------------------------------------------------------------------------------------------------------------------------

function getProjectsPatDataCount(posts, projectName) {
  var patPassDataCount = [];

  if (projectName === "All Projects") {
    patPassDataCount.push(posts.filter((obj) => obj.PAT_Pass !== null).length);

    return patPassDataCount;
  } else {
    patPassDataCount.push(
      posts
        .filter((obj) => obj.Project === projectName)
        .filter((obj) => obj.PAT_Pass !== null).length
    );
  }
  //   console.log(patPassDataCount);
  return patPassDataCount;
}

function getProjectsPatData(posts, projectName) {
  var patPassData = [];

  if (projectName === "All Projects") {
    patPassData.push(...posts.filter((obj) => obj.PAT_Pass !== null));

    return patPassData;
  } else {
    patPassData.push(
      ...posts
        .filter((obj) => obj.Project === projectName)
        .filter((obj) => obj.PAT_Pass !== null)
    );
  }

  //   console.log(patPassData);
  return patPassData;
}

//---------------------------------------------------------------------------------------------------------------------------
//--------------------- Function for Getting Get On Air Data to the Front End Squares of Mobitel Projects ---------------------
//---------------------------------------------------------------------------------------------------------------------------

function getProjectsOnAirDataCount(posts, projectName) {
  var OnAirDataCount = [];

  if (projectName === "All Projects") {
    OnAirDataCount.push(posts.filter((obj) => obj.On_air !== null).length);

    return OnAirDataCount;
  } else {
    OnAirDataCount.push(
      posts
        .filter((obj) => obj.Project === projectName)
        .filter((obj) => obj.On_air !== null).length
    );
  }
  //   console.log(OnAirDataCount);
  return OnAirDataCount;
}

function getProjectsOnAirData(posts, projectName) {
  var onAirData = [];

  if (projectName === "All Projects") {
    onAirData.push(...posts.filter((obj) => obj.On_air !== null));

    return onAirData;
  } else {
    onAirData.push(
      ...posts
        .filter((obj) => obj.Project === projectName)
        .filter((obj) => obj.On_air !== null)
    );
  }

  //   console.log(onAirData);
  return onAirData;
}

// ------------------------------------------------------------------------------------------------------------------
// --------------------------  Get projects name array  -------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------

router.get("/mobitelProjectsOverviewTable/ProjectsArray", (req, res) => {
  Posts.find().exec((err, mobitelProjects) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      mobitelProjectsNamesArray: getProjectsNamesArray(mobitelProjects),
    });
  });
});

function getProjectsNamesArray(mobitelProjects) {
  var projectsNamesArray = [];

  const uniqueProjects = mobitelProjects
    .map((project) => project.Project)
    .filter((project, index, projects) => projects.indexOf(project) === index);

  for (let i = 0; i < uniqueProjects.length; i++) {
    projectsNamesArray.push({
      value: uniqueProjects[i],
      label: uniqueProjects[i],
    });
  }
  return projectsNamesArray;
}

//------------------------------------------------Mobitel Projects Database Excell Upload ---------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------

router.post("/mobitelProjectsDatabasesExcell/upload", (req, res) => {
  const newPost = req.body;
  async function run() {
    try {
      const options = { ordered: true };
      const result = await Posts.insertMany(newPost, options);
      return res.status(200).json({
        success: `${newPost.length} Projects Added Successfully !`,
      });
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({
          error: "Planning ID must be a unique value !",
        });
      } else {
        return res.status(400).json({
          error: err,
        });
      }
    }
  }
  run();
});

//------------------------------------------------------Get Site Data to The ColumnChart---------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------

router.get(
  "/mobitelProjectsDatabasesChartDataColumnChartData",
  async (req, res, next) => {
    const { Project, Engineer } = req.query;

    let reqQuery = {};

    if (Project === "All Projects" && Engineer === "All siteEngineers") {
      // return all data related to all Site_Engineers, without filtering by project
      reqQuery = {};
    } else if (Project === "All Projects") {
      // return data related to the specified Site_Engineer for all projects
      reqQuery = { Site_Engineer: Engineer };
    } else if (Engineer === "All siteEngineers") {
      // return data related to the specified Site_Engineer for all projects
      reqQuery = { Project: Project };
    } else {
      // return data related to the specified project and Site_Engineer
      reqQuery = { Project, Site_Engineer: Engineer };
    }

    let queryStr = JSON.stringify(reqQuery);

    Posts.find(JSON.parse(queryStr)).exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }

      return res.status(200).json({
        success: true,
        columnChartData: getchartData(posts), // Graph data of number of sites Mobilized in each month sent to front end Appwebsitevisits.
        XaxisDataForTheGraphs: getXaxisData(), // x axis data labels array sent to the Column graphs front end.
        ProjectCompletionForFrontEnd: getProjectCompletionData(posts), // Data for Front end Mobitel Projects Insights project Completion Donut Graph.
        weeklyProgressDataForFrontEnd: getWeeklyProgressData(posts), // Data for Front end Mobitel Projects Insights Weekly Progress Graph.
        SevenDaysOfWeek: getSevenDaysOfWeek(), // 7 Days of Week going to front end weekly progress column graph.
      });
    });
  }
);

//---------------------------------------------------------------------------------------------------------------------------
//--------------------- Function for X Axis Labels to the Front End of Vendor Project Databases ---------------------------
//---------------------------------------------------------------------------------------------------------------------------

function getXaxisData() {
  var theMonths = new Array(
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12"
  );

  var monthsArray = [];
  var d = new Date();
  d.setDate(1);
  for (i = 0; i <= 11; i++) {
    monthsArray.push(theMonths[d.getMonth()] + "/01/" + d.getFullYear());
    d.setMonth(d.getMonth() - 1);
  }

  monthsArray.reverse();

  var XaxisMonths = monthsArray;

  //   console.log(monthsArray);
  return XaxisMonths;
}

//---------------------------------------------------------------------------------------------------------------------------
//--------------------- Functions for Getting Graph Data to the Front End of Mobitel Project Databases ----------------------
//---------------------------------------------------------------------------------------------------------------------------

function getchartData(posts) {
  var installedData = [];
  var commissioned = [];
  var sarData = [];
  var patData = [];
  var onairData = [];

  var theMonths = new Array(
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12"
  );
  var now = new Date();

  for (var i = 0; i < 12; i++) {
    var future = new Date(now.getFullYear(), now.getMonth() - i, 1);
    var month = theMonths[future.getMonth()];
    var year = future.getFullYear();
    var monthsArrayReversed = [];
    var monthsCountFrom2015 = (year - 2014) * 12;

    for (var i = 0; i < monthsCountFrom2015; i++) {
      monthsArrayReversed.push(
        now.getFullYear().toString() + "-" + theMonths[now.getMonth()]
      );
      now.setMonth(now.getMonth() - 1);
    }
    monthsArrayReversed.reverse();
  }

  let monthsArray = monthsArrayReversed;
  // console.log(monthsArray);
  // monthsArray = ['2021-02', '2021-03','2021-04', '2021-05','2021-06', '2021-07','2021-08', '2021-09','2021-10', '2021-11','2021-12', '2022-01']
  // console.log(monthsCountFrom2015);
  for (var i = 0; i < monthsCountFrom2015; i++) {
    (installedData[i] = posts
      .filter((obj) => obj.Installation_Completed !== null)
      .filter(
        (obj) => obj.Installation_Completed.slice(0, 7) === monthsArray[i]
      ).length),
      (commissioned[i] = posts
        .filter((obj) => obj.Commission !== null)
        .filter((obj) => obj.Commission.slice(0, 7) === monthsArray[i]).length),
      (sarData[i] = posts
        .filter((obj) => obj.SAR_Pass !== null)
        .filter((obj) => obj.SAR_Pass.slice(0, 7) === monthsArray[i]).length),
      (patData[i] = posts
        .filter((obj) => obj.PAT_Pass !== null)
        .filter((obj) => obj.PAT_Pass.slice(0, 7) === monthsArray[i]).length),
      (onairData[i] = posts
        .filter((obj) => obj.On_air !== null)
        .filter((obj) => obj.On_air.slice(0, 7) === monthsArray[i]).length);
  }
  // ----------------------------------------------------------------------------------------------------------------------------------------------

  let myarray2 = installedData,
    cumilative2 = [];
  let myarray3 = commissioned,
    cumilative3 = [];
  let myarray4 = sarData,
    cumilative4 = [];
  let myarray5 = patData,
    cumilative5 = [];
  let myarray6 = onairData,
    cumilative6 = [];

  for (let i = 0, s = myarray2[0]; i < myarray2.length; i++, s += myarray2[i])
    cumilative2.push(s);
  for (let i = 0, s = myarray3[0]; i < myarray3.length; i++, s += myarray3[i])
    cumilative3.push(s);
  for (let i = 0, s = myarray4[0]; i < myarray4.length; i++, s += myarray4[i])
    cumilative4.push(s);
  for (let i = 0, s = myarray5[0]; i < myarray5.length; i++, s += myarray5[i])
    cumilative5.push(s);
  for (let i = 0, s = myarray6[0]; i < myarray6.length; i++, s += myarray6[i])
    cumilative6.push(s);

  let chartData = [];
  let LastYearCum6 = cumilative6.slice(
    cumilative6.length - 13,
    cumilative6.length - 1
  ); // On air
  let LastYearCum5 = cumilative5.slice(
    cumilative5.length - 13,
    cumilative5.length - 1
  );
  let LastYearCum4 = cumilative4.slice(
    cumilative4.length - 13,
    cumilative4.length - 1
  );
  let LastYearCum3 = cumilative3.slice(
    cumilative3.length - 13,
    cumilative3.length - 1
  );
  let LastYearCum2 = cumilative2.slice(
    cumilative2.length - 13,
    cumilative2.length - 1
  );

  chartData.push(
    { name: "On Air", type: "column", data: LastYearCum6 },
    { name: "PAT", type: "column", data: LastYearCum5 },
    { name: "SAR", type: "column", data: LastYearCum4 },
    { name: "Commisioned", type: "column", data: LastYearCum3 },
    { name: "Installed", type: "column", data: LastYearCum2 }
  );

  //console.log(chartData);
  return chartData;
}

//---------------------------------------------------------------------------------------------------------------------------
//--------Function for Getting Project Cpmpletion Data to the Front End Mobitel Projects Insights Project Completion Donut---
//---------------------------------------------------------------------------------------------------------------------------

function getProjectCompletionData(posts) {
  (onAirSites = getOnAirData(posts)), (handOverSites = getHandOverData(posts));

  const projectCompletionChartData = [];
  const completed = onAirSites;
  const pending = handOverSites - onAirSites;
  const hold = 0;

  projectCompletionChartData.push(completed, pending, hold);

  //console.log(projectCompletionChartData);
  return projectCompletionChartData;
}

//---------------------------------------------------------------------------------------------------------------------------
//--------------------- Function for Getting Get On Air Data to the Front End Squares of Mobitel Projects ---------------------
//---------------------------------------------------------------------------------------------------------------------------

function getOnAirData(posts) {
  var OnAirData = [];

  OnAirData = posts.filter((obj) => obj.On_air !== null).length;
  //console.log(OnAirData);
  return OnAirData;
}

//---------------------------------------------------------------------------------------------------------------------------
//--------------------- Function for Getting Handover Data to the Front End Squares of Mobitel Projects ---------------------
//---------------------------------------------------------------------------------------------------------------------------

function getHandOverData(posts) {
  var handOverData = [];

  handOverData.push(posts.filter((obj) => obj.Handover !== null).length);

  //console.log(handOverData);
  return handOverData;
}

//---------------------------------------------------------------------------------------------------------------------------
//---------- Functions for Getting Last Week Progress Graph Data to the Front End of Mobitel Project Databases Insights------
//---------------------------------------------------------------------------------------------------------------------------

function getWeeklyProgressData(posts) {
  var onairData = [];
  var onairTargetData = [];

  var lastWeekDates = [];
  var yesterdayDate = [];
  var yesterdayMonth = [];
  var yesterdayYear = [];

  for (var i = 0; i < 7; i++) {
    yesterdayDate[i] = new Date(
      new Date().setDate(new Date().getDate() - i)
    ).getDate();
    yesterdayMonth[i] = (
      "0" +
      (new Date(new Date().setDate(new Date().getDate() - i)).getMonth() + 1)
    ).slice(-2);
    yesterdayYear[i] = new Date(
      new Date().setDate(new Date().getDate() - i)
    ).getFullYear();

    lastWeekDates[i] =
      yesterdayYear[i] + "-" + yesterdayMonth[i] + "-" + yesterdayDate[i];
  }
  lastWeekDates.reverse();

  // console.log(lastWeekDates);
  // lastWeekDates = ['2022-01-10','2022-01-11','2022-01-12','2022-01-13','2022-01-14','2022-01-15','2022-01-16']

  for (var i = 0; i < 7; i++) {
    onairData[i] = posts.filter(
      (obj) => obj.On_air === lastWeekDates[i]
    ).length;
  }
  // ----------------------------------------------------------------------------------------------------------------------------------------------
  // console.log(onairData);

  let onAirArray = onairData;

  let weeklyProgressData = [];
  weeklyProgressData.push({
    name: "Completed",
    type: "column",
    data: onAirArray,
  });

  // console.log(weeklyProgressData);
  return weeklyProgressData;
}

//---------------------------------------------------------------------------------------------------------------------------
//-------------- Function for 7 days of week for Front End Weekly Progress Graph of Mobitel Project Databases ---------------
//---------------------------------------------------------------------------------------------------------------------------

function getSevenDaysOfWeek() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  let today = new Date();
  let start = today.getDay();
  if (start == 6) {
    return days;
  } else {
    return days.slice(start).concat(days.slice(0, start));
  }
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------- Get sites data to the graphs  ---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------

router.get("/mobitelProjectsLastUpdates", async (req, res, next) => {
  const { Project, Engineer } = req.query;

  let reqQuery = {};

  if (Project === "All Projects" && Engineer === "All siteEngineers") {
    // return all data related to all Site_Engineers, without filtering by project
    reqQuery = {};
  } else if (Project === "All Projects") {
    // return data related to the specified Site_Engineer for all projects
    reqQuery = { Site_Engineer: Engineer };
  } else if (Engineer === "All siteEngineers") {
    // return data related to the specified Site_Engineer for all projects
    reqQuery = { Project: Project };
  } else {
    // return data related to the specified project and Site_Engineer
    reqQuery = { Project, Site_Engineer: Engineer };
  }

  let queryStr = JSON.stringify(reqQuery);

  Posts.find(JSON.parse(queryStr), {}, { sort: { updatedAt: -1 } })
    .limit(5)
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }

      return res.status(200).json({
        success: true,
        existingPosts: posts,
      });
    });
});

router.put("/saveProjectOnlineData", async (req, res) => {
  Posts.find().exec(async (err, posts) => {
    const projectOnline = req.body.pOnline;
    for (let i = 0; i < projectOnline.length; i++) {
      const taskRef = projectOnline[i].Task_Ref;
      const matchingObject = posts.find((obj) => obj.Task_Ref === taskRef);

      if (matchingObject) {
        // console.log("Editing");

        //  // Update the matching object in the collection
        matchingObject.Site_Id = projectOnline[i].Site_Id;
        matchingObject.Site_Name = projectOnline[i].Site_Name;
        matchingObject.Handover = projectOnline[i].Handover;
        matchingObject.Project = projectOnline[i].Project;
        matchingObject.Scope = projectOnline[i].Scope;
        matchingObject.Site_Engineer = projectOnline[i].Site_Engineer;
        matchingObject.Sub_Contractor = projectOnline[i].Sub_Contractor;
        matchingObject.Task_Assigned = projectOnline[i].Task_Assigned;
        matchingObject.Task_Commenced = projectOnline[i].Task_Commenced;
        matchingObject.Installation_Completed =
          projectOnline[i].Installation_Completed;
        matchingObject.Commission = projectOnline[i].Commission;
        matchingObject.PAT_Pass = projectOnline[i].PAT_Pass;
        matchingObject.SAR_Pass = projectOnline[i].SAR_Pass;
        matchingObject.On_air = projectOnline[i].On_air;
        matchingObject.BOQ_Submit = projectOnline[i].BOQ_Submit;
        matchingObject.BOQ_Approve = projectOnline[i].BOQ_Approve;
        matchingObject.PR_Raise = projectOnline[i].PR_Raise;

        //  // Save the updated object
        await matchingObject.save();
      } else {
        // console.log("add");
        await Posts.create({
          Task_Ref: taskRef,
          Site_Id: projectOnline[i].Site_Id,
          Site_Name: projectOnline[i].Site_Name,
          Handover: projectOnline[i].Handover,
          Project: projectOnline[i].Project,
          Scope: projectOnline[i].Scope,
          Site_Engineer: projectOnline[i].Site_Engineer,
          Sub_Contractor: projectOnline[i].Sub_Contractor,
          Task_Assigned: projectOnline[i].Task_Assigned,
          Task_Commenced: projectOnline[i].Task_Commenced,
          Installation_Completed: projectOnline[i].Installation_Completed,
          Commission: projectOnline[i].Commission,
          PAT_Pass: projectOnline[i].PAT_Pass,
          SAR_Pass: projectOnline[i].SAR_Pass,
          On_air: projectOnline[i].On_air,
          BOQ_Submit: projectOnline[i].BOQ_Submit,
          BOQ_Approve: projectOnline[i].BOQ_Approve,
          PR_Raise: projectOnline[i].PR_Raise,
        });
      }
    }

    return res.status(200).json({
      success: "successfully added",
    });
  });
});

module.exports = router;
