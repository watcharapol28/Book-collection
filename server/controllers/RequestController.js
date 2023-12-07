const Request = require("../models/RequestModel");
const mongoose = require("mongoose");

module.exports.createRequest = async (req, res) => {
  try {
    const { collectionName, collectionBuff, books } = req.body;
    const request = new Request({
      _id: new mongoose.Types.ObjectId(),
      collectionName: collectionName,
      collectionBuff: collectionBuff,
      books: books,
    });
    const errors = request.validateSync();
    if (errors) {
      return res.status(400).json(errors);
    }
    await request.save();
    res.status(201).json({ message: "request created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports.getRequest = async (req, res) => {
  try {
    const request = await Request.find();
    return res.status(201).json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports.removeRequest = async (req, res) => {
  try {
    await Request.findByIdAndDelete(req.params.id);
    return res.status(201).json({ message: "Delete success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};
