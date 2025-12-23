import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div className="card-glow"></div>
      
      <div className="card-image">
        <img src={project.image} alt={project.title} />
        <div className="card-overlay">
          <button className="view-project-btn">
            <span>View Project</span>
            <ExternalLink size={18} />
          </button>
        </div>
      </div>

      <div className="card-content">
        <div className="card-header">
          <span className="card-category">{project.category}</span>
          <h3 className="card-title">{project.title}</h3>
        </div>

        <p className="card-description">{project.description}</p>

        <div className="tech-stack">
          {project.technologies.map((tech, index) => (
            <span key={index} className="tech-badge">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="card-shine"></div>
    </div>
  );
}