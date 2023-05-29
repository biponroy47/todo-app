const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

router.post("/todos", (req, res) => {
  const { title } = req.body;
  const newTodo = new Todo({ title });

  newTodo
    .save()
    .then(() => res.json("Todo added!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.get("/todos", (req, res) => {
  Todo.find()
    .then((todos) => res.json(todos))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  Todo.findById(id)
    .then((todo) => {
      todo.title = title;
      todo.completed = completed;

      todo
        .save()
        .then(() => res.json("Updated!"))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.delete("/todos/:id", (req, res) => {
  const { id } = req.params;

  Todo.findByIdAndDelete(id)
    .then(() => res.json("Todo deleted!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
