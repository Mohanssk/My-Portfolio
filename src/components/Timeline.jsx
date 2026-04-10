import React from 'react';
import { timelineItems } from '../data/portfolioData';

function Timeline() {
  return (
    <section id="timeline" className="container section reveal">
      <div className="section-head">
        <h2>Journey Route Map</h2>
      </div>
      <div className="timeline route-map" aria-label="Career route timeline">
        {timelineItems.map((item) => (
          <article key={item.index} className="card timeline-item route-stop">
            <span className="route-index">{item.index}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            {item.certification && (
              <p className="certification-note">{item.certification}</p>
            )}
            {item.certificationLink && (
              <a
                className="route-cert-btn"
                href={item.certificationLink}
                target="_blank"
                rel="noreferrer"
              >
                {item.certificationLabel || 'View Certificate'}
              </a>
            )}
            <span>{item.dateLocation}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Timeline;
