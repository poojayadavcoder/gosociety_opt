import mongoose from "mongoose";
import { peopleConn } from "../config/db.js";

const societySchema = new mongoose.Schema({
  _id: {
    type: String
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    line1: { type: String },
    line2: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String },
    country: { type: String }
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  }
}, {
  timestamps: true,
  collection: "societies"
});

const Society = peopleConn.model("Society", societySchema);

export default Society;
