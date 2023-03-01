const router = require("express").Router();
const cron = require("node-cron");
const axios = require("axios");

const Posts = require("../models/mobitelProjectsDatabaseModel.js");
const retrieveData = async () => {
  Posts.find().exec(async (err, posts) => {
    const resp = await axios.get("http://35.78.68.113:27017/boq/getall");
    const A = resp.data.success[0].mobitelDatabasePropertys;

    let sameObjects = [];
    for (let i = 0; i < A.length; i++) {
      for (let j = 0; j < posts.length; j++) {
        if (
          JSON.stringify(A[i].Task_Ref) === JSON.stringify(posts[j].Task_Ref)
        ) {
          sameObjects.push(A[i]);
          break;
        }
      }
    }

    let notSameObjects = [];
    for (let i = 0; i < A.length; i++) {
      let isSame = false;
      for (let j = 0; j < sameObjects.length; j++) {
        if (
          JSON.stringify(A[i].Task_Ref) ===
          JSON.stringify(sameObjects[j].Task_Ref)
        ) {
          isSame = true;
          break;
        }
      }
      if (!isSame) {
        notSameObjects.push(A[i]);
      }
    }

    let array3 = notSameObjects;

    const result = await Posts.insertMany(array3);
  });
};

cron.schedule("0 0 * * *", retrieveData);

// every day -> 0 0 * * *
//one mints -> */1 * * * *

module.exports = router;
