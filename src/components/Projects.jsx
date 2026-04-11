import React from 'react';
import MagicBento from './MagicBento';
import { projectFilters, projects } from '../data/portfolioData';

function Projects() {
  return (
    <section id="projects" className="container section reveal">
      <div className="section-head">
        <h2>Featured Projects</h2>
      </div>
      <div className="projects-toolbar" aria-label="Project filters">
        <div className="filter-list" role="group" aria-label="Filter projects by category">
          {projectFilters.map((filter, index) => (
            <button
              key={filter.value}
              type="button"
              className={`filter-btn${index === 0 ? ' active' : ''}`}
              data-filter={filter.value}
              aria-pressed={index === 0 ? 'true' : 'false'}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
      <MagicBento
        projects={projects}
        textAutoHide={true}
        enableStars={true}
        enableSpotlight={true}
        enableBorderGlow={true}
        enableTilt={false}
        enableMagnetism={false}
        clickEffect={true}
        spotlightRadius={400}
        particleCount={28}
        glowColor="65, 211, 189"
        disableAnimations={false}
      />
    </section>
  );
}

export default Projects;
