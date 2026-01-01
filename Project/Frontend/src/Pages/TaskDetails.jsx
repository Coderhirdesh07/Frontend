import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_CONFIG } from "../config/index.config";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINT_2}/task/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTask(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load task details");
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!task) return <div className="p-6">Task not found</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-500 hover:underline">
        &larr; Back
      </button>
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-2">{task.title}</h1>
        <p className="mb-2"><strong>Description:</strong> {task.description}</p>
        <p className="mb-2"><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
        <p className="mb-2"><strong>Priority:</strong> {task.priority}</p>
        <p className="mb-2"><strong>Status:</strong> {task.status}</p>
      </div>
    </div>
  );
};

export default TaskDetails;
