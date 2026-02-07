import mongoose from "mongoose";
import { operationsConn } from "../config/db.js";
import { randomUUID } from "crypto";

const guardSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `uuid_guard_${randomUUID()}`
  },
  societyId: {
    type: String,
    required: true,
    trim: true
  },
  staffId: {
    type: String,
    required: true,
    trim: true
  },
  assignedGateId: {
    type: String,
    default: null
  },
  displayName: {
    type: String,
    required: true,
    trim: true
  },
  currentLocation: {
    gateId: { type: String },
    lastSeenAt: { type: Date }
  },
  shift: {
    startTime: { type: String },
    endTime: { type: String },
    days: { type: [String] }
  }
}, { 
  timestamps: true,
  versionKey: false 
});

const Guard = operationsConn.model("Guard", guardSchema, "guards");

export default Guard;
