import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function FocusTimer() {
  const [focusTime, setFocusTime] = useState(25);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1500);

  useEffect(() => {
    setTimeLeft(focusTime * 60);
  }, [focusTime]);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      // Notification would go here
      alert('Focus session complete! Great work! 🎉');
      setTimeLeft(focusTime * 60);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, focusTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(focusTime * 60);
  };

  const presets = [
    { label: '15m', value: 15 },
    { label: '25m', value: 25 },
    { label: '45m', value: 45 },
    { label: '60m', value: 60 }
  ];

  return (
    <div className="timer-container">
      <div className="timer-display">
        {formatTime(timeLeft)}
      </div>

      <div className="timer-controls">
        <button
          className="btn btn-primary"
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? <Pause size={20} /> : <Play size={20} />}
          <span>{isRunning ? 'Pause' : 'Start'}</span>
        </button>
        <button className="btn btn-secondary" onClick={handleReset}>
          <RotateCcw size={20} />
          <span>Reset</span>
        </button>
      </div>

      <div className="time-preset">
        {presets.map(preset => (
          <button
            key={preset.value}
            className={`preset-btn ${focusTime === preset.value ? 'active' : ''}`}
            onClick={() => {
              setFocusTime(preset.value);
              setIsRunning(false);
            }}
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}