const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const requestRoutes = require("./routes/RequestRoutes");
const userRoutes = require("./routes/UserRoutes");
const bookRoutes = require("./routes/BookRoutes");
const collectionRoutes = require("./routes/CollectionRoutes");
const favoritesRoutes = require("./routes/FavoritesRoutes");
const ownedRoutes = require("./routes/OwnedRoutes");

const app = express();

// require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/booksCollections", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  });

app.use("/api/book", bookRoutes);
app.use("/api/user", userRoutes);
app.use("/api/collection", collectionRoutes);
app.use("/api/request", requestRoutes);
app.use("/api/fav", favoritesRoutes);
app.use("/api/owned", ownedRoutes);

app.listen(5000, () => console.log(`Server running`));

module.exports = app;
