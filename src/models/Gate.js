import mongoose from "mongoose";
import { operationsConn } from "../config/db.js";
import { randomUUID } from "crypto";

const gateSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `uuid_gate_${randomUUID()}`
  },
  societyId: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  barrierConfigId: {
    type: String,
    default: null
  },
  operationalHours: {
    from: { type: String },
    to: { type: String }
  }
}, { 
  timestamps: true,
  versionKey: false 
});

const Gate = operationsConn.model("Gate", gateSchema, "gates");

export default Gate;
