const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // description: {
    //   type: String,
    // },
    // image: {
    //   data: String,
    //   contentType: String,
    // },
    // books: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Book",
    //   },
    // ],
    buff: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("collections", collectionSchema);
