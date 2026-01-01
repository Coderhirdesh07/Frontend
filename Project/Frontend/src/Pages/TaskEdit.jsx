import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_CONFIG } from "../config/index.config";

const TaskEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.put(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINT_2}/task/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        reset(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch task");
      }
    };
    fetchTask();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.patch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINT_2}/update/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-gray-100 flex flex-col gap-4 p-6 rounded-lg shadow"
      >
        <h2 className="text-xl font-semibold text-gray-700 text-center">Edit Task</h2>

        <input
        id="title"
          placeholder="Title"
          className="bg-white border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          {...register("title")}
        />
        <textarea
        id="description"
          placeholder="Description"
          rows={3}
          className="bg-white border rounded p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
          {...register("description")}
        />
        <input
          type="date"
          id="dueDate"
          className="bg-white border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          {...register("dueDate")}
        />
        <select
        id="priority"
          className="bg-white border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          {...register("priority")}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select
        id="status"
          className="bg-white border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          {...register("status")}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`rounded-md p-3 font-medium transition ${
            loading ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {loading ? "Updating..." : "Update Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskEdit;
