const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const multer = require("multer");
// const fs = require("fs");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images");
//   },
//   filename: (req, file, cb) => {
//     const fileName = Date.now() + "-" + file.originalname;
//     cb(null, fileName);
//   },
// });

// const upload = multer({ storage: storage });

// module.exports.uploadImage = upload.single("image");

//register
module.exports.userRegister = async (req, res) => {
  try {
    // Get user data from request body
    const {
      username,
      firstName,
      lastName,
      email,
      password,
      sex,
      dateOfBirth,
      image,
      role,
      buff,
    } = req.body;

    // Check if user with the given email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }
    const existingUser2 = await User.findOne({ username });
    if (existingUser2) {
      return res.status(401).json({ error: "Username already registered" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      sex,
      image,
      role,
      buff,
      dateOfBirth,
    });

    // Save the user to the database
    await newUser.save();

    // Return success response
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

//login
module.exports.userLogin = async (req, res) => {
  try {
    // Get user data from request body
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, "my-secret-key", {
      expiresIn: "1h",
    });

    // Save token to user's token field in the database
    user.token = token;
    await user.save();

    // Return success response with token
    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

//logout
module.exports.userLogout = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    user.token = undefined;
    await user.save();

    return res.json({ message: "User logged out successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports.userGetData = async (req, res) => {
  try {
    // Find user by user id
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    return res.json({ message: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

//UpdatePassword
module.exports.userUpdatePassword = async (req, res) => {
  try {
    // Find user by user id
    const userID = req.params.id;
    const firstName = req.body?.firstname
      ? req.body?.firstname
      : req.params.firstname;
    const lastName = req.body?.lastname
      ? req.body?.lastname
      : req.params.lastname;
    const role = req.body?.role ? req.body.role : req.params.role;
    const sex = req.body?.sex ? req.body.sex : req.params.sex;
    const dateOfBirth = req.body?.dateOfBirth
      ? req.body.dateOfBirth
      : req.params.dateOfBirth;
    const buff = req.body?.buff ? req.body.buff : req.params.buff;

    const newpassword = req.body?.password
      ? req.body.password
      : req.params.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = req.body?.password
      ? await bcrypt.hash(newpassword, salt)
      : "0";
    // console.log("\n\n\n\n\n\n" + buff);

    // const rmImage = await User.findById(userID);
    // const fileName = req.file ? req.file.filename : rmImage.image?.data;
    // console.log(req.file);
    // const fileMimetype = req.file
    //   ? req.file.mimetype
    //   : rmImage.image?.contentType;
    // const image = req.body?.buff
    //   ? ""
    //   : fs.readFileSync("public/images/" + fileName);
    // const base64Image = req.body?.buff
    //   ? req.body?.buff
    //   : "data:image/jpeg;base64," + Buffer.from(image).toString("base64");

    const updateUser = {
      username: req.params.username,
      firstName: firstName,
      lastName: lastName,
      email: req.params.email,
      password: hashedPassword == "0" ? req.params.password : hashedPassword,
      sex: sex,
      // image: {
      //   data: fileName,
      //   contentType: fileMimetype,
      // },
      role: role,
      buff: buff,
      dateOfBirth: dateOfBirth,
    };
    const user = await User.findByIdAndUpdate(userID, updateUser, {
      new: true,
    });
    // if (rmImage.image.data && user.image.data) {
    //   if (rmImage.image.data != user.image.data) {
    //     fs.rmSync("public/images" + "/" + rmImage.image.data);
    //   }
    // }
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    // console.log("201");
    return res.status(201).json({ message: user });
    // return res.json({ message: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

// module.exports.addToLikedBooks = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const bookId = req.body;
//     const user = await User.findById(userId);
//     const likedBooks = await User.findByIdAndUpdate(userId, {
//       likedBooks: user.likedBooks + bookId,
//     });
//     if (!likedBooks) {
//       return res.status(404).json({ message: "User not found." });
//     }
//     res.status(200).json({ message: "Add to liked." });
//   } catch (error) {
//     return res.json({ msg: "Error adding book" });
//   }
// };

// module.exports.removeFromLikedBooks = async (req, res) => {
//   try {
//     const { userId, bookId } = req.body;
//     const user = await User.findById(userId);
//   } catch (error) {
//     return res.json({ msg: "Error removing book to the liked list" });
//   }
// };

// module.exports.reqAddCollection = async (req, res) => {};
