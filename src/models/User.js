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
  flat: String,
  tower: String,
  floor: String,
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
