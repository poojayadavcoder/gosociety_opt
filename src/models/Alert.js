import mongoose from "mongoose";
import { operationsConn } from "../config/db.js";
import { randomUUID } from "crypto";

const alertSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `uuid_alert_${randomUUID()}`
  },
  societyId: {
    type: String,
    required: true,
    trim: true
  },
  raisedBy: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    flat: { type: String, required: true }
  },
  type: {
    type: String,
    enum: ["sos", "fire", "medical", "security"],
    default: "sos"
  },
  status: {
    type: String,
    enum: ["active", "acknowledged", "resolved", "cancelled"],
    default: "active"
  },
  location: {
    type: String,
    default: "Flat"
  }
}, { 
  timestamps: true,
  versionKey: false 
});

const Alert = operationsConn.model("Alert", alertSchema, "alerts");

export default Alert;
