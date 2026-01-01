import React, { useEffect, useMemo, useState } from "react";
import TaskCard from "../component/TaskCard";
import { useNavigate } from "react-router-dom";
import PrioritySection from "../component/PrioritySection";


const MOCK_TASKS = [
  { id: 1, title: "Design UI", dueDate: "2026-01-05", priority: "High", status: "Pending" },
  { id: 2, title: "Fix Bug #123", dueDate: "2026-01-03", priority: "Medium", status: "Completed" },
  { id: 3, title: "Write Docs", dueDate: "2026-01-07", priority: "Low", status: "Pending" },
  { id: 4, title: "Deploy App", dueDate: "2026-01-06", priority: "High", status: "Pending" },
  { id: 5, title: "Team Meeting", dueDate: "2026-01-04", priority: "Medium", status: "Pending" },
];

const Dashboard = () => {
  const [taskData, setTaskData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTaskData(MOCK_TASKS);
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <TaskCard title="Total Tasks" value={stats.total} color="blue-500" />
        <TaskCard title="Pending Tasks" value={stats.pending} color="yellow-500" />
        <TaskCard title="Completed Tasks" value={stats.completed} color="green-500" />
        <TaskCard title="High Priority" value={stats.highPriority} color="red-500" />
      </div>

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

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-bold mb-2">Recent Tasks</h2>

        {taskData.slice(-5).reverse().map(task => (
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
