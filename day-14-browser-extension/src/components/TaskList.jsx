import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function TaskList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Complete project proposal', completed: false },
    { id: 2, text: 'Review pull requests', completed: true },
    { id: 3, text: 'Team meeting at 3 PM', completed: false }
  ]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div>
      <div className="task-input-container">
        <input
          type="text"
          className="task-input"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="btn btn-primary btn-icon" onClick={addTask}>
          <Plus size={20} />
        </button>
      </div>

      <div className="task-list">
        {tasks.map(task => (
          <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              className="task-checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span className="task-text">{task.text}</span>
            <div className="task-actions">
              <button className="icon-btn" onClick={() => deleteTask(task.id)}>
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {tasks.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
          <p>No tasks yet. Add one to get started! 🚀</p>
        </div>
      )}
    </div>
  );
}