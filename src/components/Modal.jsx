import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaLock, FaChartBar, FaCog, FaGamepad, FaRobot, FaCloud, FaGlobe, FaFolderOpen } from 'react-icons/fa';

const categoryIcons = {
  data: <FaChartBar />,
  automation: <FaCog />,
  game: <FaGamepad />,
  bot: <FaRobot />,
  bots: <FaRobot />,
  cloud: <FaCloud />,
  web: <FaGlobe />
};

const getProjectIcon = (category) => categoryIcons[category] || <FaFolderOpen />;

const statusColors = (status = '') => {
  if (/archive/i.test(status)) return { background: 'rgba(148,163,184,0.12)', color: '#94a3b8', border: '1px solid rgba(148,163,184,0.3)' };
  if (/rebuild|planned|wip/i.test(status)) return { background: 'rgba(245,158,11,0.15)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.35)' };
  return { background: 'rgba(34,197,94,0.15)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.35)' };
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', damping: 25, stiffness: 300 }
  },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.18 } }
};

const ProjectModal = ({ isOpen, onClose, project = null }) => {
  const [lightbox, setLightbox] = useState(null); // screenshot index or null
  const lightboxRef = useRef(null);
  lightboxRef.current = lightbox;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      const shots = project?.screenshots || [];
      if (e.key === 'Escape') {
        if (lightboxRef.current !== null) setLightbox(null);
        else onClose();
      }
      if (lightboxRef.current !== null && shots.length > 1) {
        if (e.key === 'ArrowRight') setLightbox((i) => (i + 1) % shots.length);
        if (e.key === 'ArrowLeft') setLightbox((i) => (i - 1 + shots.length) % shots.length);
      }
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow || 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="modal-backdrop"
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20
          }}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg,#161311,#262220)',
              border: '1px solid rgba(251,146,60,0.18)',
              borderRadius: 16,
              padding: 28,
              maxWidth: 760,
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              position: 'relative',
              color: '#fff',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)'
            }}
          >
            <button
              onClick={onClose}
              aria-label="Close modal"
              title="Close (Esc)"
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                background: 'rgba(255,255,255,0.06)',
                border: 'none',
                borderRadius: '50%',
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              <FaTimes />
            </button>

            {/* Header */}
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 18, paddingRight: 48 }}>
              <div style={{
                width: 52, height: 52, borderRadius: 12, display: 'flex', flex: '0 0 52px',
                alignItems: 'center', justifyContent: 'center', background: 'rgba(251,146,60,0.1)',
                color: '#fb923c', fontSize: 22
              }}>
                {getProjectIcon(project.category)}
              </div>
              <div style={{ minWidth: 0 }}>
                <h2 style={{ margin: 0, fontSize: '1.5rem', lineHeight: 1.2 }}>{project.title}</h2>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 6, flexWrap: 'wrap' }}>
                  {project.label && <span style={{ color: '#fb923c', fontWeight: 600, fontSize: '0.85rem' }}>{project.label}</span>}
                  {project.status && (
                    <span style={{ ...statusColors(project.status), fontSize: '0.7rem', padding: '3px 10px', borderRadius: 999 }}>
                      {project.status}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <p style={{ color: '#d6d3d1', lineHeight: 1.6, margin: '0 0 20px' }}>
              {project.fullDescription || project.description || ''}
            </p>

            {project.screenshots && project.screenshots.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <h4 style={{ margin: '0 0 10px', color: '#a8a29e', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Screenshots</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
                  {project.screenshots.map((shot, idx) => (
                    <img
                      key={shot.src}
                      src={shot.src}
                      alt={shot.caption || project.title}
                      loading="lazy"
                      onClick={() => setLightbox(idx)}
                      style={{
                        width: '100%', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
                        display: 'block', cursor: 'zoom-in', transition: 'border-color 0.25s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(251,146,60,0.5)'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  ))}
                </div>
              </div>
            )}

            {project.techStack && (
              <div style={{ marginBottom: 20 }}>
                <h4 style={{ margin: '0 0 10px', color: '#a8a29e', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Tech stack</h4>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {project.techStack.map((t) => (
                    <span key={t} style={{
                      background: 'rgba(251,146,60,0.08)',
                      color: '#fdba74',
                      padding: '5px 12px',
                      borderRadius: 999,
                      fontSize: 13,
                      border: '1px solid rgba(251,146,60,0.15)'
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            )}

            {project.features && (
              <div style={{ marginBottom: 20 }}>
                <h4 style={{ margin: '0 0 10px', color: '#a8a29e', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Key features</h4>
                <ul style={{ margin: 0, paddingLeft: 18, color: '#d6d3d1' }}>
                  {project.features.map((f, i) => <li key={i} style={{ marginBottom: 6, lineHeight: 1.45 }}>{f}</li>)}
                </ul>
              </div>
            )}

            {/* Footer: timeline + actions */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 16,
              flexWrap: 'wrap',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              paddingTop: 18
            }}>
              <span style={{ color: '#a8a29e', fontSize: '0.85rem' }}>
                {project.timeline}
              </span>

              <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      padding: '10px 16px', borderRadius: 10, background: 'linear-gradient(135deg,#24292e,#1a1e22)',
                      color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem'
                    }}
                  >
                    <FaGithub size={16} /> View Code
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      padding: '10px 16px', borderRadius: 10,
                      background: 'linear-gradient(135deg,#fb923c,#ea580c)', color: '#1c1210', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem'
                    }}
                  >
                    <FaExternalLinkAlt size={14} /> {project.authRequired ? 'Live Site (login gated)' : 'Live Site'}
                  </a>
                )}
                {!project.githubUrl && !project.liveUrl && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#78716c', fontSize: '0.85rem' }}>
                    <FaLock size={12} /> Internal project — happy to talk through it
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Screenshot lightbox */}
          {lightbox !== null && project.screenshots?.[lightbox] && (
            <div
              onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
              style={{
                position: 'fixed', inset: 0, zIndex: 10000,
                background: 'rgba(0,0,0,0.88)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: 24, cursor: 'zoom-out'
              }}
            >
              <img
                src={project.screenshots[lightbox].src}
                alt={project.screenshots[lightbox].caption || project.title}
                onClick={(e) => e.stopPropagation()}
                style={{
                  maxWidth: '92vw', maxHeight: '82vh', borderRadius: 10,
                  border: '1px solid rgba(251,146,60,0.3)', cursor: 'default',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.7)'
                }}
              />
              <div style={{ marginTop: 14, color: '#d6d3d1', fontSize: '0.9rem', display: 'flex', gap: 16, alignItems: 'center' }}>
                {project.screenshots.length > 1 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + project.screenshots.length) % project.screenshots.length); }}
                    aria-label="Previous screenshot"
                    style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 8, color: '#fff', padding: '6px 14px', cursor: 'pointer', fontSize: '1rem' }}
                  >‹</button>
                )}
                <span>
                  {project.screenshots[lightbox].caption}
                  {project.screenshots.length > 1 && (
                    <span style={{ color: '#78716c' }}> · {lightbox + 1}/{project.screenshots.length}</span>
                  )}
                </span>
                {project.screenshots.length > 1 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % project.screenshots.length); }}
                    aria-label="Next screenshot"
                    style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 8, color: '#fff', padding: '6px 14px', cursor: 'pointer', fontSize: '1rem' }}
                  >›</button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
