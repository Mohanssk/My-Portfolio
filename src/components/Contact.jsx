import React from 'react';

function Contact() {
  return (
    <section id="contact" className="container section reveal">
      <div className="contact-card card">
        <h2>Let Us Build Something Useful</h2>
        <p>
          I am open to internships, freelance opportunities, and collaborations in full-stack
          and AI-focused projects.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="mailto:mohankaruparthi7@gmail.com">
            Start a Conversation
          </a>
          <a
            className="btn btn-ghost"
            href="https://www.linkedin.com/in/mohansrisaikaruparthi"
            target="_blank"
            rel="noreferrer"
          >
            Connect on LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
