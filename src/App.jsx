import React, { lazy, Suspense, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import ResumeModal from './components/ResumeModal';
import Footer from './components/Footer';
import useSplashCursorEnabled from './hooks/useSplashCursorEnabled';

const SplashCursor = lazy(() => import('./components/SplashCursor'));

function App() {
  const isSplashCursorEnabled = useSplashCursorEnabled();

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
      {isSplashCursorEnabled ? (
        <Suspense fallback={null}>
          <SplashCursor />
        </Suspense>
      ) : null}

      <Header />

      <main id="home">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Contact />
      </main>

      <ResumeModal />
      <Footer />
    </>
  );
}

export default App;
