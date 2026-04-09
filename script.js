const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const revealItems = document.querySelectorAll('.reveal');
const yearNode = document.getElementById('year');
const projectFilterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 16) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

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
