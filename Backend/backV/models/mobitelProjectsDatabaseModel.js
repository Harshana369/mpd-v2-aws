const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    Task_Ref: { type: String, required: true, unique: true }, // add unique: true
    Site_Id: String,
    Site_Name: String,
    Handover: String,
    Project: String,
    Scope: String,
    Site_Engineer: String,
    Sub_Contractor: String,

    Task_Category: {
      type: String,
      default: null,
    },

    Task_Assigned: String,
    Task_Commenced: String,

    Installation_Completed: {
      type: String,
      default: null,
    },

    Commission: {
      type: String,
      default: null,
    },
    Submit_PAT: {
      type: String,
      default: null,
    },
    PAT_Pass: {
      type: String,
      default: null,
    },

    Submit_SAR: {
      type: String,
      default: null,
    },
    SAR_Pass: {
      type: String,
      default: null,
    },

    On_air: {
      type: String,
      default: null,
    },

    BOQ_Submit: String,
    BOQ_Approve: String,
    PR_Raise: String,

    Material_Return: {
      type: String,
      default: null,
    },
    PO_issue: {
      type: String,
      default: null,
    },
    Submit_Invoice: {
      type: String,
      default: null,
    },
    Approve_Invoice: {
      type: String,
      default: null,
    },
    Payment: {
      type: String,
      default: null,
    },
    PO_closure: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const MobitelData = mongoose.model("mdatabase", dataSchema);

module.exports = MobitelData;
