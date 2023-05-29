import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3500/api/todos") // Include the port number in the URL
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3500/api/todos", { title: newTodo }) // Include the port number in the URL
      .then(() => {
        setNewTodo("");
        updateTodoList();
      })
      .catch((err) => console.log(err));
  };

  const handleTodoUpdate = (id, completed) => {
    axios
      .put(`http://localhost:3500/api/todos/${id}`, { completed: !completed }) // Include the port number in the URL
      .then(() => {
        updateTodoList();
      })
      .catch((err) => console.log(err));
  };

  const handleTodoDelete = (id) => {
    axios
      .delete(`http://localhost:3500/api/todos/${id}`) // Include the port number in the URL
      .then(() => {
        updateTodoList();
      })
      .catch((err) => console.log(err));
  };

  const updateTodoList = () => {
    axios
      .get("http://localhost:3500/api/todos") // Include the port number in the URL
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Todo List</h1>

      <form onSubmit={handleFormSubmit}>
        <input
          type='text'
          value={newTodo}
          onChange={handleInputChange}
          placeholder='Add a new todo'
        />
        <button type='submit'>Add</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <input
              type='checkbox'
              checked={todo.completed}
              onChange={() => handleTodoUpdate(todo._id, todo.completed)}
            />
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.title}
            </span>
            <button onClick={() => handleTodoDelete(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
