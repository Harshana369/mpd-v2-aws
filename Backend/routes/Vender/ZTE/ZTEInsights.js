const router = require("express").Router();

// const Row = require("../../../models/zteVenderRowModel.js");
const Row = require("../../../models/VenderRowModel.js");

// Part 01
router.get("/filteredZTEProjectsNamesArray", (req, res) => {
  Row.find((err, vendorProjects) => {
    if (err) {
      console.error("Error while fetching vendor projects:", err);
      return res.status(400).json({
        error: err,
      });
    }

    try {
      const projects = vendorProjects.filter((obj) => obj.values[7] === "ZTE");

      const uniqueProjects = projects.reduce((uniqueSet, obj) => {
        const projectName = obj.values[4];
        uniqueSet.add(projectName);
        return uniqueSet;
      }, new Set());

      const projectsNamesArray = [
        { value: "All ZTE Projects", label: "All ZTE Projects" },
        ...Array.from(uniqueProjects).map((projectName) => ({
          value: projectName,
          label: projectName,
        })),
      ];

      return res.status(200).json({
        success: true,
        projectsNamesArray,
      });
    } catch (error) {
      console.error("Error while processing vendor projects:", error);
      return res.status(500).json({
        error: "Internal server error",
      });
    }
  });
});

// Part 02
router.get("/ZTEVendorProjectsDatabases", async (req, res, next) => {
  let ProjectName = req.query.Project; // Other Project 2023 or Other Project 2022 or All Huawei Projects
  Row.find({ "values.7": "ZTE" }).exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    return res.status(200).json({
      projectsScopeDataCount: getProjectsScopeDataCount(posts, ProjectName),
      handOverDataCount: getProjectsHandOverDataCount(posts, ProjectName),
      projectsPatDataCount: getProjectsPatDataCount(posts, ProjectName),
      projectsOnAirDataCount: getProjectsOnAirDataCount(posts, ProjectName),
    });
  });
});

function getProjectsScopeDataCount(posts, projectName) {
  var ScopeDataCount = [];
  if (projectName === "All ZTE Projects") {
    ScopeDataCount.push(posts.filter((obj) => obj.values[5] !== null).length);
  } else {
    ScopeDataCount.push(
      posts
        .filter((obj) => obj.values[5] === projectName)
        .filter((obj) => obj.values[5] !== null).length
    );
  }
  //   console.log(ScopeDataCount);
  return ScopeDataCount;
}

function getProjectsHandOverDataCount(posts, projectName) {
  var handOverDataCount = [];

  if (projectName === "All ZTE Projects") {
    handOverDataCount.push(
      posts.filter((obj) => obj.values[4] !== null).length
    );
  } else {
    handOverDataCount.push(
      posts
        .filter((obj) => obj.values[4] === projectName)
        .filter((obj) => obj.values[4] !== null).length
    );
  }

  //   console.log(handOverDataCount);
  return handOverDataCount;
}

function getProjectsPatDataCount(posts, projectName) {
  var patPassDataCount = [];

  if (projectName === "All ZTE Projects") {
    patPassDataCount.push(
      posts.filter((obj) => obj.values[14] !== null).length
    );
  } else {
    patPassDataCount.push(
      posts
        .filter((obj) => obj.values[14] === projectName)
        .filter((obj) => obj.values[14] !== null).length
    );
  }
  //   console.log(patPassDataCount);
  return patPassDataCount;
}

function getProjectsOnAirDataCount(posts, projectName) {
  var OnAirDataCount = [];

  if (projectName === "All ZTE Projects") {
    OnAirDataCount.push(posts.filter((obj) => obj.values[17] !== null).length);
  } else {
    OnAirDataCount.push(
      posts
        .filter((obj) => obj.values[17] === projectName)
        .filter((obj) => obj.values[17] !== null).length
    );
  }
  //   console.log(OnAirDataCount);
  return OnAirDataCount;
}

//Part 03
router.get(
  "/ZTEVendorProjectsDatabasesChartDataColumnChartData",
  async (req, res) => {
    let ProjectName = req.query.Project; // Other Project 2023 or Other Project 2022 or All Huawei Projects

    let query = { "values.7": "ZTE" };

    if (ProjectName !== "All ZTE Projects") {
      query["values.4"] = ProjectName;
    }

    Row.find(query).exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: error,
        });
      }

      return res.status(200).json({
        chartDataForFrontEnd: getchartData(posts), // Graph data of number of sites Mobilized in each month sent to front end Appwebsitevisits.
        dataForTheGraphs: getXaxisData(), // x axis data labels array sent to the Column graphs front end.
      });
    });
  }
);

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
      const postMonth = obj.values[property]
        ? obj.values[property]?.slice(0, 7)
        : null;
      return postMonth === month ? count + 1 : count;
    }, 0);

  const chartData = [
    { name: "On Air", type: "column", data: [] },
    { name: "PAT", type: "column", data: [] },
    { name: "SAR", type: "column", data: [] },
    { name: "Commissioned", type: "column", data: [] },
    { name: "Installed", type: "column", data: [] },
  ];

  let onAirNumber = "17";
  let patNumber = "14";
  let sarNumber = "16";
  let commissionedNumber = "12";
  let installedNumber = "11";

  for (const month of monthsArray) {
    chartData[0].data.push(getDataCountForMonth(onAirNumber, month));
    chartData[1].data.push(getDataCountForMonth(patNumber, month));
    chartData[2].data.push(getDataCountForMonth(sarNumber, month));
    chartData[3].data.push(getDataCountForMonth(commissionedNumber, month));
    chartData[4].data.push(getDataCountForMonth(installedNumber, month));
  }

  chartData.forEach((item) => {
    item.data.reverse(); // Reverse the data array
  });

  // console.log(chartData);

  return chartData;
}

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

// part 04

router.get("/ZTEVendorProjectsDatabasesCompletion", async (req, res) => {
  let ProjectName = req.query.Project;

  let query = { "values.7": "ZTE" };

  if (ProjectName !== "All ZTE Projects") {
    query["values.4"] = ProjectName;
  }

  Row.find(query).exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: error,
      });
    }

    return res.status(200).json({
      ProjectCompletionForFrontEnd: getProjectCompletionForFrontEnd(posts),
      PatPassForFrontEnd: getPatPassCompletionForFrontEnd(posts),
      SarPassForFrontEnd: getSarPassCompletionForFrontEnd(posts),
      CommissionedFrontEnd: getCommissionedCompletionFrontEnd(posts),
      weeklyProgressDataForFrontEnd: getMonthlyProgressData(posts), // Data for Front end Mobitel Projects Insights Weekly Progress Graph.
      SevenDaysOfWeek: getLast30Days(), // 30 Days of Week going to front end weekly progress column graph.
    });
  });
});

function getProjectCompletionForFrontEnd(posts) {
  (onAirSites = getOnAirData(posts)), (handOverSites = getHandOverData(posts));

  const projectCompletionChartData = [];
  const completed = onAirSites;
  const pending = handOverSites - onAirSites;
  const hold = 0;

  projectCompletionChartData.push(completed, pending, hold);

  // console.log(projectCompletionChartData);
  return projectCompletionChartData;
}

function getPatPassCompletionForFrontEnd(posts) {
  (PatPass = getPatPass(posts)), (handOverSites = getHandOverData(posts));

  const patPassCompletionChartData = [];
  const completed = PatPass[0];
  const pending = handOverSites - PatPass;
  const hold = 0;

  patPassCompletionChartData.push(completed, pending, hold);

  // console.log(patPassCompletionChartData);
  return patPassCompletionChartData;
}

function getSarPassCompletionForFrontEnd(posts) {
  (SarPass = getSarPass(posts)), (handOverSites = getHandOverData(posts));

  const sarPassCompletionChartData = [];
  const completed = SarPass[0];
  const pending = handOverSites - SarPass;
  const hold = 0;

  sarPassCompletionChartData.push(completed, pending, hold);

  // console.log(sarPassCompletionChartData);
  return sarPassCompletionChartData;
}

function getCommissionedCompletionFrontEnd(posts) {
  (commissioned = getCommissioned(posts)),
    (handOverSites = getHandOverData(posts));

  const commissionedCompletionChartData = [];
  const completed = commissioned[0];
  const pending = handOverSites - commissioned;
  const hold = 0;

  commissionedCompletionChartData.push(completed, pending, hold);

  // console.log(commissionedCompletionChartData);
  return commissionedCompletionChartData;
}

function getHandOverData(posts) {
  var handOverData = [];

  handOverData.push(posts.filter((obj) => obj.values[4] !== null).length);

  // console.log(handOverData);
  return handOverData;
}

function getOnAirData(posts) {
  var OnAirData = [];

  OnAirData = posts.filter((obj) => obj.values[17] !== null).length;

  return OnAirData;
}

function getPatPass(posts) {
  var PatPass = [];

  PatPass.push(posts.filter((obj) => obj.values[14] !== null).length);

  // console.log(PatPass);
  return PatPass;
}

function getSarPass(posts) {
  var SarPass = [];

  SarPass.push(posts.filter((obj) => obj.values[16] !== null).length);

  // console.log(SarPass);
  return SarPass;
}

function getCommissioned(posts) {
  var Commissioned = [];

  Commissioned.push(posts.filter((obj) => obj.values[12] !== null).length);

  // console.log(Commissioned);
  return Commissioned;
}

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
      (obj) => obj.values[12] === lastWeekDates[i]
    ).length;
  }

  for (var i = 0; i < 30; i++) {
    patData[i] = posts.filter(
      (obj) => obj.values[14] === lastWeekDates[i]
    ).length;
  }

  for (var i = 0; i < 30; i++) {
    onairData[i] = posts.filter(
      (obj) => obj.values[17] === lastWeekDates[i]
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
  // console.log(weeklyProgressData);
  return weeklyProgressData;
}

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

  //console.log(FinalLast30Day);
  return FinalLast30Day;
}

router.get("/zteProjectsLastUpdates", async (req, res, next) => {
  let ProjectName = req.query.Project;

  let query = { "values.7": "ZTE" };

  if (ProjectName !== "All ZTE Projects") {
    query["values.4"] = ProjectName;
  }

  Row.find(query)
    .sort({ updatedAt: -1 })
    .limit(5)
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }

      // console.log(posts);
      return res.status(200).json({
        success: true,
        existingPosts: posts,
      });
    });
});

module.exports = router;
