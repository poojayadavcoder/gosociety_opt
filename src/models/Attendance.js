import mongoose from "mongoose";
import { operationsConn } from "../config/db.js";
import { randomUUID } from "crypto";

const attendanceSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `uuid_attend_${randomUUID()}`
  },
  staffId: {
    type: String,
    required: true,
    trim: true
  },
  societyId: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  checkInTime: {
    type: Date,
    required: true
  },
  checkOutTime: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    enum: ["present", "completed", "half-day"],
    default: "present"
  },
  workDurationMinutes: {
    type: Number,
    default: 0
  }
}, { 
  timestamps: true,
  versionKey: false 
});

// Index for quick lookups by staff and date
attendanceSchema.index({ staffId: 1, date: 1 });

const Attendance = operationsConn.model("Attendance", attendanceSchema, "attendance");

export default Attendance;
