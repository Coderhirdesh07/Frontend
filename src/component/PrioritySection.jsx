import React from 'react'
import StatusBadge from './StatusBadge'
function PrioritySection({ title, bgColor, tasks }) {
  return (
    <div className={`${bgColor} p-4 rounded-lg shadow`}>
    <h2 className="font-bold mb-2">{title}</h2>

    {tasks.length === 0 && (
      <p className="text-sm text-gray-600">No tasks</p>
    )}

    {tasks.map((task) => (
      <div
        key={task.id}
        className="bg-white p-3 rounded-lg mb-2 shadow flex justify-between items-center"
      >
        <div>
          <p className="font-semibold">{task.title}</p>
          <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
        </div>
        <StatusBadge status={task.status} />
      </div>
    ))}
  </div>
  )
}

export default PrioritySection