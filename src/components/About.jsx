import React from 'react';
import ProfileCard from './ProfileCard';

function About() {
  return (
    <section id="about" className="container section reveal">
      <div className="section-head">
        <h2>About Me</h2>
      </div>
      <div className="card about-card">
        <div className="about-content">
          <p>
            I am Mohana Sri Sai Karuparthi, a Computer Science undergraduate focused on
            full-stack engineering, Data Structures and Algorithms, and AI-powered features,
            and production-ready web experiences.
          </p>
          <p>
            I love turning ideas into functional products, from concept to deployment. My
            current focus is on building AI-assisted web applications with clear UX, clean APIs,
            and maintainable architecture.
          </p>
          <p>
            I enjoy solving practical problems, learning deeply by building, and shipping
            projects that deliver real user value.
          </p>
          <div className="social-links">
            <a href="https://www.linkedin.com/in/mohansrisaikaruparthi" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="https://github.com/Mohanssk" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="mailto:mohankaruparthi7@gmail.com">Email</a>
          </div>
        </div>
        <div className="about-image-wrap">
          <ProfileCard
            className="about-profile-card"
            name="Mohan Karuparthi"
            title="Software Engineer"
            handle="mohanssk"
            status="Online"
            contactText="Contact Me"
            avatarUrl="/profile.png"
            showIcon={false}
            showUserInfo={false}
            enableTilt={true}
            enableMobileTilt={true}
            onContactClick={() => console.log('Contact clicked')}
            behindGlowColor="rgba(125, 190, 255, 0.67)"
            behindGlowEnabled={false}
            grainUrl={null}
            innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
        />
        </div>
      </div>
    </section>
  );
}

export default About;
