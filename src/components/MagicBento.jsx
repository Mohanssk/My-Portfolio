import React, { useRef, useEffect, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import './MagicBento.css';

const DEFAULT_PARTICLE_COUNT = 24;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '65, 211, 189';
const MOBILE_BREAKPOINT = 768;

const fallbackCards = [
  {
    color: '#060010',
    title: 'Analytics',
    description: 'Track user behavior',
    label: 'Insights',
    categories: ['all'],
    links: null,
    stack: '',
  },
  {
    color: '#060010',
    title: 'Dashboard',
    description: 'Centralized data view',
    label: 'Overview',
    categories: ['all'],
    links: null,
    stack: '',
  },
  {
    color: '#060010',
    title: 'Collaboration',
    description: 'Work together seamlessly',
    label: 'Teamwork',
    categories: ['all'],
    links: null,
    stack: '',
  },
  {
    color: '#060010',
    title: 'Automation',
    description: 'Streamline workflows',
    label: 'Efficiency',
    categories: ['all'],
    links: null,
    stack: '',
  },
  {
    color: '#060010',
    title: 'Integration',
    description: 'Connect favorite tools',
    label: 'Connectivity',
    categories: ['all'],
    links: null,
    stack: '',
  },
  {
    color: '#060010',
    title: 'Security',
    description: 'Enterprise-grade protection',
    label: 'Protection',
    categories: ['all'],
    links: null,
    stack: '',
  },
];

const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {
  const size = 4.2 + Math.random() * 3.2;
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,0.96) 0%, rgba(${color}, 1) 46%, rgba(${color}, 0.72) 100%);
    box-shadow: 0 0 16px rgba(${color}, 0.95), 0 0 26px rgba(${color}, 0.65);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75,
});

const updateCardGlowProperties = (card, mouseX, mouseY, glow, radius) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

const ParticleCard = ({
  children,
  className = '',
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false,
  dataCategories = '',
}) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef([]);
  const particlesInitialized = useRef(false);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current || particleCount <= 0) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.25,
        ease: 'back.in(1.7)',
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        },
      });
    });

    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current || particleCount <= 0) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true);
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.2, ease: 'back.out(2)' });

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 155,
          y: (Math.random() - 0.5) * 155,
          rotation: Math.random() * 360,
          duration: 1.1 + Math.random() * 1.1,
          ease: 'none',
          repeat: -1,
          yoyo: true,
        });

        gsap.to(clone, {
          opacity: 0.62,
          duration: 0.82,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true,
        });
      }, index * 38);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles, particleCount]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseMove = (e) => {
      if (!enableTilt && !enableMagnetism) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.12,
          ease: 'power2.out',
          transformPerspective: 1000,
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05;
        const magnetY = (y - centerY) * 0.05;

        gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const handleClick = (e) => {
      if (!clickEffect) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.35) 0%, rgba(${glowColor}, 0.12) 35%, transparent 72%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 20;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        {
          scale: 1,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          onComplete: () => ripple.remove(),
        }
      );
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('click', handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('click', handleClick);
      clearAllParticles();
    };
  }, [
    animateParticles,
    clearAllParticles,
    disableAnimations,
    enableTilt,
    enableMagnetism,
    clickEffect,
    glowColor,
  ]);

  return (
    <article
      ref={cardRef}
      className={`${className} particle-container`.trim()}
      style={{ ...style, position: 'relative', overflow: 'hidden' }}
      data-categories={dataCategories}
    >
      {children}
    </article>
  );
};

const GlobalSpotlight = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR,
}) => {
  const spotlightRef = useRef(null);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const spotlight = document.createElement('div');
    spotlight.className = 'global-spotlight';
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.14) 0%,
        rgba(${glowColor}, 0.08) 15%,
        rgba(${glowColor}, 0.03) 35%,
        transparent 70%
      );
      z-index: 140;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;

    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e) => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section = gridRef.current.closest('.bento-section');
      const rect = section?.getBoundingClientRect();
      const mouseInside =
        rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

      const cards = gridRef.current.querySelectorAll('.magic-bento-card');

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out',
        });

        cards.forEach((card) => {
          card.style.setProperty('--glow-intensity', '0');
        });
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        updateCardGlowProperties(card, e.clientX, e.clientY, glowIntensity, spotlightRadius);
      });

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });

      const targetOpacity =
        minDistance <= proximity
          ? 0.78
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.78
            : 0;

      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gridRef.current?.querySelectorAll('.magic-bento-card').forEach((card) => {
        card.style.setProperty('--glow-intensity', '0');
      });

      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

const toCardItems = (projects) => {
  if (!projects || projects.length === 0) return fallbackCards;

  return projects.map((project) => ({
    color: '#060010',
    title: project.title,
    description: project.description,
    label: project.tags?.[0] || 'Project',
    categories: project.categories || ['all'],
    links: project.links,
    stack: project.stack,
  }));
};

const MagicBento = ({
  projects = [],
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = false,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true,
}) => {
  const gridRef = useRef(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;
  const cards = toCardItems(projects);

  return (
    <>
      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <div className="projects-grid card-grid bento-section magic-bento-grid" ref={gridRef}>
        {cards.map((card, index) => {
          const baseClassName = [
            'card',
            'project-card',
            'magic-bento-card',
            textAutoHide ? 'magic-bento-card--text-autohide' : '',
            enableBorderGlow ? 'magic-bento-card--border-glow' : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <ParticleCard
              key={`${card.title}-${index}`}
              className={baseClassName}
              style={{
                backgroundColor: card.color,
                '--glow-color-rgb': glowColor,
              }}
              disableAnimations={shouldDisableAnimations}
              particleCount={enableStars ? particleCount : 0}
              glowColor={glowColor}
              enableTilt={enableTilt}
              clickEffect={clickEffect}
              enableMagnetism={enableMagnetism}
              dataCategories={card.categories.join(' ')}
            >
              <div className="magic-bento-card__header">
                <div className="magic-bento-card__label">{card.label}</div>
              </div>

              <div className="magic-bento-card__content">
                <h3 className="magic-bento-card__title">{card.title}</h3>
                <p className="stack">{card.stack}</p>
                <p className="magic-bento-card__description">{card.description}</p>
                {card.links ? (
                  <div className="project-links">
                    <a href={card.links.live} target="_blank" rel="noreferrer">
                      Live
                    </a>
                    <a href={card.links.code} target="_blank" rel="noreferrer">
                      Code
                    </a>
                  </div>
                ) : null}
              </div>
            </ParticleCard>
          );
        })}
      </div>
    </>
  );
};

export default MagicBento;
