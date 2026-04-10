import React from 'react';

function Skills() {
  return (
    <section id="skills" className="container section reveal">
      <div className="section-head">
        <h2>Technical Skills</h2>
      </div>
      <div className="skills-grid">
        <article className="card skill-card">
          <h3>Languages</h3>
          <p>JavaScript (ES6+), Python, C++, SQL, HTML5, CSS3</p>
        </article>
        <article className="card skill-card">
          <h3>Frameworks</h3>
          <p>React.js, Node.js, Express.js, Tailwind CSS, Bootstrap 5</p>
        </article>
        <article className="card skill-card">
          <h3>Tools</h3>
          <p>Git, GitHub, VS Code, Vercel, npm, Postman</p>
        </article>
        <article className="card skill-card">
          <h3>Core Concepts</h3>
          <p>Data Structures, Algorithms, REST APIs, OOP, Auth, Responsive Design</p>
        </article>
      </div>
    </section>
  );
}

export default Skills;
