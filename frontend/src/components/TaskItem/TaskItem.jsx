import React from 'react'
import './TaskItem.css'

export default function TaskItem({ task, onEdit, onDelete, onToggleComplete }) {
  const priorityEmoji = { low: '🟢', medium: '🟡', high: '🔴' }
  const dueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id, task.completed)}
          className="task-checkbox"
        />
        <div className="task-title-section">
          <h3 className="task-title">{task.title}</h3>
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}
        </div>
        <span className="priority-badge">
          {priorityEmoji[task.priority] || '🟡'} {task.priority}
        </span>
      </div>

      <div className="task-meta">
        {task.tags && task.tags.length > 0 && (
          <div className="tags">
            {task.tags.map((tag, idx) => (
              <span key={idx} className="tag">#{tag}</span>
            ))}
          </div>
        )}
        <span className="due-date">📅 {dueDate}</span>
      </div>

      <div className="task-actions">
        <button
          className="btn btn-edit"
          onClick={() => onEdit(task)}
          title="Edit task"
        >
          ✏️ Edit
        </button>
        <button
          className="btn btn-delete"
          onClick={() => onDelete(task.id)}
          title="Delete task"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  )
}
