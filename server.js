//import dependencies
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//setup Express.js server
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

//setup MongoDB connection
const MONGODB_URI = "mongodb://localhost/todo-app";
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connected to MongoDB database");
});

//start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
