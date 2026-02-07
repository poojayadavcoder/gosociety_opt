import mongoose from "mongoose";
import { operationsConn } from "../config/db.js";
import { randomUUID } from "crypto";

const visitorArchiveSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `uuid_archive_${randomUUID()}`
  },
  originalVisitorId: {
    type: String,
    required: true,
    trim: true
  },
  societyId: {
    type: String,
    required: true,
    trim: true
  },
  archivedAt: {
    type: Date,
    default: Date.now
  },
  visitorDoc: {
    _id: { type: String, required: true },
    societyId: { type: String, required: true },
    type: { type: String, required: true },
    fName: { type: String, required: true },
    mobile: { type: String, default: null },
    idProofs: [{
      type: { type: String },
      mediaId: { type: String },
      verified: { type: Boolean }
    }],
    vehicleNumber: { type: String, default: null },
    hostUserId: { type: String, required: true },
    servicePersonnelId: { type: String, default: null },
    visitorPurpose: { type: String, default: null },
    status: { type: String },
    approvalId: { type: String, default: null },
    createdAt: { type: Date },
    updatedAt: { type: Date }
  }
}, { 
  timestamps: true,
  versionKey: false 
});

const VisitorArchive = operationsConn.model("VisitorArchive", visitorArchiveSchema, "archivesVisitors");

export default VisitorArchive;
