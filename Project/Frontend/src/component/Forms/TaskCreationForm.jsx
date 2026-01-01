import React, { useState } from "react";
import axios from "axios";
import { API_CONFIG } from "../../config/index.config";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

function TaskCreationForm() {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const submit = async (data) => {
    setError("");
    setSuccess("");

    if (!data.title?.trim()) {
      setError("Title is required");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token missing");

      await axios.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINT_2}/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Task added successfully 🎉");
      reset(); // Reset form fields
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to create task");
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

        {/* Title */}
        <input
          id="title"
          placeholder="Title *"
          className="bg-white border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          {...register("title")}
        />

        {/* Description */}
        <textarea
          id="description"
          placeholder="Description"
          rows={3}
          className="bg-white border rounded p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
          {...register("description")}
        />

        {/* Due Date */}
        <input
          type="date"
          id="dueDate"
          className="bg-white border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          {...register("dueDate")}
        />

        {/* Priority */}
        <select
          id="priority"
          className="bg-white border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          {...register("priority")}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        {/* Status */}
        <select
          id="status"
          className="bg-white border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          {...register("status")}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        {/* Messages */}
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        {/* Submit Button */}
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
