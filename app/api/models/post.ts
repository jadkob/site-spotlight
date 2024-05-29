import mongoose from "mongoose";
import { siteSpotlight } from "../setup";

const postSchema = new mongoose.Schema({
  username: String,
  name: String,
  description: String,
  link: String,
  reviews: [],
  createdAt: { type: Date, default: Date.now },
});

export const Post = siteSpotlight.model("Post", postSchema);
