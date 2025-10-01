import { useRef, useEffect, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import '../BentoGrid.css';
import ProjectModal from './Modal';

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '132, 0, 255';
const MOBILE_BREAKPOINT = 768;

// example card data with a multi-entry web development "list" card
const cardData = [
  {
    color: '#060010',
    title: 'Data Engineering',
    description: 'Build and manage SQL Server data pipelines for reporting',
    fullDescription: 'Comprehensive data engineering solutions using Microsoft SQL Server, focusing on ETL pipeline development, data warehousing, and business intelligence reporting. This includes designing scalable data architectures, implementing automated data processing workflows, and creating robust monitoring systems for enterprise-level data operations.',
    label: 'MS SQL ETL Pipelines',
    category: 'data',
    viewType: 'list',
    githubUrl: 'https://github.com/yourusername/data-engineering-projects',
    liveUrl: 'https://your-demo-site.com',
    techStack: ['SQL Server', 'SSIS', 'Power BI', 'Azure Data Factory', 'T-SQL', 'Python'],
    features: [
      'Automated ETL pipeline creation and management',
      'Real-time data processing and transformation',
      'Comprehensive data validation and error handling',
      'Performance optimization and monitoring',
      'Integration with cloud and on-premises systems'
    ],
    status: 'Active Development',
    timeline: '2022 - Present'
  },
  {
    color: '#060010',
    title: 'Automation',
    description: 'Automated SQL Server restores from blob storage + other sources',
    fullDescription: 'Enterprise-grade automation pipeline for SQL Server database restores, designed to integrate seamlessly with Azure services and third-party providers. Currently in active production use.',
    label: 'Database Restore',
    category: 'automation',
    viewType: 'individual',
    githubUrl: 'https://github.com/flamespinner/sql-restore-automation',
    //liveUrl: 'https://your-automation-demo.com',
    techStack: ['PowerShell', 'Azure Blob Storage', 'SQL Server', 'Azure Functions', 'C# & REST APIs', 'SMTP', 'MSGraph'],
    features: [
      'Automated restore workflow: Detects .bak file placement in Azure Blob Storage.',
      'Event-driven architecture: Azure Event Grid triggers the workflow automatically.',
      'Webhook integration: Receives file name to import server for processing.',
      'End-to-end restore: Downloads .bak, restores to SQL Server, edits permissions and deletes the local blob post-restore.',
      'Operational visibility: Sends confirmation emails upon completion.',
      'Error recovery: Built-in exception handling and retry logic.',
      'Hybrid deployment: Integrates with both Azure cloud and on-premises SQL infrastructure.',
    ],
    status: 'Active Production',
    timeline: '2025'
  },
  {
    color: '#060010',
    title: 'Game Development',
    description: 'Lua/JS resources for multiplayer roleplay servers',
    fullDescription: 'Custom game development resources for RedM and FiveM multiplayer roleplay servers. Creating immersive gameplay experiences with custom scripts, UI systems, and server-side logic that enhance player engagement and server functionality.',
    label: 'RedM/FiveM Resources',
    category: 'game',
    viewType: 'list',
    githubUrl: 'https://github.com/yourusername/fivem-resources',
    liveUrl: 'https://your-gaming-demo.com',
    techStack: ['Lua', 'JavaScript', 'HTML/CSS', 'FiveM API', 'RedM API', 'MySQL'],
    features: [
      'Custom roleplay systems and mechanics',
      'Advanced UI/UX design for gaming interfaces',
      'Server-side scripting and optimization',
      'Database integration for player data',
      'Real-time multiplayer synchronization'
    ],
    status: 'Active Development',
    timeline: '2020 - Present'
  },
  {
    color: '#060010',
    title: 'Bot Development',
    description: 'Custom Discord and Twitch bot with chat commands and integrations',
    fullDescription: 'A versatile all-in-one Twitch and Discord bot designed to streamline streaming workflows, enhance community interaction, and bring immersive effects to live streams',
    label: 'CampFire Twitch Bot',
    category: 'bot',
    viewType: 'individual',
    githubUrl: 'https://github.com/flamespinner/CampFireBot',
    techStack: ['Node.js', 'Discord.js', 'tmi.js', 'twurple.js', 'WebSocket APIs (Pubsub, Philips Hue API, Tiltify)', 'OBS WebSocket', 'MongoDB'],
    features: [
      'Works as both a Twitch chatbot and Discord bot.',
      'Integrates with Philips Hue smart lights for dynamic lighting effects triggered by follows, subs, raids, and more.',
      'Provides on-screen alerts and real-time stream effects.',
      'Logs Twitch events directly into Discord for moderator visibility.',
      'Includes interactive chat commands to engage viewers and add fun features.',
    ],
    status: 'Rebuild Planned',
    timeline: '2021 - 2022(v1) (Pending Rebuild)'
  },
  {
    color: '#060010',
    title: 'Robotics',
    description: 'FIRST Robotics, wearable electronics, Star Wars droid builds and more',
    fullDescription: 'Diverse robotics projects spanning competitive robotics, wearable electronics, and Star Wars droid builds. Combining mechanical engineering, electronics, and programming to create innovative robotic solutions and interactive experiences.',
    label: 'Robotics & Embedded',
    category: 'robotics',
    viewType: 'individual',
    githubUrl: 'https://github.com/yourusername/robotics-projects',
    liveUrl: 'https://your-robotics-demo.com',
    techStack: ['C++', 'Arduino', 'Raspberry Pi', 'Python', 'CAD Design', '3D Printing'],
    features: [
      'FIRST Robotics Competition participation',
      'Custom wearable electronics and sensors',
      'Star Wars droid replica builds with full functionality',
      'Embedded systems programming and optimization',
      '3D modeling and rapid prototyping'
    ],
    status: 'Ongoing Projects',
    timeline: '2018 - Present'
  },
  {
    color: '#060010',
    title: 'Cloud Automation',
    description: 'PowerShell automation for Azure, SQL, and system tasks',
    fullDescription: 'Comprehensive cloud automation solutions using PowerShell for Azure infrastructure management, SQL Server administration, and system automation tasks. Designed for enterprise-scale operations with focus on reliability and efficiency.',
    label: 'Infrastructure & Automation',
    category: 'cloud',
    viewType: 'individual',
    githubUrl: 'https://github.com/yourusername/cloud-automation',
    liveUrl: 'https://your-cloud-demo.com',
    techStack: ['PowerShell', 'Azure CLI', 'ARM Templates', 'Azure DevOps', 'SQL Server', 'PowerShell DSC'],
    features: [
      'Automated Azure resource provisioning and management',
      'SQL Server configuration and maintenance automation',
      'Infrastructure as Code (IaC) implementation',
      'CI/CD pipeline integration',
      'Comprehensive monitoring and alerting'
    ],
    status: 'Production Ready',
    timeline: '2020 - 2023'
  },
  {
    viewType: 'list',
    title: 'Web Development',
    label: 'React • Next.js • Tailwind',
    description: 'Modern responsive websites, React apps, and Jamstack deployments',
    category: 'web',
    color: '#060010',
    items: [
      {
        title: 'Portfolio (2025)',
        description: 'Modern React portfolio showcasing projects, skills, and professional experience with smooth animations.',
        category: 'web',
        githubUrl: 'https://github.com/flamespinner/Portfolio',
        liveUrl: 'https://michaelwilke.com',
        techStack: ['React', 'Framer Motion', 'CSS Grid', 'JavaScript'],
        features: ['Responsive design', 'Dark mode', 'Animated cards', 'Project showcase'],
        status: 'Active Production',
        timeline: '2025',
        fullDescription: 'A full-stack personal portfolio website featuring an interactive project gallery, animated UI elements, and responsive design. Built with React and Framer Motion for smooth page transitions and engaging user interactions.'
      },
      {
        title: 'Calico County RP',
        description: 'Community website for a Red Dead Redemption 2 roleplay server with player information and resources.',
        category: 'web',
        githubUrl: 'https://github.com/flamespinner/calicoweb-v2',
        liveUrl: 'https://calicocountyrp.com',
        techStack: ['Next.js', 'React', 'Vercel', 'JavaScript'],
        features: ['SEO optimized', 'Server information', 'Community resources', 'Responsive layout'],
        status: 'Active Production',
        timeline: '2020–Present',
        fullDescription: 'Official website for Calico County Roleplay, a RedM roleplay community. Features server rules, application system, community announcements, and player resources. Built with Next.js for optimal performance and SEO.'
      },
      {
        title: 'Calico Core',
        description: 'Documentation and resource hub for Calico County RP server administrators and developers.',
        category: 'web',
        liveUrl: 'https://core.calicocountyrp.com',
        techStack: ['Gatsby', 'React', 'Netlify', 'Markdown'],
        features: ['Technical documentation', 'API reference', 'Developer guides', 'Search functionality'],
        status: 'Active Production',
        timeline: '2020–Present',
        fullDescription: 'Internal documentation platform for Calico County RP development team. Provides comprehensive guides, API documentation, and technical resources for server administrators and plugin developers.'
      },
      {
        title: 'Portfolio (2024)',
        description: 'Previous iteration of personal portfolio site hosted on GitHub Pages.',
        category: 'web',
        githubUrl: 'https://github.com/flamespinner/michaelwilke.github.io',
        liveUrl: undefined,
        techStack: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
        features: ['Static hosting', 'Responsive design', 'Project gallery', 'Contact form'],
        status: 'Archive',
        timeline: '2023–2025',
        fullDescription: 'Earlier version of personal portfolio website built with vanilla web technologies and hosted on GitHub Pages. Served as the primary professional web presence before the 2025 React-based redesign.'
      },
      {
        title: 'FRC Team 3926',
        description: 'Team website for FIRST Robotics Competition Team 3926, featuring team information and robot showcases.',
        category: 'web',
        techStack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
        githubUrl: 'https://github.com/mparobotics/Website',
        features: ['Team roster', 'Robot galleries', 'Competition results', 'Sponsor information'],
        status: 'Archive',
        timeline: '2015–2018',
        fullDescription: 'Official website for FIRST Robotics Competition Team 3926 (MPark Robotics). Showcased team achievements, robot designs, competition history, and provided information for sponsors and community members.'
      },
      {
        title: 'EnArch Technologies',
        description: 'Corporate website for EnArch Technologies showcasing services and company information.',
        category: 'web',
        githubUrl: "https://github.com/flamespinner/EnArchTechnologies",
        techStack: ['HTML', 'CSS', 'JavaScript', 'PHP'],
        features: ['Multi-language support', 'Service pages', 'Contact forms', 'Company portfolio'],
        status: 'Archive',
        timeline: '2013–2014',
        fullDescription: 'Company website for EnArch Technologies featuring service offerings, project portfolio, and contact information. Included planned multi-language support for Spanish, Russian, and Mandarin. Open-source project demonstrating early web development work.'
      },
      {
        title: 'Flamespinner Productions',
        description: 'Official website for Flamespinner Productions, a digital content creation and media company.',
        category: 'web',
        githubUrl: "https://github.com/flamespinner/Flamespinner-Productions-Website",
        techStack: ['HTML', 'CSS', 'JavaScript', 'jQuery'],
        features: ['Project showcase', 'Media gallery', 'About section', 'Contact information'],
        status: 'Archive',
        timeline: '2016–2018',
        fullDescription: 'Corporate website for Flamespinner Productions showcasing digital media projects, production services, and company portfolio. Repository was archived in 2018 as the company transitioned its online presence.'
      },
    ]
  }
];

const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = radius => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75
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
  onCardClick = null
}) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();

    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        }
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true);
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: 'none',
          repeat: -1,
          yoyo: true
        });

        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true
        });
      }, index * 100);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleMouseMove = e => {
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
          duration: 0.1,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05;
        const magnetY = (y - centerY) * 0.05;

        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleClick = e => {
      // Call the card click handler if provided
      if (onCardClick) {
        onCardClick();
        return;
      }

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
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        {
          scale: 0,
          opacity: 1
        },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => ripple.remove()
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
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor, onCardClick]);

  return (
    <div
      ref={cardRef}
      className={`${className} particle-container`}
      style={{ ...style, position: 'relative', overflow: 'hidden' }}
    >
      {children}
    </div>
  );
};

const GlobalSpotlight = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR
}) => {
  const spotlightRef = useRef(null);
  const isInsideSection = useRef(false);

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
        rgba(${glowColor}, 0.15) 0%,
        rgba(${glowColor}, 0.08) 15%,
        rgba(${glowColor}, 0.04) 25%,
        rgba(${glowColor}, 0.02) 40%,
        rgba(${glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = e => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section = gridRef.current.closest('.bento-section');
      const rect = section?.getBoundingClientRect();
      const mouseInside =
        rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

      isInsideSection.current = mouseInside || false;
      const cards = gridRef.current.querySelectorAll('.card');

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
        cards.forEach(card => {
          card.style.setProperty('--glow-intensity', '0');
        });
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cards.forEach(card => {
        const cardElement = card;
        const cardRect = cardElement.getBoundingClientRect();
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

        updateCardGlowProperties(cardElement, e.clientX, e.clientY, glowIntensity, spotlightRadius);
      });

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });

      const targetOpacity =
        minDistance <= proximity
          ? 0.8
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
            : 0;

      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      isInsideSection.current = false;
      gridRef.current?.querySelectorAll('.card').forEach(card => {
        card.style.setProperty('--glow-intensity', '0');
      });
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
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

const BentoCardGrid = ({ children, gridRef }) => (
  <div className="card-grid bento-section" ref={gridRef}>
    {children}
  </div>
);

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

const MagicBento = ({
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
  enableMagnetism = true
}) => {
  const gridRef = useRef(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;
  
  // Modal state management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedListItems, setSelectedListItems] = useState([]);

  const handleCardClick = (card) => {
    if (card.viewType === 'individual') {
      setSelectedProject(card);
      setSelectedCategory(null);
      setSelectedListItems([]);
      setIsModalOpen(true);
    } else if (card.viewType === 'list') {
      // prefer an explicit items array on the card; otherwise fall back to filtering by category
      const items = Array.isArray(card.items) && card.items.length ? card.items : cardData.filter(c => c.category === card.category);
      setSelectedListItems(items);
      setSelectedCategory(card.category || null);
      setSelectedProject(null);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setSelectedCategory(null);
    setSelectedListItems([]);
  };

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

      <BentoCardGrid gridRef={gridRef}>
        {cardData.map((card, index) => {
          const baseClassName = `card ${textAutoHide ? 'card--text-autohide' : ''} ${enableBorderGlow ? 'card--border-glow' : ''}`;
          const cardProps = {
            className: baseClassName,
            style: {
              backgroundColor: card.color,
              '--glow-color': glowColor
            }
          };

          if (enableStars) {
            return (
              <ParticleCard
                key={index}
                {...cardProps}
                disableAnimations={shouldDisableAnimations}
                particleCount={particleCount}
                glowColor={glowColor}
                enableTilt={enableTilt}
                clickEffect={clickEffect}
                enableMagnetism={enableMagnetism}
                onCardClick={() => handleCardClick(card)}
              >
                <div className="card__header">
                  <div className="card__label">{card.label}</div>
                </div>
                <div className="card__content">
                  <h2 className="card__title">{card.title}</h2>
                  <p className="card__description">{card.description}</p>
                </div>
              </ParticleCard>
            );
          }

          return (
            <div
              key={index}
              {...cardProps}
              ref={el => {
                if (!el) return;

                const handleMouseMove = e => {
                  if (shouldDisableAnimations) return;

                  const rect = el.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;

                  if (enableTilt) {
                    const rotateX = ((y - centerY) / centerY) * -10;
                    const rotateY = ((x - centerX) / centerX) * 10;
                    gsap.to(el, {
                      rotateX,
                      rotateY,
                      duration: 0.1,
                      ease: 'power2.out',
                      transformPerspective: 1000
                    });
                  }

                  if (enableMagnetism) {
                    const magnetX = (x - centerX) * 0.05;
                    const magnetY = (y - centerY) * 0.05;
                    gsap.to(el, {
                      x: magnetX,
                      y: magnetY,
                      duration: 0.3,
                      ease: 'power2.out'
                    });
                  }
                };

                const handleMouseLeave = () => {
                  if (shouldDisableAnimations) return;

                  if (enableTilt) {
                    gsap.to(el, {
                      rotateX: 0,
                      rotateY: 0,
                      duration: 0.3,
                      ease: 'power2.out'
                    });
                  }

                  if (enableMagnetism) {
                    gsap.to(el, {
                      x: 0,
                      y: 0,
                      duration: 0.3,
                      ease: 'power2.out'
                    });
                  }
                };

                const handleClick = e => {
                  // Call the modal handler first
                  handleCardClick(card);
                  
                  if (!clickEffect || shouldDisableAnimations) return;

                  const rect = el.getBoundingClientRect();
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
                    background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
                    left: ${x - maxDistance}px;
                    top: ${y - maxDistance}px;
                    pointer-events: none;
                    z-index: 1000;
                  `;

                  el.appendChild(ripple);

                  gsap.fromTo(
                    ripple,
                    {
                      scale: 0,
                      opacity: 1
                    },
                    {
                      scale: 1,
                      opacity: 0,
                      duration: 0.8,
                      ease: 'power2.out',
                      onComplete: () => ripple.remove()
                    }
                  );
                };

                el.addEventListener('mousemove', handleMouseMove);
                el.addEventListener('mouseleave', handleMouseLeave);
                el.addEventListener('click', handleClick);
              }}
            >
              <div className="card__header">
                <div className="card__label">{card.label}</div>
              </div>
              <div className="card__content">
                <h2 className="card__title">{card.title}</h2>
                <p className="card__description">{card.description}</p>
              </div>
            </div>
          );
        })}
      </BentoCardGrid>
      
      {isModalOpen && selectedProject && (
        <ProjectModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          project={selectedProject}
        />
      )}

      {isModalOpen && (selectedCategory || selectedListItems.length) && (
        <ProjectModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          category={selectedCategory}
          items={selectedListItems}
          onOpenProject={(item) => {
            // switch modal to individual project view
            setSelectedProject(item);
            setSelectedCategory(null);
            setSelectedListItems([]);
          }}
        />
      )}
    </>
  );
};

export default MagicBento;

