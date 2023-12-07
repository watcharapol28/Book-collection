const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      // required: true,
    },
    lastName: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      max: 50,
    },
    sex: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
      // required: true,
    },

    token: {
      type: String,
      select: false, // hide the token field
    },
    // image: {
    //   data: { type: String },
    //   contentType: { type: String },
    // },
    role: {
      type: String,
    },
    buff: {
      type: String,
    },
    likedBooks: Array,
    ownedBooks: Array,
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
