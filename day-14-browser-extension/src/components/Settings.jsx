import React, { useState } from 'react';

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    soundAlerts: false,
    autoStart: true,
    darkMode: false
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const settingsList = [
    {
      key: 'notifications',
      label: 'Enable Notifications',
      description: 'Get notified when focus sessions end'
    },
    {
      key: 'soundAlerts',
      label: 'Sound Alerts',
      description: 'Play sound when timer completes'
    },
    {
      key: 'autoStart',
      label: 'Auto-start Breaks',
      description: 'Automatically start break timers'
    },
    {
      key: 'darkMode',
      label: 'Dark Mode',
      description: 'Switch to dark theme'
    }
  ];

  return (
    <div className="settings-container">
      {settingsList.map(setting => (
        <div key={setting.key} className="setting-item">
          <label className="setting-label">{setting.label}</label>
          <p className="setting-description">{setting.description}</p>
          <div
            className={`toggle-switch ${settings[setting.key] ? 'active' : ''}`}
            onClick={() => toggleSetting(setting.key)}
          >
            <div className="toggle-slider" />
          </div>
        </div>
      ))}

      <div style={{ marginTop: '30px', padding: '20px', background: 'rgba(102, 126, 234, 0.05)', borderRadius: '16px' }}>
        <h3 style={{ marginBottom: '10px', color: '#333' }}>About</h3>
        <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
          Productivity Hub v1.0.0<br />
          Built with React & Vite<br />
          © 2024 Day 14 Project
        </p>
      </div>
    </div>
  );
}