import mongoose from "mongoose";
import { peopleConn } from "../config/db.js";

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true,
    unique: true
  },
  profile: {
    tower: { type: String },
    flat: { type: String },
    floor: { type: Number },
    alternateMobile: { type: String, trim: true },
    dob: { type: Date }
  },
  societyId: {
    type: String,
    required: true
  },
  notificationToken: {
    type: String,
    trim: true
  },
  status: String
}, {
  timestamps: true,
  collection: "users" // Explicitly map to 'users' collection in people DB
});

const User = peopleConn.model("User", userSchema);

export default User;
