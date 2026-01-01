import React, { useState } from "react";
import axios from "axios";
import { API_CONFIG } from "../../config/index.config";

function TaskCreationForm() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "low",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!task.title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      setLoading(true);
      await axios.post(API_CONFIG.ENDPOINT_2, task, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setSuccess("Task added successfully 🎉");
      setTask({
        title: "",
        description: "",
        dueDate: "",
        priority: "low",
      });
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center p-6">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-gray-100 flex flex-col gap-4 p-6 rounded-lg shadow"
      >
        <h2 className="text-xl font-semibold text-gray-700 text-center">
          Create Task
        </h2>

        <input
          name="title"
          placeholder="Title *"
          value={task.title}
          onChange={handleChange}
          className="bg-white border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={task.description}
          onChange={handleChange}
          rows={3}
          className="bg-white border rounded p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          className="bg-white border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
          className="bg-white border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`rounded-md p-3 font-medium transition 
            ${loading 
              ? "bg-gray-300 cursor-not-allowed" 
              : "bg-blue-500 text-white hover:bg-blue-600"}
          `}
        >
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>
    </div>
  );
}

export default TaskCreationForm;
