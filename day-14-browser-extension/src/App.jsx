import React, { useState } from 'react';
import { Clock, CheckSquare, Target, Settings as SettingsIcon } from 'lucide-react';
import FocusTimer from './components/FocusTimer';
import TaskList from './components/TaskList';
import Goals from './components/Goals';
import Settings from './components/Settings';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('focus');

  const tabs = [
    { id: 'focus', label: 'Focus', icon: Clock },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'settings', label: 'Settings', icon: SettingsIcon }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'focus':
        return <FocusTimer />;
      case 'tasks':
        return <TaskList />;
      case 'goals':
        return <Goals />;
      case 'settings':
        return <Settings />;
      default:
        return <FocusTimer />;
    }
  };

  return (
    <div className="extension-container">
      <div className="header">
        <h1>✨ Productivity Hub</h1>
        <p>Stay focused, get things done</p>
      </div>

      <div className="nav-tabs">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
}