const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 3500;

app.use(cors());
app.use(express.json());

const MONGODB_URI =
  "mongodb+srv://biponroy47:bipondiya47@cluster0.crbjygj.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connected to MongoDB database");
});

const todoRouter = require("./routes/todos");

app.use("/api", todoRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
