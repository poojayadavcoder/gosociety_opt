import mongoose from "mongoose";
import { operationsConn } from "../config/db.js";
import { randomUUID } from "crypto";

const ticketSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `uuid_ticket_${randomUUID()}`
  },
  societyId: {
    type: String,
    required: true,
    trim: true
  },
  raisedBy: {
    id: { type: String, required: true },
    type: { type: String, enum: ["user", "staff"], default: "user" }
  },
  type: {
    type: String,
    required: true,
    trim: true
  },
  subType: {
    type: String,
    default: null,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  attachments: {
    type: [String],
    default: []
  },
  status: {
    type: String,
    enum: ["open", "assigned", "resolved", "closed"],
    default: "open"
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high", "critical"],
    default: "medium"
  },
  assignedTo: {
    id: { type: String, default: null },
    type: { type: String, enum: ["staff", "servicePersonnel"], default: null }
  },
  visitDate: {
    type: Date,
    default: null
  },
  comments: [{
    by: {
      id: { type: String, required: true },
      type: { type: String, enum: ["user", "staff", "servicePersonnel"], required: true }
    },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    mediaIds: { type: [String], default: [] }
  }],
  resolution: {
    resolvedBy: {
      id: { type: String, default: null },
      type: { type: String, enum: ["staff", "servicePersonnel"], default: null }
    },
    resolvedAt: { type: Date, default: null },
    notes: { type: String, default: null },
    resolutionMedia: { type: [String], default: [] }
  }
}, { 
  timestamps: true,
  versionKey: false 
});

const Ticket = operationsConn.model("Ticket", ticketSchema, "tickets");

export default Ticket;
