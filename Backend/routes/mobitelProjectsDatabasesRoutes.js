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
      // projectsScopeDataCount: getProjectsScopeDataCount(posts, Project),
      projectsHandOverDataCount: getProjectsHandOverDataCount(posts, Project),
      projectsPatDataCount: getProjectsPatDataCount(posts, Project),
      projectsOnAirDataCount: getProjectsOnAirDataCount(posts, Project),
      // HoldSitesDataforSquares: getHoldSitesData(posts,Project),
      // projectScopeData: getProjectScopeData(posts, Project),
      projectsCommissionedDataCount: getProjectsCommissionedDataCount(
        posts,
        Project
      ),
      projectHandOverData: getProjectsHandOverData(posts, Project),
      projectsPatData: getProjectsPatData(posts, Project),
      projectsOnAirData: getProjectsOnAirData(posts, Project),
      projectsCommissionedData: getProjectCommissionedData(posts, Project),
    });
  });
});

// //---------------------------------------------------------------------------------------------------------------------------
// //--------------------- Function for Getting Get Scope Data to the Front End Squares of Mobitel Projects ---------------------
// //---------------------------------------------------------------------------------------------------------------------------

// function getProjectsScopeDataCount(posts, projectName) {
//   var ScopeDataCount = [];

//   if (projectName === "All Projects") {
//     ScopeDataCount.push(posts.filter((obj) => obj.Scope !== null).length);
//     return ScopeDataCount;
//   } else {
//     ScopeDataCount.push(
//       posts
//         .filter((obj) => obj.Project === projectName)
//         .filter((obj) => obj.Scope !== null).length
//     );
//   }

//   return ScopeDataCount;
// }

// function getProjectScopeData(posts, projectName) {
//   var scopeData = [];

//   if (projectName === "All Projects") {
//     scopeData.push(...posts.filter((obj) => obj.Scope !== null));

//     return scopeData;
//   } else {
//     scopeData.push(
//       ...posts
//         .filter((obj) => obj.Project === projectName)
//         .filter((obj) => obj.Scope !== null)
//     );
//   }

//   //   console.log(scopeData);
//   return scopeData;
// }

//---------------------------------------------------------------------------------------------------------------------------
//--------------------- Function for Getting Get Commissioned Data to the Front End Squares of Mobitel Projects ---------------------
//---------------------------------------------------------------------------------------------------------------------------

function getProjectsCommissionedDataCount(posts, projectName) {
  var commissionedDataCount = [];

  if (projectName === "All Projects") {
    commissionedDataCount.push(
      posts.filter((obj) => obj.Commission !== null).length
    );
    return commissionedDataCount;
  } else {
    commissionedDataCount.push(
      posts
        .filter((obj) => obj.Project === projectName)
        .filter((obj) => obj.Commission !== null).length
    );
  }
  // console.log(commissionedDataCount);
  return commissionedDataCount;
}

function getProjectCommissionedData(posts, projectName) {
  var commissionedData = [];
  if (projectName === "All Projects") {
    commissionedData.push(...posts.filter((obj) => obj.Commissioned !== null));
    return commissionedData;
  } else {
    commissionedData.push(
      ...posts
        .filter((obj) => obj.Project === projectName)
        .filter((obj) => obj.Commissioned !== null)
    );
  }

  // console.log(commissionedData);
  return commissionedData;
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

  // console.log(handOverData);
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

function getHoldSitesData(posts, Project) {
  var holdData = [];

  if (projectName === "All Projects") {
    holdData.push(...posts.filter((obj) => obj.On_air !== null));

    return holdData;
  } else {
    holdData.push(
      ...posts
        .filter((obj) => obj.Project === projectName)
        .filter((obj) => obj.On_air !== null)
    );
  }

  //   console.log(onAirData);
  return holdData;
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
        PatCompletionForFrontEnd: getPatCompletionData(posts),
        SarCompletionForFrontEnd: getSarCompletionData(posts),
        CommissionCompletionForFrontEnd: getCommissionCompletionData(posts),
        weeklyProgressDataForFrontEnd: getMonthlyProgressData(posts), // Data for Front end Mobitel Projects Insights Weekly Progress Graph.
        SevenDaysOfWeek: getLast30Days(), // 30 Days of Week going to front end weekly progress column graph.
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

// function getchartData(posts) {
//   var installedData = [];
//   var commissioned = [];
//   var sarData = [];
//   var patData = [];
//   var onairData = [];

//   var theMonths = new Array(
//     "01",
//     "02",
//     "03",
//     "04",
//     "05",
//     "06",
//     "07",
//     "08",
//     "09",
//     "10",
//     "11",
//     "12"
//   );
//   var now = new Date();

//   var monthsArrayReversed = []; // Move this declaration outside the loop

//   for (var i = 0; i < 12; i++) {
//     var future = new Date(now.getFullYear(), now.getMonth() - i, 1);
//     var month = theMonths[future.getMonth()];
//     var year = future.getFullYear();
//     var monthsCountFrom2015 = (year - 2014) * 12;

//     for (var j = 0; j < monthsCountFrom2015; j++) {
//       monthsArrayReversed.push(
//         future.getFullYear().toString() + "-" + theMonths[future.getMonth()]
//       );
//       future.setMonth(future.getMonth() - 1);
//     }
//   }

//   let monthsArray = monthsArrayReversed.reverse();

//   for (var i = 0; i < monthsArray.length; i++) {
//     installedData[i] = posts
//       .filter((obj) => obj.Installation_Completed !== null)
//       .filter(
//         (obj) => obj.Installation_Completed.slice(0, 7) === monthsArray[i]
//       ).length;
//     commissioned[i] = posts
//       .filter((obj) => obj.Commission !== null)
//       .filter((obj) => obj.Commission.slice(0, 7) === monthsArray[i]).length;
//     sarData[i] = posts
//       .filter((obj) => obj.SAR_Pass !== null)
//       .filter((obj) => obj.SAR_Pass.slice(0, 7) === monthsArray[i]).length;
//     patData[i] = posts
//       .filter((obj) => obj.PAT_Pass !== null)
//       .filter((obj) => obj.PAT_Pass.slice(0, 7) === monthsArray[i]).length;
//     onairData[i] = posts
//       .filter((obj) => obj.On_air !== null)
//       .filter((obj) => obj.On_air.slice(0, 7) === monthsArray[i]).length;
//   }

//   let chartData = [];
//   let LastYearOnAir = onairData.slice(
//     onairData.length - 13,
//     onairData.length - 1
//   );
//   let LastYearPat = patData.slice(patData.length - 13, patData.length - 1);
//   let LastYearSar = sarData.slice(sarData.length - 13, sarData.length - 1);
//   let LastYearCommissioned = commissioned.slice(
//     commissioned.length - 13,
//     commissioned.length - 1
//   );
//   let LastYearInstalled = installedData.slice(
//     installedData.length - 13,
//     installedData.length - 1
//   );

//   chartData.push(
//     { name: "On Air", type: "column", data: LastYearOnAir },
//     { name: "PAT", type: "column", data: LastYearPat },
//     { name: "SAR", type: "column", data: LastYearSar },
//     { name: "Commissioned", type: "column", data: LastYearCommissioned },
//     { name: "Installed", type: "column", data: LastYearInstalled }
//   );

//   return chartData;
// }

// function getchartData(posts) {
//   const theMonths = [
//     "01",
//     "02",
//     "03",
//     "04",
//     "05",
//     "06",
//     "07",
//     "08",
//     "09",
//     "10",
//     "11",
//     "12",
//   ];
//   const now = new Date();

//   const monthsArray = [];
//   for (let i = 0; i < 12; i++) {
//     const future = new Date(now.getFullYear(), now.getMonth() - i, 1);
//     const month = theMonths[future.getMonth()];
//     const year = future.getFullYear();
//     monthsArray.push(`${year}-${month}`);
//   }

//   const getDataCountForMonth = (property, month) =>
//     posts.reduce((count, obj) => {
//       const postMonth = obj[property] ? obj[property].slice(0, 7) : null;
//       return postMonth === month ? count + 1 : count;
//     }, 0);

//   const installedData = monthsArray.map((month) =>
//     getDataCountForMonth("Installation_Completed", month)
//   );

//   const commissioned = monthsArray.map((month) =>
//     getDataCountForMonth("Commission", month)
//   );
//   const sarData = monthsArray.map((month) =>
//     getDataCountForMonth("SAR_Pass", month)
//   );
//   const patData = monthsArray.map((month) =>
//     getDataCountForMonth("PAT_Pass", month)
//   );
//   const onairData = monthsArray.map((month) =>
//     getDataCountForMonth("On_air", month)
//   );

//   const chartData = [
//     { name: "On Air", type: "column", data: onairData },
//     { name: "PAT", type: "column", data: patData },
//     { name: "SAR", type: "column", data: sarData },
//     { name: "Commissioned", type: "column", data: commissioned },
//     { name: "Installed", type: "column", data: installedData },
//   ];

//   return chartData;
// }

function getchartData(posts) {
  const theMonths = [
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
    "12",
  ];

  const now = new Date();
  const monthsArray = [];

  for (let i = 0; i < 12; i++) {
    const future = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const month = theMonths[future.getMonth()];
    const year = future.getFullYear();
    monthsArray.push(`${year}-${month}`);
  }

  const getDataCountForMonth = (property, month) =>
    posts.reduce((count, obj) => {
      const postMonth = obj[property]?.slice(0, 7) || null;
      return postMonth === month ? count + 1 : count;
    }, 0);

  const chartData = [
    { name: "On Air", type: "column", data: [] },
    { name: "PAT", type: "column", data: [] },
    { name: "SAR", type: "column", data: [] },
    { name: "Commissioned", type: "column", data: [] },
    { name: "Installed", type: "column", data: [] },
  ];

  for (const month of monthsArray) {
    chartData[0].data.push(getDataCountForMonth("On_air", month));
    chartData[1].data.push(getDataCountForMonth("PAT_Pass", month));
    chartData[2].data.push(getDataCountForMonth("SAR_Pass", month));
    chartData[3].data.push(getDataCountForMonth("Commission", month));
    chartData[4].data.push(
      getDataCountForMonth("Installation_Completed", month)
    );
  }

  chartData.forEach((item) => {
    item.data.reverse(); // Reverse the data array
  });

  // console.log(chartData);

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

  // console.log(projectCompletionChartData);
  return projectCompletionChartData;
}

function getPatCompletionData(posts) {
  (Pat = getOnPatData(posts)), (handOverSites = getHandOverData(posts));

  const PatCompletionChartData = [];
  const completed = Pat;
  const pending = handOverSites - Pat;
  const hold = 0;

  PatCompletionChartData.push(completed, pending, hold);

  // console.log(PatCompletionChartData);

  return PatCompletionChartData;
}

function getSarCompletionData(posts) {
  (Sar = getOnSarData(posts)), (handOverSites = getHandOverData(posts));

  const SarCompletionChartData = [];
  const completed = Sar;
  const pending = handOverSites - Sar;
  const hold = 0;

  SarCompletionChartData.push(completed, pending, hold);

  // console.log(SarCompletionChartData);
  return SarCompletionChartData;
}

function getCommissionCompletionData(posts) {
  (Commission = getOnCommissionedData(posts)),
    (handOverSites = getHandOverData(posts));

  const CommissionCompletionChartData = [];
  const completed = Commission;
  const pending = handOverSites - Commission;
  const hold = 0;

  CommissionCompletionChartData.push(completed, pending, hold);

  // console.log(CommissionCompletionChartData);
  return CommissionCompletionChartData;
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

function getOnPatData(posts) {
  var PatData = [];
  PatData = posts.filter((obj) => obj.PAT_Pass !== null).length;
  // console.log(PatData);
  return PatData;
}

function getOnSarData(posts) {
  var SarData = [];
  SarData = posts.filter((obj) => obj.SAR_Pass !== null).length;
  //console.log(SarData);
  return SarData;
}

function getOnCommissionedData(posts) {
  var Commission = [];
  Commission = posts.filter((obj) => obj.Commission !== null).length;
  //console.log(SarData);
  return Commission;
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

// function getWeeklyProgressData(posts) {
//   var onairData = [];
//   var onairTargetData = [];

//   var lastWeekDates = [];
//   var yesterdayDate = [];
//   var yesterdayMonth = [];
//   var yesterdayYear = [];

//   for (var i = 0; i < 7; i++) {
//     yesterdayDate[i] = new Date(
//       new Date().setDate(new Date().getDate() - i)
//     ).getDate();
//     yesterdayMonth[i] = (
//       "0" +
//       (new Date(new Date().setDate(new Date().getDate() - i)).getMonth() + 1)
//     ).slice(-2);
//     yesterdayYear[i] = new Date(
//       new Date().setDate(new Date().getDate() - i)
//     ).getFullYear();

//     lastWeekDates[i] =
//       yesterdayYear[i] + "-" + yesterdayMonth[i] + "-" + yesterdayDate[i];
//   }
//   lastWeekDates.reverse();

//   // console.log(lastWeekDates);
//   // lastWeekDates = ['2022-01-10','2022-01-11','2022-01-12','2022-01-13','2022-01-14','2022-01-15','2022-01-16']

//   for (var i = 0; i < 7; i++) {
//     onairData[i] = posts.filter(
//       (obj) => obj.On_air === lastWeekDates[i]
//     ).length;
//   }
//   // ----------------------------------------------------------------------------------------------------------------------------------------------
//   // console.log(onairData);

//   let onAirArray = onairData;

//   let weeklyProgressData = [];
//   weeklyProgressData.push({
//     name: "Completed",
//     type: "column",
//     data: onAirArray,
//   });

//   console.log(weeklyProgressData);
//   return weeklyProgressData;
// }

function getMonthlyProgressData(posts) {
  var onairData = [];
  var patData = [];
  var commissionedData = [];

  var lastWeekDates = [];
  var currentDate = new Date();

  for (var i = 0; i < 30; i++) {
    var date = new Date(currentDate.getTime() - i * 24 * 60 * 60 * 1000);
    var dateString = date.toISOString().split("T")[0];
    lastWeekDates.push(dateString);
  }

  for (var i = 0; i < 30; i++) {
    commissionedData[i] = posts.filter(
      (obj) => obj.Commission === lastWeekDates[i]
    ).length;
  }

  for (var i = 0; i < 30; i++) {
    patData[i] = posts.filter(
      (obj) => obj.PAT_Pass === lastWeekDates[i]
    ).length;
  }

  for (var i = 0; i < 30; i++) {
    onairData[i] = posts.filter(
      (obj) => obj.On_air === lastWeekDates[i]
    ).length;
  }

  let commissionedArray = commissionedData.reverse();
  let patPassArray = patData.reverse();
  let onAirArray = onairData.reverse();

  let weeklyProgressData = [];
  weeklyProgressData.push(
    {
      name: "Commissioned",
      type: "column",
      data: commissionedArray,
    },
    {
      name: "PAT",
      type: "column",
      data: patPassArray,
    },
    {
      name: "OnAir",
      type: "column",
      data: onAirArray,
    }
  );

  //console.log(weeklyProgressData);
  return weeklyProgressData;
}

//---------------------------------------------------------------------------------------------------------------------------
//-------------- Function for 7 days of week for Front End Weekly Progress Graph of Mobitel Project Databases ---------------
//---------------------------------------------------------------------------------------------------------------------------

function getLast30Days() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let today = new Date();
  let last30Days = [];

  for (let i = 0; i < 30; i++) {
    let date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
    let month = months[date.getMonth()];
    let day = date.getDate();
    last30Days.push(`${month} ${day}`);
  }

  const FinalLast30Day = last30Days.reverse();

  // console.log(FinalLast30Day);
  return FinalLast30Day;
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

router.get("/siteEngineerForMonthlyWorkProgress", async (req, res, next) => {
  try {
    // Get the current date
    const today = new Date();

    // Calculate the date 30 days ago
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    // Find posts with commissions within the last 30 days
    const posts = await Posts.find(
      {
        Commission: {
          $gte: thirtyDaysAgo.toISOString(),
          $lte: today.toISOString(),
        },
      },
      { Site_Engineer: 1, Commission: 1, PAT_Pass: 1, On_air: 1, _id: 0 } // Projection to include Site_Engineer, Commission, PAT_Pass, and On_air fields
    );

    // Extract Site_Engineer names into a Set to remove duplicates
    const siteEngineerNamesSet = new Set(
      posts.map((post) => post.Site_Engineer)
    );

    // Convert Set back to array
    const siteEngineerNames = Array.from(siteEngineerNamesSet);

    // Initialize an object to store counts for each engineer
    const engineerCounts = {};

    // Iterate over each engineer
    siteEngineerNames.forEach((engineer) => {
      // Count occurrences of Commission, PAT_Pass, and On_air for the engineer
      const commissionCount = posts.filter(
        (post) => post.Site_Engineer === engineer && post.Commission
      ).length;
      const patCount = posts.filter(
        (post) => post.Site_Engineer === engineer && post.PAT_Pass
      ).length;
      const onAirCount = posts.filter(
        (post) => post.Site_Engineer === engineer && post.On_air
      ).length;

      // Store counts for the engineer
      engineerCounts[engineer] = {
        Commission: commissionCount,
        PAT_Pass: patCount,
        On_air: onAirCount,
      };
    });

    // Format data into the desired structure
    const siteEnginerForTask = [
      {
        name: "Commissioned",
        type: "column",
        data: siteEngineerNames.map(
          (engineer) => engineerCounts[engineer].Commission || 0
        ),
      },
      {
        name: "PAT",
        type: "column",
        data: siteEngineerNames.map(
          (engineer) => engineerCounts[engineer].PAT_Pass || 0
        ),
      },
      {
        name: "OnAir",
        type: "column",
        data: siteEngineerNames.map(
          (engineer) => engineerCounts[engineer].On_air || 0
        ),
      },
    ];

    const returnData = { siteEnginerForTask, siteEngineerNames };

    return res.status(200).json({
      success: true,
      returnData,
    }); // Sending the siteEnginerForTask array as a response
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// router.get("/siteEngineerForMonthlyWorkProgress", async (req, res, next) => {
//   try {
//     // Get the current date
//     const today = new Date();

//     // Calculate the date 30 days ago
//     const thirtyDaysAgo = new Date(today);
//     thirtyDaysAgo.setDate(today.getDate() - 30);

//     // Find posts with commissions within the last 30 days for Dumindu Chamikara
//     const posts = await Posts.find(
//       {
//         Site_Engineer: "Dumindu Chamikara", // Filter by Site_Engineer
//         Commission: {
//           $gte: thirtyDaysAgo.toISOString(),
//           $lte: today.toISOString(),
//         },
//       },
//       { Commission: 1, PAT_Pass: 1, On_air: 1, _id: 0 } // Projection to include only Commission, PAT_Pass, and On_air fields
//     );

//     console.log("Number of posts within last 30 days:", posts.length);
//     res.json(posts); // Sending the posts as a response
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

module.exports = router;
