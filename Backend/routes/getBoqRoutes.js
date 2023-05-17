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
          token: "Bearer " + accessToken,
        },
      }
    );

    let projectOnline = [];

    projectOnline = TasksData.data;

    // console.log(projectOnline);

    for (let i = 0; i < projectOnline.length; i++) {
      const taskRef = projectOnline[i].Task_Ref;
      const matchingObject = posts.find((obj) => obj.Task_Ref === taskRef);

      // console.log(matchingObject);

      if (matchingObject) {
        // console.log("Editing");

        // Update the matching object in the collection
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

        // Save the updated object
        await matchingObject.save();
      } else {
        // Create a new object in the collection

        // console.log("Add");
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
    // console.log(res.data.accessToken);
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
