import React from 'react'

function StatusBadge({status}) {
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs text-white ${
        status === "Pending" ? "bg-yellow-500" : "bg-green-500"
      }`}
    >
      {status}
    </span>
  )
}

export default StatusBadge

// const StatusBadge = ({ status }) => (
//     <span
//       className={`px-2 py-1 rounded-full text-xs text-white ${
//         status === "Pending" ? "bg-yellow-500" : "bg-green-500"
//       }`}
//     >
//       {status}
//     </span>
//   );