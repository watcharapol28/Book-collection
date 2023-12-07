const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    // image: {
    //   data: { type: String },
    //   contentType: { type: String, required: true },
    // },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    buff: { type: String },
    liked: {
      type: Number,
    },
    bookCollection: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
