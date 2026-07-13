import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaLock } from 'react-icons/fa';
import ParticleCard from './ParticleCard';
import ProjectModal from './Modal';
import '../ProjectGrid.css';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'data', label: 'Data' },
  { id: 'web', label: 'Web' },
  { id: 'game', label: 'Game Dev' },
  { id: 'bots', label: 'Bots' },
  { id: 'automation', label: 'Automation' },
  { id: 'robotics', label: 'Robotics' },
  { id: 'calico', label: 'Calico County' },
  { id: 'archive', label: 'Archive' },
];

const projects = [
  {
    title: 'Calico Core — Player Platform',
    label: 'Featured',
    featured: true,
    stat: '600+ registered players',
    tags: ['web', 'calico'],
    description: 'Full-stack player hub for Calico County RP: Discord OAuth, real-time character rosters, and admin tooling for community management.',
    fullDescription: 'A full-stack web application serving 600+ registered players in a 300+ member community, with Discord OAuth, real-time character management, and administrative tools to aid in management and configuration of the county.',
    liveUrl: 'https://core.calicocountyrp.com',
    authRequired: true,
    screenshots: [
      { src: '/screens/core-properties.png', caption: 'Real estate office' },
      { src: '/screens/core-character.png', caption: 'Character stables' },
      { src: '/screens/core-admin.png', caption: 'Admin dashboard' },
    ],
    techStack: ['React', 'Node.js', 'Discord API', 'MariaDB'],
    features: ['Seamless Discord authentication', 'Real-time character roster management', 'Admin dashboard for community moderation', 'Player system tools'],
    status: 'Active Production',
    timeline: '2022–Present',
  },
  {
    title: 'SQL Restore Automation',
    label: 'Automation',
    tags: ['automation', 'data'],
    description: 'Event-driven Azure pipeline that restores SQL Server databases from blob storage. Zero-touch, running in production.',
    fullDescription: 'Enterprise-grade automation pipeline for SQL Server database restores, designed to integrate seamlessly with Azure services and third-party providers. Currently in active production use.',
    githubUrl: 'https://github.com/flamespinner/sql-restore-automation',
    techStack: ['PowerShell', 'Azure Blob Storage', 'SQL Server', 'Azure Functions', 'Event Grid', 'MSGraph'],
    features: [
      'Detects .bak file placement in Azure Blob Storage',
      'Azure Event Grid triggers the workflow automatically',
      'End-to-end restore with permission fixes and cleanup',
      'Confirmation emails on completion',
      'Built-in exception handling and retry logic',
      'Hybrid: Azure cloud + on-premises SQL infrastructure',
    ],
    status: 'Active Production',
    timeline: '2025',
  },
  {
    title: 'AION Reporting Suite',
    label: 'Data Engineering',
    tags: ['data'],
    description: 'SQL Server ETL pipelines, Power BI dashboards, and automated reporting for 600+ users across 70+ properties.',
    fullDescription: 'Enterprise reporting stack built and maintained at AION Management: SQL Server ETL pipelines, Power BI / Fabric dashboards, and Python-driven automation delivering real-time operational visibility to leadership across a national property management portfolio.',
    techStack: ['SQL Server', 'T-SQL', 'Power BI / Fabric', 'Python', 'Azure'],
    features: [
      'Automated ETL pipeline creation and management',
      'Legacy Excel reports converted to live Power BI dashboards',
      'Data validation and error handling',
      'Serverless Azure migration in progress',
    ],
    status: 'Active Production',
    timeline: '2023–Present',
  },
  {
    title: 'Calico County RedM Resources',
    label: 'Game Development',
    tags: ['game', 'calico'],
    description: 'Custom Lua gameplay systems and Vue NUI interfaces for a Red Dead Redemption 2 roleplay server.',
    fullDescription: 'Custom game development resources for the Calico County RedM server: gameplay systems and mechanics in Lua, player-facing NUI interfaces in Vue, and MariaDB-backed persistence — built and maintained as lead developer.',
    liveUrl: 'https://calicocountyrp.com',
    techStack: ['Lua', 'Vue', 'JavaScript', 'RedM API', 'MariaDB'],
    features: [
      'Custom roleplay systems and mechanics',
      'Vue-based NUI interface design',
      'Server-side scripting and optimization',
      'Database-backed player data',
    ],
    status: 'Active Development',
    timeline: '2022–Present',
  },
  {
    title: 'Calico County RP Website',
    label: 'Web',
    tags: ['web', 'calico'],
    description: 'Community website with server rules, applications, and player resources. SEO-optimized Next.js.',
    fullDescription: 'Official website for Calico County Roleplay. Features server rules, application system, community announcements, and player resources. Built with Next.js for performance and SEO.',
    githubUrl: 'https://github.com/flamespinner/calicoweb-v2',
    liveUrl: 'https://calicocountyrp.com',
    techStack: ['Next.js', 'React', 'Vercel', 'JavaScript'],
    features: ['SEO optimized', 'Server information', 'Community resources', 'Responsive layout'],
    status: 'Active Production',
    timeline: '2022–Present',
  },
  {
    title: 'Calico Ticket Bot',
    label: 'Bots',
    tags: ['bots', 'calico'],
    description: 'Discord support-ticket bot for Calico County: ticketing, logging, and staff tools.',
    fullDescription: 'Discord bot supporting Calico County RP community operations: support ticketing, event logging, and staff workflow tooling, backed by the community integration databases.',
    techStack: ['Node.js', 'Discord.js', 'PostgreSQL', 'MongoDB'],
    features: ['Support ticket workflows', 'Staff tooling and logging', 'Database-backed history'],
    status: 'Active Production',
    timeline: '2022–Present',
  },
  {
    title: 'CampFire Bot',
    label: 'Bots',
    tags: ['bots'],
    description: 'All-in-one Twitch + Discord bot: chat commands, stream alerts, and Philips Hue lighting effects.',
    fullDescription: 'A versatile all-in-one Twitch and Discord bot designed to streamline streaming workflows, enhance community interaction, and bring immersive effects to live streams.',
    githubUrl: 'https://github.com/flamespinner/CampFireBot',
    techStack: ['Node.js', 'Discord.js', 'tmi.js', 'twurple.js', 'OBS WebSocket', 'MongoDB'],
    features: [
      'Twitch chatbot + Discord bot in one',
      'Philips Hue lighting reacts to follows, subs, and raids',
      'On-screen alerts and stream effects',
      'Twitch event logging into Discord for moderators',
    ],
    status: 'Rebuild Planned',
    timeline: '2021–2022 (v1)',
  },
  {
    title: 'Infrastructure Automation',
    label: 'Cloud',
    tags: ['automation'],
    description: 'PowerShell automation for Azure resources, SQL Server administration, and endpoint fleet management.',
    fullDescription: 'Cloud and infrastructure automation using PowerShell: Azure resource provisioning, SQL Server administration, Intune/RMM endpoint deployment scripts, and CI/CD integration for enterprise-scale operations.',
    techStack: ['PowerShell', 'Azure CLI', 'Azure DevOps', 'Intune', 'Datto RMM'],
    features: [
      'Automated Azure resource provisioning',
      'SQL Server configuration and maintenance automation',
      'Fleet-wide software deployment scripts',
      'CI/CD pipeline integration',
    ],
    status: 'Active Production',
    timeline: '2020–Present',
  },
  {
    title: 'Robotics & Embedded',
    label: 'Robotics',
    tags: ['robotics'],
    description: 'FIRST Robotics, wearable electronics, and Star Wars droid builds.',
    fullDescription: 'Diverse robotics projects spanning competitive robotics, wearable electronics, and Star Wars droid builds. Combining mechanical engineering, electronics, and programming.',
    techStack: ['C++', 'Arduino', 'Raspberry Pi', 'Python', 'CAD', '3D Printing'],
    features: [
      'FIRST Robotics Competition participation',
      'Custom wearable electronics and sensors',
      'Star Wars droid replica builds',
      '3D modeling and rapid prototyping',
    ],
    status: 'Ongoing',
    timeline: '2018–Present',
  },
  {
    title: 'Portfolio (2025)',
    label: 'Web',
    tags: ['web'],
    description: 'This site. React + Vite with Framer Motion and GSAP, deployed via GitHub Actions.',
    fullDescription: 'A personal portfolio featuring an interactive project gallery, animated UI elements, and responsive design. Built with React and Framer Motion, deployed to a self-hosted server through a GitHub Actions CI/CD pipeline.',
    githubUrl: 'https://github.com/flamespinner/Portfolio',
    liveUrl: 'https://michaelwilke.com',
    techStack: ['React', 'Vite', 'Framer Motion', 'GSAP', 'Nginx'],
    features: ['Interactive project grid', 'Animated UI', 'CI/CD deploys', 'Self-hosted'],
    status: 'Active Production',
    timeline: '2025–Present',
  },
  {
    title: 'Portfolio (2024)',
    label: 'Web',
    tags: ['web', 'archive'],
    description: 'Previous portfolio iteration. Vanilla HTML/CSS/JS on GitHub Pages.',
    fullDescription: 'Earlier version of this portfolio built with vanilla web technologies and hosted on GitHub Pages. Primary professional web presence before the 2025 React redesign.',
    githubUrl: 'https://github.com/flamespinner/michaelwilke.github.io',
    liveUrl: 'http://v1.michaelwilke.com/',
    techStack: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
    features: ['Static hosting', 'Responsive design', 'Project gallery'],
    status: 'Archive',
    timeline: '2023–2025',
  },
  {
    title: 'FRC Team 3926 Website',
    label: 'Web',
    tags: ['web', 'robotics', 'archive'],
    description: 'Team website for FIRST Robotics Competition Team 3926.',
    fullDescription: 'Official website for FIRST Robotics Competition Team 3926 (MPark Robotics). Showcased team achievements, robot designs, competition history, and sponsor information.',
    githubUrl: 'https://github.com/mparobotics/Website',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    features: ['Team roster', 'Robot galleries', 'Competition results'],
    status: 'Archive',
    timeline: '2015–2018',
  },
  {
    title: 'EnArch Technologies',
    label: 'Web',
    tags: ['web', 'archive'],
    description: 'Corporate website for EnArch Technologies. Early web development work.',
    fullDescription: 'Company website for EnArch Technologies featuring service offerings, project portfolio, and contact information. Open-source project demonstrating early web development work.',
    githubUrl: 'https://github.com/flamespinner/EnArchTechnologies',
    liveUrl: 'http://et.michaelwilke.com/',
    techStack: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    features: ['Service pages', 'Contact forms', 'Company portfolio'],
    status: 'Archive',
    timeline: '2013–2014',
  },
  {
    title: 'Flamespinner Productions',
    label: 'Web',
    tags: ['web', 'archive'],
    description: 'Media company website with a project showcase and media gallery.',
    fullDescription: 'Corporate website for Flamespinner Productions showcasing digital media projects, production services, and company portfolio. Archived in 2018.',
    githubUrl: 'https://github.com/flamespinner/Flamespinner-Productions-Website',
    techStack: ['HTML', 'CSS', 'JavaScript', 'jQuery'],
    features: ['Project showcase', 'Media gallery', 'Contact information'],
    status: 'Archive',
    timeline: '2016–2018',
  },
];

const statusBadge = (status) => {
  if (/archive/i.test(status)) return 'pg-badge pg-badge--archive';
  if (/rebuild|planned|wip/i.test(status)) return 'pg-badge pg-badge--wip';
  return 'pg-badge pg-badge--live';
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
};

export default function ProjectGrid() {
  const [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get('filter');
  const filter = FILTERS.some((f) => f.id === param) ? param : 'all';
  const setFilter = (id) => setSearchParams(id === 'all' ? {} : { filter: id }, { replace: true });
  const [selected, setSelected] = useState(null);
  const isMobile = useIsMobile();

  const visible = projects.filter((p) => {
    const archived = p.tags.includes('archive');
    if (filter === 'all') return !archived;
    if (filter === 'archive') return archived;
    return p.tags.includes(filter) && !archived;
  });

  const stopLink = (e) => e.stopPropagation();

  return (
    <div className="pg-wrap">
      <div className="pg-filters">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            className={`pg-chip${filter === f.id ? ' pg-chip--active' : ''}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <motion.div layout className="pg-grid">
        {visible.map((p) => (
            <motion.div
              key={p.title}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut', layout: { duration: 0.35, ease: 'easeOut' } }}
              className={p.featured && filter === 'all' ? 'pg-cell pg-cell--featured' : 'pg-cell'}
            >
              <ParticleCard
                style={{ height: '100%' }}
                className={`pg-card${p.featured && filter === 'all' ? ' pg-card--featured' : ''}`}
                disableAnimations={isMobile}
                particleCount={8}
                glowColor="251, 146, 60"
                enableTilt={!p.featured}
                clickEffect={true}
                enableMagnetism={false}
                onCardClick={() => setSelected({ ...p, category: p.tags.includes('bots') ? 'bot' : p.tags[0] })}
              >
                <div className="pg-card__top">
                  <span className="pg-card__label">
                    {p.label}
                    {p.featured && filter === 'all' && p.stat && <span className="pg-featured-stat">{p.stat}</span>}
                  </span>
                  <span className={statusBadge(p.status)}>{p.status}</span>
                </div>
                <h3 className="pg-card__title">{p.title}</h3>
                <p className="pg-card__desc">{p.description}</p>
                <div className="pg-tags">
                  {p.techStack.slice(0, p.featured ? 8 : 4).map((t) => (
                    <span key={t} className="pg-tag">{t}</span>
                  ))}
                </div>
                <div className="pg-links">
                  {p.githubUrl && (
                    <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" onClick={stopLink}>
                      <FaGithub /> Code
                    </a>
                  )}
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" onClick={stopLink}>
                      <FaExternalLinkAlt /> Live
                    </a>
                  )}
                  {!p.githubUrl && !p.liveUrl && (
                    <span className="pg-private"><FaLock size={11} /> Internal project</span>
                  )}
                </div>
              </ParticleCard>
            </motion.div>
        ))}
      </motion.div>

      {visible.length === 0 && <p className="pg-empty">Nothing here yet.</p>}

      {selected && (
        <ProjectModal isOpen={true} onClose={() => setSelected(null)} project={selected} />
      )}
    </div>
  );
}
