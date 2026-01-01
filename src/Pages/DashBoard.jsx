import React, { useEffect, useMemo, useState } from "react";
import TaskCard from "../component/TaskCard";
import { useNavigate } from "react-router-dom";
import PrioritySection from "../component/PrioritySection";
import axios from "axios"; // For API calls

const Dashboard = () => {
  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/tasks"); // Replace with your API endpoint
        setTaskData(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const stats = useMemo(() => {
    const total = taskData.length;
    const pending = taskData.filter(t => t.status === "Pending").length;
    const completed = taskData.filter(t => t.status === "Completed").length;
    const highPriority = taskData.filter(t => t.priority === "High").length;

    return { total, pending, completed, highPriority };
  }, [taskData]);

  const groupedTasks = useMemo(() => ({
    High: taskData.filter(t => t.priority === "High"),
    Medium: taskData.filter(t => t.priority === "Medium"),
    Low: taskData.filter(t => t.priority === "Low"),
  }), [taskData]);

  if (loading) {
    return <div className="p-6">Loading tasks...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={() => navigate("task-form")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          + Create New Task
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <TaskCard title="Total Tasks" value={stats.total} color="blue-500" />
        <TaskCard title="Pending Tasks" value={stats.pending} color="yellow-500" />
        <TaskCard title="Completed Tasks" value={stats.completed} color="green-500" />
        <TaskCard title="High Priority" value={stats.highPriority} color="red-500" />
      </div>

      {/* Tasks by Priority */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <PrioritySection
          title="High Priority"
          bgColor="bg-red-100"
          tasks={groupedTasks.High}
        />
        <PrioritySection
          title="Medium Priority"
          bgColor="bg-orange-100"
          tasks={groupedTasks.Medium}
        />
        <PrioritySection
          title="Low Priority"
          bgColor="bg-green-100"
          tasks={groupedTasks.Low}
        />
      </div>

      {/* Recent Tasks */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-bold mb-2">Recent Tasks</h2>
        {taskData
          .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate)) // Latest first
          .slice(0, 5)
          .map(task => (
            <div
              key={task.id}
              className="flex justify-between items-center border-b py-2 last:border-b-0"
            >
              <p>{task.title}</p>
              <p className="text-sm text-gray-500">{task.dueDate}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
