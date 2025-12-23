import React from 'react';
import Card3D from './Card3D';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';

export default function Gallery() {
  return (
    <div className="gallery-grid">
      {projects.map((project, index) => (
        <Card3D key={project.id}>
          <ProjectCard project={project} />
        </Card3D>
      ))}
    </div>
  );
}