import React from 'react'

function TaskCard({title,value,color}) {
  return (
    <div className={`bg-${color} text-white p-4 rounded-lg shadow hover:shadow-xl`}>
     <p className='text-xl text-center font-bold'>{title}</p>
     <p className="text-xl font-bold text-center">{value}</p>
    </div>
  )
}

export default TaskCard