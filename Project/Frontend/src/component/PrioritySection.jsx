import StatusBadge from './StatusBadge'
import React from "react";

const PrioritySection = ({ title, bgColor, tasks = [], onDelete }) => {
  return (
    <div className={`${bgColor} p-4 rounded-lg shadow`}>
      <h2 className="font-bold mb-3">{title}</h2>

      {tasks.length === 0 ? (
        <p className="text-sm text-gray-500">No tasks</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white p-3 rounded mb-2 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{task.title}</p>
              <p className="text-xs text-gray-500">
                {new Date(task.dueDate).toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-400">{task.status}</p>
            </div>

            {/* DELETE BUTTON */}
            <button
              onClick={() => onDelete(task._id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default PrioritySection;
