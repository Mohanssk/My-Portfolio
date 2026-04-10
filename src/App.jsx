import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    const header = document.querySelector('.site-header');
    const menuButton = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const revealItems = document.querySelectorAll('.reveal');
    const yearNode = document.getElementById('year');
    const projectFilterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const typingTextNode = document.getElementById('typing-text');
    const openCvModalButton = document.getElementById('open-cv-modal');
    const closeCvModalButton = document.getElementById('close-cv-modal');
    const cvModal = document.getElementById('cv-modal');

    if (yearNode) {
      yearNode.textContent = new Date().getFullYear();
    }

    let headerRafPending = false;
    const updateHeaderState = () => {
      if (header) {
        header.classList.toggle('scrolled', window.scrollY > 16);
      }
    };

    const handleScroll = () => {
      if (headerRafPending) {
        return;
      }

      headerRafPending = true;
      window.requestAnimationFrame(() => {
        updateHeaderState();
        headerRafPending = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateHeaderState();

    const handleMenuClick = () => {
      if (!menuButton || !navLinks) {
        return;
      }
      const isOpen = navLinks.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
    };

    menuButton?.addEventListener('click', handleMenuClick);

    const closeMenu = () => {
      navLinks?.classList.remove('open');
      menuButton?.setAttribute('aria-expanded', 'false');
    };

    navItems.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    const hideProjectCard = (card) => {
      if (card.classList.contains('is-hidden') && card.hidden) {
        return;
      }

      if (card.hideTimerId) {
        window.clearTimeout(card.hideTimerId);
      }

      card.classList.add('is-hidden');
      card.hideTimerId = window.setTimeout(() => {
        if (card.classList.contains('is-hidden')) {
          card.hidden = true;
        }
      }, 240);
    };

    const showProjectCard = (card, orderIndex) => {
      if (card.hideTimerId) {
        window.clearTimeout(card.hideTimerId);
      }

      card.hidden = false;
      card.style.setProperty('--stagger', `${orderIndex * 65}ms`);
      card.classList.remove('is-hidden');
      card.classList.remove('filter-in');

      window.requestAnimationFrame(() => {
        card.classList.add('filter-in');
      });
    };

    const applyProjectFilter = (filterValue) => {
      let visibleOrder = 0;

      projectCards.forEach((card) => {
        const categories = (card.dataset.categories || '').split(' ').filter(Boolean);
        const isMatch = filterValue === 'all' || categories.includes(filterValue);

        if (isMatch) {
          showProjectCard(card, visibleOrder);
          visibleOrder += 1;
        } else {
          hideProjectCard(card);
        }
      });
    };

    const onFilterButtonClick = (button) => {
      const selectedFilter = button.dataset.filter || 'all';

      projectFilterButtons.forEach((btn) => {
        const isActive = btn === button;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', String(isActive));
      });

      applyProjectFilter(selectedFilter);
    };

    projectFilterButtons.forEach((button) => {
      button.addEventListener('click', () => onFilterButtonClick(button));
    });

    if (projectFilterButtons.length && projectCards.length) {
      applyProjectFilter('all');
    }

    const roleTexts = [
      'Full stack Developer',
      'Backend Developer',
      'Aspiring ServiceNow Developer',
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingTimerId = null;

    const runTypingLoop = () => {
      if (!typingTextNode) {
        return;
      }

      const currentRole = roleTexts[roleIndex];

      if (isDeleting) {
        charIndex -= 1;
      } else {
        charIndex += 1;
      }

      typingTextNode.textContent = currentRole.slice(0, charIndex);

      let delay = isDeleting ? 55 : 90;

      if (!isDeleting && charIndex >= currentRole.length) {
        isDeleting = true;
        delay = 1300;
      } else if (isDeleting && charIndex <= 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roleTexts.length;
        delay = 340;
      }

      typingTimerId = window.setTimeout(runTypingLoop, delay);
    };

    if (typingTextNode) {
      runTypingLoop();
    }

    const closeCvModal = () => {
      if (!cvModal) {
        return;
      }
      cvModal.classList.remove('is-open');
      cvModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('cv-open');
    };

    const openCvModal = () => {
      if (!cvModal) {
        return;
      }
      cvModal.classList.add('is-open');
      cvModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('cv-open');
    };

    const onCvBackdropClick = (event) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.dataset.closeCv === 'true') {
        closeCvModal();
      }
    };

    const onEscape = (event) => {
      if (event.key === 'Escape' && cvModal?.classList.contains('is-open')) {
        closeCvModal();
      }
    };

    openCvModalButton?.addEventListener('click', openCvModal);
    closeCvModalButton?.addEventListener('click', closeCvModal);
    cvModal?.addEventListener('click', onCvBackdropClick);
    document.addEventListener('keydown', onEscape);

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      menuButton?.removeEventListener('click', handleMenuClick);
      navItems.forEach((link) => {
        link.removeEventListener('click', closeMenu);
      });
      projectCards.forEach((card) => {
        if (card.hideTimerId) {
          window.clearTimeout(card.hideTimerId);
        }
      });
      if (typingTimerId) {
        window.clearTimeout(typingTimerId);
      }
      openCvModalButton?.removeEventListener('click', openCvModal);
      closeCvModalButton?.removeEventListener('click', closeCvModal);
      cvModal?.removeEventListener('click', onCvBackdropClick);
      document.removeEventListener('keydown', onEscape);
      revealObserver.disconnect();
      document.body.classList.remove('cv-open');
    };
  }, []);

  return (
    <>
      <div className="background-wrap" aria-hidden="true">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
        <div className="grain"></div>
      </div>

      <header className="site-header">
        <nav className="nav container">
          <a href="#home" className="brand">
            Mohan<span>Karuparthi</span>
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
      </header>

      <main id="home">
        <section className="hero container section reveal">
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
              <img
                className="about-profile-image"
                src="/profile.png"
                alt="Mohana Sri Sai Karuparthi profile photo"
                width="240"
                height="300"
                decoding="async"
              />
            </div>
          </div>
        </section>

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

        <section id="projects" className="container section reveal">
          <div className="section-head">
            <h2>Featured Projects</h2>
          </div>
          <div className="projects-toolbar" aria-label="Project filters">
            <div className="filter-list" role="group" aria-label="Filter projects by category">
              <button type="button" className="filter-btn active" data-filter="all" aria-pressed="true">
                All
              </button>
              <button type="button" className="filter-btn" data-filter="fullstack" aria-pressed="false">
                Full Stack
              </button>
              <button type="button" className="filter-btn" data-filter="ai" aria-pressed="false">
                AI/ML
              </button>
              <button type="button" className="filter-btn" data-filter="backend" aria-pressed="false">
                Backend
              </button>
              <button type="button" className="filter-btn" data-filter="frontend" aria-pressed="false">
                Frontend
              </button>
            </div>
          </div>
          <div className="projects-grid">
            <article className="card project-card" data-categories="fullstack frontend backend">
              <h3>Gyan Ganga</h3>
              <p className="stack">React.js | Node.js | REST APIs</p>
              <p>
                Gamified Ed-Tech platform for grades 6-12 with NCERT-aligned content, XP system,
                and teacher dashboards for progress tracking.
              </p>
              <div className="project-tags" aria-label="Project categories">
                <span className="project-tag">Full Stack</span>
                <span className="project-tag">Frontend</span>
                <span className="project-tag">Backend</span>
              </div>
              <div className="project-links">
                <a href="https://gyan-ganga-mk7.vercel.app/" target="_blank" rel="noreferrer">
                  Live
                </a>
                <a href="https://github.com/Mohanssk/gyan-ganga" target="_blank" rel="noreferrer">
                  Code
                </a>
              </div>
            </article>

            <article className="card project-card" data-categories="ai fullstack frontend">
              <h3>Sign Vision</h3>
              <p className="stack">Python | Computer Vision | TensorFlow | React</p>
              <p>
                Real-time ASL to speech translator using webcam input with offline capability and
                accessibility-first interface design.
              </p>
              <div className="project-tags" aria-label="Project categories">
                <span className="project-tag">AI/ML</span>
                <span className="project-tag">Full Stack</span>
                <span className="project-tag">Frontend</span>
              </div>
              <div className="project-links">
                <a href="https://sign-vision-mk7.vercel.app/" target="_blank" rel="noreferrer">
                  Live
                </a>
                <a href="https://github.com/Mohanssk/Sign-Vision" target="_blank" rel="noreferrer">
                  Code
                </a>
              </div>
            </article>

            <article className="card project-card" data-categories="ai fullstack frontend backend">
              <h3>AI Career Roadmap Generator</h3>
              <p className="stack">React.js | Node.js | AI APIs | Vercel</p>
              <p>
                Personalized roadmap generator with interactive node-based progression and AI mentor
                guidance for career planning.
              </p>
              <div className="project-tags" aria-label="Project categories">
                <span className="project-tag">AI/ML</span>
                <span className="project-tag">Full Stack</span>
                <span className="project-tag">Backend</span>
              </div>
              <div className="project-links">
                <a href="https://roadmap-project-mk7.vercel.app/" target="_blank" rel="noreferrer">
                  Live
                </a>
                <a href="https://github.com/Mohanssk/Ai-powerd-leaningpath" target="_blank" rel="noreferrer">
                  Code
                </a>
              </div>
            </article>

            <article className="card project-card" data-categories="fullstack frontend backend">
              <h3>SemPrep</h3>
              <p className="stack">React.js | Node.js | MongoDB | Auth</p>
              <p>
                Role-based academic notes platform for students and teachers with structured
                metadata and search-friendly upload workflows.
              </p>
              <div className="project-tags" aria-label="Project categories">
                <span className="project-tag">Full Stack</span>
                <span className="project-tag">Backend</span>
                <span className="project-tag">Frontend</span>
              </div>
              <div className="project-links">
                <a href="https://sem-prep.vercel.app/" target="_blank" rel="noreferrer">
                  Live
                </a>
                <a href="https://github.com/Mohanssk/Sem_Prep" target="_blank" rel="noreferrer">
                  Code
                </a>
              </div>
            </article>

            <article className="card project-card" data-categories="backend">
              <h3>Iris Data API</h3>
              <p className="stack">Node.js | Express.js | REST | Vercel</p>
              <p>
                Production-style API for the Iris dataset with collection and individual lookup
                endpoints and interactive testing support.
              </p>
              <div className="project-tags" aria-label="Project categories">
                <span className="project-tag">Backend</span>
                <span className="project-tag">API Design</span>
              </div>
              <div className="project-links">
                <a href="https://iris-api-mk7.vercel.app/" target="_blank" rel="noreferrer">
                  Live
                </a>
                <a href="https://github.com/Mohanssk/Iris-API" target="_blank" rel="noreferrer">
                  Code
                </a>
              </div>
            </article>

            <article className="card project-card" data-categories="frontend">
              <h3>Task Management App</h3>
              <p className="stack">JavaScript | HTML5 | CSS3 | Local Storage</p>
              <p>
                Clean task manager with CRUD actions, persistent browser storage, and responsive
                layouts for daily productivity.
              </p>
              <div className="project-tags" aria-label="Project categories">
                <span className="project-tag">Frontend</span>
                <span className="project-tag">JavaScript</span>
              </div>
              <div className="project-links">
                <a href="https://to-do-list-mk7.vercel.app/" target="_blank" rel="noreferrer">
                  Live
                </a>
                <a href="https://github.com/Mohanssk/To-do-list" target="_blank" rel="noreferrer">
                  Code
                </a>
              </div>
            </article>
          </div>
        </section>

        <section id="timeline" className="container section reveal">
          <div className="section-head">
            <h2>Journey Route Map</h2>
          </div>
          <div className="timeline route-map" aria-label="Career route timeline">
            <article className="card timeline-item route-stop">
              <span className="route-index">01</span>
              <h3>Diploma - BVC Institute of Technology and Science</h3>
              <p>Computer Engineering | CGPA 8.8</p>
              <span>June 2021 - April 2024 | Andhra Pradesh, India</span>
            </article>

            <article className="card timeline-item route-stop">
              <span className="route-index">02</span>
              <h3>Karvy Data Management Services Limited</h3>
              <p>Quality Control Operator Internship</p>
              <span>December 2023 - May 2024 | Hyderabad, India</span>
            </article>

            <article className="card timeline-item route-stop">
              <span className="route-index">03</span>
              <h3>B.Tech - BVC Engineering College (BVCE)</h3>
              <p>Computer Science and Engineering | CGPA 8.29</p>
              <p className="certification-note">
                Certification: The Complete Full-Stack Web Development Bootcamp (The App Brewery /
                Udemy), 2024
              </p>
              <a
                className="route-cert-btn"
                href="https://www.udemy.com/certificate/UC-8580e863-b7c9-41d1-a9e5-cb022e56957e/"
                target="_blank"
                rel="noreferrer"
              >
                View Certificate
              </a>
              <span>July 2024 - April 2027 | Andhra Pradesh, India</span>
            </article>
          </div>
        </section>

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
      </main>

      <div className="cv-modal" id="cv-modal" aria-hidden="true">
        <div className="cv-modal-backdrop" data-close-cv="true"></div>
        <div className="cv-modal-panel" role="dialog" aria-modal="true" aria-labelledby="cv-modal-title">
          <div className="cv-modal-head">
            <h3 id="cv-modal-title">Mohan&apos;s Resume</h3>
            <button className="cv-modal-close" id="close-cv-modal" type="button" aria-label="Close CV preview">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="cv-modal-actions">
            <a className="btn btn-primary" href="/Mohan_Resume.pdf" download>
              Download CV
            </a>
            <a className="btn btn-ghost" href="/Mohan_Resume.pdf" target="_blank" rel="noreferrer">
              Open in New Tab
            </a>
          </div>
          <div className="cv-modal-viewer">
            <iframe src="/Mohan_Resume.pdf#view=FitH" title="Mohan&apos;s Resume PDF preview" loading="lazy"></iframe>
          </div>
        </div>
      </div>

      <footer className="site-footer">
        <div className="container footer-inner">
          <p>Build things that matter. Learn every day.</p>
          <p>
            <span id="year"></span> Mohan Karuparthi
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
