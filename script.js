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

if (header) {
  let headerRafPending = false;

  const updateHeaderState = () => {
    header.classList.toggle('scrolled', window.scrollY > 16);
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
}

if (menuButton) {
  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
}

navItems.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
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

if (projectFilterButtons.length && projectCards.length) {
  projectFilterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedFilter = button.dataset.filter || 'all';

      projectFilterButtons.forEach((btn) => {
        const isActive = btn === button;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', String(isActive));
      });

      applyProjectFilter(selectedFilter);
    });
  });

  applyProjectFilter('all');
}

if (typingTextNode) {
  const roleTexts = [
    'Full stack Developer',
    'Backend Developer',
    'Aspiring ServiceNow Developer',
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const runTypingLoop = () => {
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

    window.setTimeout(runTypingLoop, delay);
  };

  runTypingLoop();
}

if (cvModal && openCvModalButton) {
  const closeCvModal = () => {
    cvModal.classList.remove('is-open');
    cvModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('cv-open');
  };

  const openCvModal = () => {
    cvModal.classList.add('is-open');
    cvModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('cv-open');
  };

  openCvModalButton.addEventListener('click', openCvModal);

  if (closeCvModalButton) {
    closeCvModalButton.addEventListener('click', closeCvModal);
  }

  cvModal.addEventListener('click', (event) => {
    const target = event.target;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (target.dataset.closeCv === 'true') {
      closeCvModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && cvModal.classList.contains('is-open')) {
      closeCvModal();
    }
  });
}

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
