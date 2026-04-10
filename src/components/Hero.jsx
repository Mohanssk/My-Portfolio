import React from 'react';
import SoftAurora from './SoftAurora';

function Hero() {
  return (
    <section className="hero container section reveal">
      <div className="hero-aurora" aria-hidden="true">
        <SoftAurora
          speed={0.6}
          scale={1.5}
          brightness={1}
          color1="#f7f7f7"
          color2="#41d3bd"
          noiseFrequency={2.5}
          noiseAmplitude={1}
          bandHeight={0.5}
          bandSpread={1}
          octaveDecay={0.1}
          layerOffset={0}
          colorSpeed={1}
          enableMouseInteraction
          mouseInfluence={0.25}
          />
      </div>
      <div className="hero-layout">
        <div className="hero-intro">
          <p className="eyebrow">Full Stack Developer | AI Enthusiast | Problem Solver</p>
          <h1>
            Hi, I&apos;m Mohan. <span className="wave-hand" aria-hidden="true">👋</span>
            <span className="hero-typed-line">
              <span id="typing-text" className="gradient-text" aria-live="polite"></span>
              <span className="typing-caret" aria-hidden="true"></span>
            </span>
          </h1>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">
              View Projects
            </a>
            <button className="btn btn-cv" id="open-cv-modal" type="button">
              View Resume
            </button>
            <a className="btn btn-ghost" href="mailto:mohankaruparthi7@gmail.com">
              Email Me
            </a>
          </div>
          <ul className="quick-meta">
            <li>Amalapuram, Andhra Pradesh, India</li>
            <li>6+ production web applications</li>
            <li>B.Tech CSE, Class of 2027</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Hero;
