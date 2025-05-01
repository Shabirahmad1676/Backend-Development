import React, { useState, useEffect } from "react";
import axios from "axios";

const MAX_LENGTH = 100;

const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      setError("Todo cannot be empty.");
      return;
    }
    if (inputValue.length > MAX_LENGTH) {
      setError(`Todo is too long (max ${MAX_LENGTH} characters).`);
      return;
    }
    if (/^\d+$/.test(inputValue)) {
      setError("Title cannot be only numbers");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/todos", {
        title: inputValue,
      });
      setTodos([res.data, ...todos]);
      setInputValue("");
      setError("");
    } catch (error) {
      setError("Failed to add todo");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      setError("Not deleted");
    }
  };

  const handleUpdate = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/todos/${id}`, {
        title: editValue,
      });
      setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
      setEditId(null);
      setEditValue("");
      setError("");
    } catch (error) {
      setError("Failed to update todo");
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/todos");
      setTodos(res.data);
    } catch (error) {
      setError("Failed to fetch todos");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-blue-700 text-center">
        Your Todos
      </h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter todo..."
          className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add
        </button>
      </form>
      {error && <div className="text-red-600 mb-2">{error}</div>}

      {todos.map((todo) => (
        <li
          key={todo._id}
          className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2"
        >
          {editId === todo._id ? (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-1 px-2 py-1 border rounded mr-2"
            />
          ) : (
            <span className="flex-1">
              {todo.title.length > MAX_LENGTH
                ? todo.title.slice(0, MAX_LENGTH) + "..."
                : todo.title}
            </span>
          )}

          {editId === todo._id ? (
            <>
              <button
                onClick={() => handleUpdate(todo._id)}
                className="bg-green-500 text-white px-2 py-1 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditId(null);
                  setEditValue("");
                  setError("");
                }}
                className="bg-gray-400 text-white px-2 py-1 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setEditId(todo._id);
                setEditValue(todo.title);
                setError("");
              }}
              className="text-blue-500 hover:underline mr-2"
            >
              Edit
            </button>
          )}

          <button
            onClick={() => handleDelete(todo._id)}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </li>
      ))}
    </div>
  );
};

export default Todo;
