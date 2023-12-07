const mongoose = require("mongoose");
const Collection = require("../models/CollectionModel");
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

// Create a new collection
module.exports.createCollection = async (req, res) => {
  try {
    const { name, buff } = req.body;
    // console.log(req.body.books);
    // if (!req.file) {
    //   return res.status(400).json({ message: "Please upload an image." });
    // }
    // const fileName = req.file?.filename;
    // const fileMimetype = req.file?.mimetype;
    // const image = fs.readFileSync("public/images/" + fileName);
    // const base64Image =
    //   "data:image/jpeg;base64," + Buffer.from(image).toString("base64");

    // const books = req.body.books != undefined ? req.body.books : [];
    // // Create the collection object
    const collection = new Collection({
      _id: new mongoose.Types.ObjectId(),
      name: name,

      // books: books,
      buff: buff,
    });

    // Save the collection to the database
    await collection.save();

    return res.status(201).json(collection._id);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};
module.exports.deleteCollection = async (req, res) => {
  try {
    await Collection.findByIdAndDelete(req.params.id);

    res.status(201).json({ message: "Collection delete successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports.getAllCollection = async (req, res) => {
  try {
    const collections = await Collection.find().sort("name");
    res.status(201).json(collections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports.getCollection = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id).populate(
      "books"
    );
    if (!collection) {
      return res.status(404).json({ message: "Collection not found." });
    }
    return res.status(200).json(collection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

//update like create new collection and use old id
module.exports.updateCollection = async (req, res) => {
  try {
    const collectionId = req.params.id;
    const { name, buff } = req.body;

    // const fileName = req.file ? req.file.filename : rmbook.image.data;
    // const fileMimetype = req.file
    //   ? req.file.mimetype
    //   : rmbook.image.contentType;
    // console.log(fileName);

    // const image = fs.readFileSync("public/images/" + fileName);
    // const base64Image =
    //   "data:image/jpeg;base64," + Buffer.from(image).toString("base64");
    // console.log(base64Image);
    const updatecollection = {
      name: name,
      // description: description,
      // image: {
      //   data: fileName,
      //   contentType: fileMimetype,
      // },
      buff: buff,
    };
    const collection = await Collection.findByIdAndUpdate(
      collectionId,
      updatecollection,
      { new: true }
    );
    if (!collection) {
      return res.status(404).json({ message: "Collection not found." });
    }
    res.status(200).json({ message: "Collection updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// module.exports.addBookToCollection = async (req, res) => {
//   try {
//     const collectionId = req.params.id;
//     const currCollection = await Collection.findById(collectionId);
//     const updateBook = Array();
//     if (req.body.books) {
//       updateBook.push(req.body.books);
//     }
//     currCollection.books.forEach((element) => {
//       updateBook.push(element.toString());
//     });

//     const updateCollection = {
//       books: updateBook,
//     };
//     // console.log(updateCollection);

//     const collection = await Collection.findByIdAndUpdate(
//       collectionId,
//       updateCollection
//     ).populate("books");

//     if (!collection) {
//       return res.status(404).json({ message: "Collection not found." });
//     }
//     res.status(200).json({ message: "Collection updated successfully." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error." });
//   }
// };

// module.exports.putBookFromCollection = async (req, res) => {
//   try {
//     const collectionId = req.params.id;
//     const currCollection = await Collection.findById(collectionId);
//     const updateBook = Array();
//     const putBook = req.body ? Array(req.body.books) : [];

//     currCollection.books.forEach((element1) => {
//       putBook.forEach((element2) => {
//         if (element1.toString() == element2.toString()) {
//           updateBook.pop(element1);
//         }
//       });
//     });

//     const updateCollection = {
//       books: updateBook,
//     };

//     const collection = await Collection.findByIdAndUpdate(
//       collectionId,
//       updateCollection
//     ).populate("books");

//     if (!collection) {
//       return res.status(404).json({ message: "Collection not found." });
//     }
//     res.status(200).json({ message: "Collection updated successfully." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error." });
//   }
// };
