import React from 'react';
import Gallery from './components/Gallery';
import './App.css';

export default function App() {
  return (
    <div className="app-container">
      {/* Animated Background Orbs */}
      <div className="background-orb orb-1"></div>
      <div className="background-orb orb-2"></div>
      <div className="background-orb orb-3"></div>

      {/* Header */}
      <div className="header">
        <h1>✨ 3D Card Gallery</h1>
        <p>Hover over the cards to experience stunning 3D effects</p>
        <span className="subtitle">Day 15 Project</span>
      </div>

      {/* Gallery Component */}
      <Gallery />
    </div>
  );
}