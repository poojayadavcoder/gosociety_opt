import mongoose from "mongoose";
import { operationsConn } from "../config/db.js";
import { randomUUID } from "crypto";

const visitorSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `uuid_visitor_${randomUUID()}`
  },
  societyId: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ["guest", "delivery", "maid", "servicePersonnel", "cab", "group", "others", "other", "guard", "societyHead", "accountant", "clerk", "manager", "staff"],
    required: true
  },
  fName: {

    type: String,
    required: true,
    trim: true
  },
  mobile: {
    type: String,
    default: null,
    trim: true
  },
  idProofs: [{
    type: { type: String, enum: ["aadhaar", "passport", "other"] },
    mediaId: { type: String },
    verified: { type: Boolean, default: false }
  }],
  vehicleNumber: {
    type: String,
    default: null,
    trim: true
  },
  hostUserId: {
    type: String,
    required: false,
    default: null,
    trim: true
  },
  servicePersonnelId: {
    type: String,
    default: null
  },
  visitorPurpose: {
    type: String,
    default: null,
    trim: true
  },
  status: {
    type: String,
    enum: ["requested", "approved", "denied"],
    default: "requested"
  },
  approvalId: {
    type: String,
    default: null
  },
  passCode: {
    type: String,
    default: null,
    trim: true
  },
  expectedAt: {
    type: Date,
    default: null
  },
  guestCount: {
    type: Number,
    default: 1
  },
  entryTime: {
    type: Date,
    default: null
  },
  exitTime: {
    type: Date,
    default: null
  },
  packageAtGate: {
    type: Boolean,
    default: false
  },
  cabCompany: {
    type: String,
    default: null,
    trim: true
  },
  cabTripType: {
    type: String,
    enum: ["drop-off", "pick-up", null],
    default: null
  },
  flat: {
    type: String,
    default: null,
    trim: true
  },
  block: {
    type: String,
    default: null,
    trim: true
  },
  photo: {
    type: String,
    default: null
  }


}, { 
  timestamps: true,
  versionKey: false 
});

const Visitor = operationsConn.model("Visitor", visitorSchema, "visitors");

export default Visitor;
