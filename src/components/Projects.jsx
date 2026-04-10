import React from 'react';
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
      <div className="projects-grid">
        {projects.map((project) => (
          <article
            key={project.title}
            className="card project-card"
            data-categories={project.categories.join(' ')}
          >
            <h3>{project.title}</h3>
            <p className="stack">{project.stack}</p>
            <p>{project.description}</p>
            <div className="project-tags" aria-label="Project categories">
              {project.tags.map((tag) => (
                <span key={`${project.title}-${tag}`} className="project-tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="project-links">
              <a href={project.links.live} target="_blank" rel="noreferrer">
                Live
              </a>
              <a href={project.links.code} target="_blank" rel="noreferrer">
                Code
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Projects;
