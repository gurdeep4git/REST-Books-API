const mongoose = require("mongoose");

const { Schema } = mongoose;

const bookModel = new Schema(
  {
    title: { type: String },
    author: { type: String },
    genre: { type: String },
    country: { type: String },
    language: { type: String },
    link: { type: String },
    pages: { type: Number },
    year: { type: Number }
  }
);

module.exports = mongoose.model("Book", bookModel);