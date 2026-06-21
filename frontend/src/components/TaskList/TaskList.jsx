import React from 'react'
import TaskItem from '../TaskItem/TaskItem'
import './TaskList.css'

export default function TaskList({ tasks, onEdit, onDelete, onToggleComplete }) {
  const completed = tasks.filter(t => t.completed).length
  const total = tasks.length

  return (
    <div className="task-list-container">
      <div className="list-stats">
        <span className="stat">{completed} of {total} completed</span>
      </div>

      <div className="task-list">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </div>
    </div>
  )
}
