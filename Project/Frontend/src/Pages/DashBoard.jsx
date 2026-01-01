import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_CONFIG } from "../config/index.config";
import StatusBadge from "../component/StatusBadge";

const Dashboard = () => {
  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token missing, please login again");
        setLoading(false);
        return;
      }
      const res = await axios.get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINT_2}/all-tasks`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const tasks = Array.isArray(res.data) ? res.data : res.data?.data || res.data?.tasks || [];
      setTaskData(tasks);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINT_2}/delete/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTaskData(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete task");
    }
  };

  const toggleStatus = async (task) => {
    const newStatus = task.status === "Pending" ? "Completed" : "Pending";
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINT_2}/update/${task._id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  const safeTasks = useMemo(() => (Array.isArray(taskData) ? taskData : []), [taskData]);

  const groupedTasks = useMemo(() => {
    return {
      High: safeTasks.filter(t => t.priority.toLowerCase() === "high"),
      Medium: safeTasks.filter(t => t.priority.toLowerCase() === "medium"),
      Low: safeTasks.filter(t => t.priority.toLowerCase() === "low")
    };
  }, [safeTasks]);

  const stats = useMemo(() => {
    return {
      total: safeTasks.length,
      pending: safeTasks.filter(t => t.status === "Pending").length,
      completed: safeTasks.filter(t => t.status === "Completed").length,
      highPriority: safeTasks.filter(t => t.priority === "High").length
    };
  }, [safeTasks]);

  if (loading) return <div className="p-6">Loading tasks...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  const priorityColors = { High: "bg-red-100", Medium: "bg-yellow-100", Low: "bg-green-100" };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={() => navigate("/task-form")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Create New Task
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-500 text-white p-4 rounded shadow">
          <h3>Total Tasks</h3>
          <p className="text-xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded shadow">
          <h3>Pending Tasks</h3>
          <p className="text-xl font-bold">{stats.pending}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded shadow">
          <h3>Completed Tasks</h3>
          <p className="text-xl font-bold">{stats.completed}</p>
        </div>
        <div className="bg-red-500 text-white p-4 rounded shadow">
          <h3>High Priority</h3>
          <p className="text-xl font-bold">{stats.highPriority}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {["High", "Medium", "Low"].map(priority => (
          <div key={priority} className={`p-4 rounded shadow flex flex-col h-96 overflow-y-auto ${priorityColors[priority]}`}>
            <h2 className="font-bold mb-2">{priority} Priority</h2>
            {groupedTasks[priority].length === 0 ? (
              <p className="text-gray-500">No tasks</p>
            ) : (
              groupedTasks[priority].map(task => (
                <div key={task._id} className="flex justify-between items-center border-b py-2">
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-gray-500">{new Date(task.dueDate).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <StatusBadge status={task.status} />
                    <button
                      onClick={() => toggleStatus(task)}
                      className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Toggle Status
                    </button>
                    <button
                      onClick={() => navigate(`/task-edit/${task._id}`)}
                      className="px-2 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded-lg shadow h-96 overflow-y-auto">
        <h2 className="font-bold mb-2">Recent Tasks</h2>
        {[...safeTasks].sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate)).map(task => (
          <div key={task._id} className="flex justify-between items-center border-b py-2">
            <div>
              <p className="font-medium">{task.title}</p>
              <p className="text-sm text-gray-500">{new Date(task.dueDate).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-2 items-center">
              <StatusBadge status={task.status} />
              <button
                onClick={() => toggleStatus(task)}
                className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Toggle Status
              </button>
              <button
                onClick={() => navigate(`/task-edit/${task._id}`)}
                className="px-2 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
