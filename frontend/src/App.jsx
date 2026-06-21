import React, { useState, useEffect } from 'react'
import TaskForm from './components/TaskForm/TaskForm'
import TaskList from './components/TaskList/TaskList'
import './styles/App.css'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingTask, setEditingTask] = useState(null)

  const API_URL = 'http://localhost:4000/api/tasks'

  // Sort tasks by newest first
  const sortTasksByNewest = (tasksArray) => {
    return [...tasksArray].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  // Fetch all tasks
  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const res = await fetch(API_URL)
      if (!res.ok) throw new Error('Failed to fetch tasks')
      const data = await res.json()
      setTasks(sortTasksByNewest(data))
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAddTask = async (taskData) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      })
      if (!res.ok) throw new Error('Failed to create task')
      const newTask = await res.json()
      setTasks(sortTasksByNewest([...tasks, newTask]))
      setError(null)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleUpdateTask = async (taskId, updates) => {
    try {
      const res = await fetch(`${API_URL}/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })
      if (!res.ok) throw new Error('Failed to update task')
      const updated = await res.json()
      setTasks(sortTasksByNewest(tasks.map(t => t.id === taskId ? updated : t)))
      setEditingTask(null)
      setError(null)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure?')) return
    try {
      const res = await fetch(`${API_URL}/${taskId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete task')
      setTasks(tasks.filter(t => t.id !== taskId))
      setError(null)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleToggleComplete = async (taskId, completed) => {
    await handleUpdateTask(taskId, { completed: !completed })
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📋 Task Manager</h1>
        <p className="subtitle">Organize your tasks efficiently</p>
      </header>

      <main className="app-main">
        {error && <div className="error-banner">{error}</div>}

        <section className="form-section">
          <TaskForm 
            onSubmit={editingTask ? 
              (data) => handleUpdateTask(editingTask.id, data) :
              handleAddTask
            }
            initialTask={editingTask}
            onCancel={() => setEditingTask(null)}
          />
        </section>

        <section className="list-section">
          {loading ? (
            <p className="loading">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="no-tasks">No tasks yet. Create one to get started!</p>
          ) : (
            <TaskList 
              tasks={tasks}
              onEdit={setEditingTask}
              onDelete={handleDeleteTask}
              onToggleComplete={handleToggleComplete}
            />
          )}
        </section>
      </main>
    </div>
  )
}
