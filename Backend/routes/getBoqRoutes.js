const router = require("express").Router();
const cron = require("node-cron");
const axios = require("axios");

const Posts = require("../models/mobitelProjectsDatabaseModel.js");
Posts.find().exec(async (err, posts) => {
  // console.log(posts);

  const temp = async (accessToken) => {
    const TasksData = await axios.get(
      "https://projectonline.mobitel.lk/projonline/getmpdsystem",
      {
        headers: {
          token: "Bearer " + `"${accessToken}"`,
        },
      }
    );

    let projectOnline = [];

    projectOnline = TasksData.data;

    for (let i = 0; i < projectOnline.length; i++) {
      const taskRef = projectOnline[i].Task_Ref;
      const matchingObject = posts.find((obj) => obj.Task_Ref === taskRef);

      if (matchingObject.Task_Ref === taskRef) {
        // console.log("Editing  object");

        // Update the matching object in the collection
        matchingObject.Site_Id = projectOnline[i].siteId;
        matchingObject.Site_Name = projectOnline[i].siteName;
        matchingObject.Handover = projectOnline[i].handover;
        matchingObject.Project = projectOnline[i].project;
        matchingObject.Scope = projectOnline[i].scope;
        matchingObject.Site_Engineer = projectOnline[i].siteEngineer;
        matchingObject.Sub_Contractor = projectOnline[i].subContractor;
        matchingObject.Task_Assigned = projectOnline[i].taskAssigned;
        matchingObject.Task_Commenced = projectOnline[i].taskCommenced;
        matchingObject.Installation_Completed =
          projectOnline[i].installationCompleted;
        matchingObject.Commission = projectOnline[i].commission;
        matchingObject.PAT_Pass = projectOnline[i].PATPass;
        matchingObject.SAR_Pass = projectOnline[i].SARPass;
        matchingObject.On_air = projectOnline[i].onAir;
        matchingObject.BOQ_Submit = projectOnline[i].BOQSubmit;
        matchingObject.BOQ_Approve = projectOnline[i].BOQApprove;
        matchingObject.PR_Raise = projectOnline[i].PRRaise;

        // Save the updated object
        await matchingObject.save();
      } else {
        // Create a new object in the collection

        // console.log("Add new objects");
        await Posts.create({
          Task_Ref: taskRef,
          Site_Id: projectOnline[i].siteId,
          Site_Name: projectOnline[i].siteName,
          Handover: projectOnline[i].handover,
          Project: projectOnline[i].project,
          Scope: projectOnline[i].scope,
          Site_Engineer: projectOnline[i].siteEngineer,
          Sub_Contractor: projectOnline[i].subContractor,
          Task_Assigned: projectOnline[i].taskAssigned,
          Task_Commenced: projectOnline[i].taskCommenced,
          Installation_Completed: projectOnline[i].installationCompleted,
          Commission: projectOnline[i].commission,
          PAT_Pass: projectOnline[i].PATPass,
          SAR_Pass: projectOnline[i].SARPass,
          On_air: projectOnline[i].onAir,
          BOQ_Submit: projectOnline[i].BOQSubmit,
          BOQ_Approve: projectOnline[i].BOQApprove,
          PR_Raise: projectOnline[i].PRRaise,
        });
      }
    }
  };

  const login = async () => {
    const res = await axios.post(
      "https://projectonline.mobitel.lk/projonline/login",
      {
        username: "BTS_Project_API",
        password: "BTS_Project_API",
      }
    );

    temp(res.data.accessToken);
  };

  const retrieveData = async () => {
    // login boq system
    await login();
  };

  cron.schedule("0 0 * * *", retrieveData);
  // every day -> 0 0 * * *
  //one mints -> */1 * * * *
});

module.exports = router;
