const mongoose = require("mongoose");

const ColumnSchema = new mongoose.Schema({
  __check__: { type: Boolean },
  Task_Ref: { type: Boolean },
  Site_Id: { type: Boolean },
  Site_Name: { type: Boolean },
  Handover: { type: Boolean },
  Project: { type: Boolean },
  Scope: { type: Boolean },
  Site_Engineer: { type: Boolean },
  Sub_Contractor: { type: Boolean },
  Task_Category: { type: Boolean },
  Task_Assigned: { type: Boolean },
  Task_Commenced: { type: Boolean },
  Installation_Completed: { type: Boolean },
  Commission: { type: Boolean },
  Submit_PAT: { type: Boolean },
  PAT_Pass: { type: Boolean },
  Submit_SAR: { type: Boolean },
  SAR_Pass: { type: Boolean },
  On_air: { type: Boolean },
  BOQ_Submit: { type: Boolean },
  BOQ_Approve: { type: Boolean },
  PR_Raise: { type: Boolean },
  Material_Return: { type: Boolean },
  PO_issue: { type: Boolean },
  Submit_Invoice: { type: Boolean },
  Approve_Invoice: { type: Boolean },
  Payment: { type: Boolean },
  PO_closure: { type: Boolean },
});

const HideColumn = mongoose.model(
  "commissioningPendingColumnHide",
  ColumnSchema
);

module.exports = HideColumn;
