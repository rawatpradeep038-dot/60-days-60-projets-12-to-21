import React, { useState } from 'react';

export default function Goals() {
  const [goals, setGoals] = useState([
    { id: 1, title: 'Daily Tasks', current: 2, target: 5 },
    { id: 2, title: 'Focus Sessions', current: 3, target: 8 },
    { id: 3, title: 'Weekly Goals', current: 7, target: 10 }
  ]);

  const getProgress = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="goals-container">
      {goals.map(goal => (
        <div key={goal.id} className="goal-card">
          <div className="goal-header">
            <h3 className="goal-title">{goal.title}</h3>
            <span className="goal-stats">
              {goal.current}/{goal.target}
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${getProgress(goal.current, goal.target)}%` }}
            />
          </div>
        </div>
      ))}

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-value">12</div>
          <div className="stat-label">Tasks Today</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">5h</div>
          <div className="stat-label">Focus Time</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">87%</div>
          <div className="stat-label">Completion</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">23</div>
          <div className="stat-label">Streak Days</div>
        </div>
      </div>
    </div>
  );
}