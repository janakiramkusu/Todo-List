import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  let [todos, settodos] = useState([]);
  let [newName, setNewName] = useState("");
  let [newDes, setNewDes] = useState("");
  let [loading, setLoading] = useState(false); // For loading feedback

  const postTask = async (task) => {
    try {
      setLoading(true); // Set loading state when making the API call
      await axios.post("http://localhost:7001/api/todo", task);
      getTasks(); // Fetch tasks after creating a new one
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const deleteTask = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:7001/api/todo/${id}`);
      getTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id, task) => {
    try {
      setLoading(true);
      await axios.put(`http://localhost:7001/api/todo/${id}`, task);
      getTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTasks = async () => {
    setLoading(true);
    try {
      let response = await axios.get("http://localhost:7001/api/todo");
      settodos(response.data.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleSubmit = () => {
    if (!newName || !newDes) {
      alert("Both fields are required.");
      return;
    }
    postTask({ name: newName, description: newDes });
    setNewName("");
    setNewDes("");
  };

  return (
    <div className="container">
      <div className="input-box">
        <input
          className="name-inp"
          placeholder="Name the Task"
          value={newName}
          type="text"
          onChange={(ev) => setNewName(ev.target.value)}
        />
        <input
          className="des-input"
          value={newDes}
          placeholder="Describe Your Task"
          type="text"
          onChange={(ev) => setNewDes(ev.target.value)}
        />
        <button onClick={handleSubmit} className="sub-btn">
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>

      <div className="card-container">
        {loading ? (
          <h2>Loading...</h2>
        ) : todos.length === 0 ? (
          <h1>No tasks found</h1>
        ) : (
          todos.map((task) => (
            <Task tk={task} key={task._id} funs={{ deleteTask, updateTask }} />
          ))
        )}
      </div>
    </div>
  );
}

function Task({ tk, funs }) {
  let [upDes, setUpDes] = useState(tk.description);

  return (
    <div className={tk.done ? "task task-done" : "task"}>
      <div className="name-box">{tk.name}</div>

      <div className="inp-box">
        <input
          className="description"
          type="text-card"
          value={upDes}
          onChange={(ev) => setUpDes(ev.target.value)}
        />
      </div>
      <div className="btn btn-box">
        <button
          onClick={() => funs.updateTask(tk._id, { description: upDes })}
          className="update"
        >
          Update
        </button>
        <button onClick={() => funs.deleteTask(tk._id)} className="delete">
          Delete
        </button>
        <button
          onClick={() => funs.updateTask(tk._id, { done: !tk.done })}
          className={tk.done ? "undo" : "done"}
        >
          {tk.done ? "Undo" : "Completed"}
        </button>
      </div>
    </div>
  );
}

export default App;
