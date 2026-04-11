import React from 'react';
import { skillsByCategory } from '../data/portfolioData';

function Skills() {
  return (
    <section id="skills" className="container section reveal">
      <div className="section-head">
        <h2>Technical Skills</h2>
      </div>
      <div className="skills-grid">
        {skillsByCategory.map((group, groupIndex) => (
          <article
            key={group.title}
            className="card skill-card"
            style={{ '--group-delay': `${groupIndex * 90}ms` }}
          >
            <h3>{group.title}</h3>
            <div className="skill-marquee" aria-label={`${group.title} skills`}>
              <ul
                className="skill-track"
                style={{
                    animationDuration: `${34 + groupIndex * 4}s`,
                  animationDirection: groupIndex % 2 ? 'reverse' : 'normal',
                }}
              >
                {[...group.skills, ...group.skills].map((skill, skillIndex) => (
                  <li key={`${skill.name}-${skillIndex}`} className="skill-item">
                    <img src={skill.logo} alt={`${skill.name} logo`} loading="lazy" />
                    <span>{skill.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Skills;
