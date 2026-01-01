import React, { useState } from "react";
import axios from "axios";
import { API_CONFIG } from "../../config/index.config";
import { useForm } from "react-hook-form";
function TaskCreationForm() {
  const {register,handleSubmit} = useForm();
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "low",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
      await axios.post(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINT_2}/create`, task, {
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
        onSubmit={handleSubmit(submit)}
        className="w-full max-w-md bg-gray-100 flex flex-col gap-4 p-6 rounded-lg shadow"
      >
        <h2 className="text-xl font-semibold text-gray-700 text-center">
          Create Task
        </h2>

        <input
          id="title"
          name="title"
          placeholder="Title *"
          className="bg-white border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          {...register("title")}
        />

        <textarea
          id="description"
          name="description"
          placeholder="Description"
          rows={3}
          className="bg-white border rounded p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
          {...register("description")}
        />

        <input
          type="date"
          name="dueDate"
          id="duedate"
          className="bg-white border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          {...register("duedate")}
        />

        <select
          name="priority"
          id="priority"
          className="bg-white border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          {...register("priority")}
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
