import mongoose from "mongoose";
import { siteSpotlight } from "../setup";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  isAdmin: Boolean,
  followers: [String],
  following: [String],
  posts: [String],
  discordLink: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = siteSpotlight.model("User", userSchema);

export { User };
