const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    collectionName: {
      type: String,
      required: true,
    },
    collectionBuff: {
      type: String,
      required: true,
    },
    books: [
      {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
        },
        buff: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("request", requestSchema);
