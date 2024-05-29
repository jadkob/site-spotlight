import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://kabees:2011@book-db.skdoenm.mongodb.net/?retryWrites=true&w=majority&appName=book-db"
);

const siteSpotlight = mongoose.connection.useDb("site-spotlight");

export { siteSpotlight };
