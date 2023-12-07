const Book = require("../models/BookModel");
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

module.exports.uploadImage = upload.single("image");

module.exports.createBook = async (req, res) => {
  try {
    const { name, description, bookCollection, buff } = req.body;

    // if (!req.file) {
    //   return res.status(400).json({ message: "Please upload an image." });
    // }
    // const fileName = req.file?.filename;
    // const fileMimetype = req.file?.mimetype;
    // const image = fs.readFileSync("public/images/" + fileName);
    // const base64Image =
    //   "data:image/jpeg;base64," + Buffer.from(image).toString("base64");

    const book = new Book({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      description: description,
      bookCollection: bookCollection,
      buff: buff,
    });

    const errors = book.validateSync();
    if (errors) {
      return res.status(400).json(errors);
    }

    await book.save();
    //book.image.data
    res.status(201).json({ message: "Book created successfully." + book.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};
//now cant get
module.exports.getAllBook = async (req, res) => {
  try {
    const book = await Book.findById({ _id: req.params.id });
    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};
module.exports.getBook = async (req, res) => {
  try {
    const book = await Book.find({ bookCollection: req.params.id }).sort(
      "name"
    );
    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};
//now cant delete old image
module.exports.updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const { name, description, buff } = req.body;
    // const rmbook = await Book.findById(bookId);

    // const fileName = req.file ? req.file.filename : rmbook.image.data;
    // const fileMimetype = req.file
    //   ? req.file.mimetype
    //   : rmbook.image.contentType;
    // console.log(fileName);

    // const image = fs.readFileSync("public/images/" + fileName);
    // const base64Image =
    //   "data:image/jpeg;base64," + Buffer.from(image).toString("base64");
    // // console.log(base64Image);

    const updatebook = {
      name: name,
      description: description,
      // image: {
      //   data: fileName,
      //   contentType: fileMimetype,
      // },
      buff: base64Image,
      bookCollection: req.params.bookCollection,
    };

    const book = await Book.findByIdAndUpdate(bookId, updatebook, {
      new: true,
    });
    // if (rmbook.image.data && book.image.data) {
    //   if (rmbook.image.data != book.image.data) {
    //     fs.rmSync("public/images" + "/" + rmbook.image.data);
    //   }
    // }
    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }
    res.status(200).json({
      message: "Book updated successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    // fs.rmSync("public/images/" + "/" + book.image.data);
    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }
    res.status(200).json({ message: "Book deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};
