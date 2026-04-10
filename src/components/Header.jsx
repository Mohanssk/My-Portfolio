import React from 'react';
import GlassSurface from './GlassSurface';

function Header() {
  return (
    <header className="site-header">
      <GlassSurface
        className="site-header-glass container"
        width="80%"
        height={84}
        borderRadius={42}
        borderWidth={0.05}
        displace={0.34}
        backgroundOpacity={0.04}
        saturation={1.35}
        distortionScale={-115}
        brightness={70}
        opacity={0.6}
        mixBlendMode="screen"
      >
        <nav className="nav">
          <a href="#home" className="brand">
            M<span className="brand-k">K</span>
          </a>
          <button className="menu-btn" aria-label="Toggle menu" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className="nav-links">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#skills">Skills</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#timeline">Journey</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
      </GlassSurface>
    </header>
  );
}

export default Header;
