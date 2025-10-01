import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';

const getProjectIcon = (category) => {
  const icons = {
    data: '📊',
    automation: '⚙️',
    game: '🎮',
    bot: '🤖',
    cloud: '☁️',
    web: '🌐'
  };
  return icons[category] || '📁';
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

const ProjectModal = ({ isOpen, onClose, project = null, category = null, items = [], onOpenProject }) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow || 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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
              background: 'linear-gradient(135deg,#151515,#252525)',
              border: '1px solid rgba(132,0,255,0.18)',
              borderRadius: 16,
              padding: 28,
              maxWidth: '1100px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              position: 'relative',
              color: '#fff',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)'
            }}
            layout
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

            {/* Use layout keyed container so switching from list -> individual animates */}
            <motion.div layout key={project ? `project-${project.title}` : `list-${category || 'items'}`}>
              {/* Individual project view */}
              {project && (
                <>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 18 }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: 12, display: 'flex',
                      alignItems: 'center', justifyContent: 'center', background: 'rgba(132,0,255,0.08)'
                    }}>
                      <span style={{ fontSize: 22 }}>{getProjectIcon(project.category)}</span>
                    </div>
                    <div>
                      <h2 style={{ margin: 0, fontSize: '1.6rem' }}>{project.title}</h2>
                      {project.label && <div style={{ color: '#8400ff', fontWeight: 600 }}>{project.label}</div>}
                    </div>
                  </div>

                  <p style={{ color: '#d0d0d0', lineHeight: 1.6, marginBottom: 18 }}>
                    {project.fullDescription || project.description || ''}
                  </p>

                  {project.techStack && (
                    <div style={{ marginBottom: 18, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <h3 style={{ margin: 0, marginBottom: 8, color: '#fff' }}>Tech Stack</h3>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                        {project.techStack.map((t, i) => (
                          <span key={i} style={{
                            background: 'rgba(132,0,255,0.08)',
                            color: '#b29bff',
                            padding: '6px 10px',
                            borderRadius: 14,
                            fontSize: 13,
                            border: '1px solid rgba(132,0,255,0.06)'
                          }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.features && (
                    <div style={{ marginBottom: 18 }}>
                      <h4 style={{ margin: '0 0 8px 0' }}>Key Features</h4>
                      <ul style={{ margin: 0, paddingLeft: 18, color: '#cfcfcf' }}>
                        {project.features.map((f, i) => <li key={i} style={{ marginBottom: 6 }}>{f}</li>)}
                      </ul>
                    </div>
                  )}

                  {/* Status / Timeline (side-by-side centered) */}
                  {(project.status || project.timeline) && (
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: 36,
                      alignItems: 'center',
                      padding: '12px 16px',
                      background: 'rgba(132,0,255,0.04)',
                      borderRadius: 8,
                      border: '1px solid rgba(132,0,255,0.06)',
                      marginBottom: 18
                    }}>
                      {project.status && (
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <strong style={{ color: '#bda2ff' }}>Status</strong>
                          <span style={{ color: '#d0d0d0' }}>{project.status}</span>
                        </div>
                      )}
                      {project.timeline && (
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <strong style={{ color: '#bda2ff' }}>Timeline</strong>
                          <span style={{ color: '#d0d0d0' }}>{project.timeline}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action buttons */}
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 8,
                          padding: '10px 16px', borderRadius: 10, background: 'linear-gradient(135deg,#24292e,#1a1e22)',
                          color: '#fff', textDecoration: 'none', fontWeight: 600
                        }}
                      >
                        <FaGithub size={18} /> View Code
                      </a>
                    ) : (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        background: 'rgba(255,255,255,0.02)',
                        color: '#bbb',
                        border: '1px solid rgba(255,255,255,0.03)',
                        fontWeight: 600
                      }}>
                        <FaGithub size={14} /> Private
                      </span>
                    )}

                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 8,
                          padding: '10px 16px', borderRadius: 10,
                          background: 'linear-gradient(135deg,#8400ff,#9333ea)', color: '#fff', textDecoration: 'none', fontWeight: 600
                        }}
                      >
                        <FaExternalLinkAlt size={16} /> Live Demo
                      </a>
                    ) : (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        background: 'rgba(255,255,255,0.02)',
                        color: '#bbb',
                        border: '1px solid rgba(255,255,255,0.03)',
                        fontWeight: 600
                      }}>
                        <FaExternalLinkAlt size={14} /> No Demo
                      </span>
                    )}

                    {/* Documentation link unchanged */}
                  </div>
                </>
              )}

              {/* Category / list view */}
              {category && (
                <>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 10, display: 'flex',
                      alignItems: 'center', justifyContent: 'center', background: 'rgba(132,0,255,0.06)'
                    }}>
                      <span style={{ fontSize: 20 }}>{getProjectIcon(category)}</span>
                    </div>
                    <div>
                      <h3 style={{ margin: 0 }}>{category.charAt(0).toUpperCase() + category.slice(1)} Projects</h3>
                      <div style={{ color: '#cfcfcf', fontSize: 13 }}>{items.length} item{items.length !== 1 ? 's' : ''}</div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gap: 12 }}>
                    {items && items.length ? items.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => onOpenProject && onOpenProject(item)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 14px',
                          background: 'rgba(255,255,255,0.02)',
                          borderRadius: 12,
                          border: '1px solid rgba(255,255,255,0.03)',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flex: 1, minWidth: 0 }}>
                          <div style={{
                            width: 44, height: 44, borderRadius: 8, display: 'flex', alignItems: 'center',
                            justifyContent: 'center', background: 'rgba(132,0,255,0.06)', flex: '0 0 44px'
                          }}>
                            <span>{getProjectIcon(item.category)}</span>
                          </div>
                          <div style={{ overflow: 'hidden', minWidth: 0 }}>
                            <div style={{ fontWeight: 700, textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {item.title}
                            </div>
                            <div style={{ color: '#cfcfcf', fontSize: 13, textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {item.description}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginLeft: 12 }}>
                          {/* shared button style */}
                          {item.githubUrl ? (
                            <a
                              href={item.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 8,
                                padding: '8px 12px',
                                borderRadius: 8,
                                background: 'linear-gradient(135deg,#24292e,#1a1e22)',
                                color: '#fff',
                                textDecoration: 'none',
                                fontWeight: 600,
                                minWidth: 72,
                                justifyContent: 'center'
                              }}
                            >
                              <FaGithub /> Code
                            </a>
                          ) : (
                            <div
                              role="button"
                              aria-disabled="true"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 8,
                                padding: '8px 12px',
                                borderRadius: 8,
                                background: 'rgba(255,255,255,0.02)',
                                color: '#bbb',
                                border: '1px solid rgba(255,255,255,0.03)',
                                fontWeight: 600,
                                minWidth: 72,
                                justifyContent: 'center',
                                cursor: 'not-allowed'
                              }}
                            >
                              <FaGithub /> Private
                            </div>
                          )}

                          {item.liveUrl ? (
                            <a
                              href={item.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 8,
                                padding: '8px 12px',
                                borderRadius: 8,
                                background: 'linear-gradient(135deg,#8400ff,#9333ea)',
                                color: '#fff',
                                textDecoration: 'none',
                                fontWeight: 600,
                                minWidth: 72,
                                justifyContent: 'center'
                              }}
                            >
                              <FaExternalLinkAlt /> Demo
                            </a>
                          ) : (
                            <div
                              role="button"
                              aria-disabled="true"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 8,
                                padding: '8px 12px',
                                borderRadius: 8,
                                background: 'rgba(255,255,255,0.02)',
                                color: '#bbb',
                                border: '1px solid rgba(255,255,255,0.03)',
                                fontWeight: 600,
                                minWidth: 72,
                                justifyContent: 'center',
                                cursor: 'not-allowed'
                              }}
                            >
                              <FaExternalLinkAlt /> No Demo
                            </div>
                          )}
                        </div>
                      </div>
                    )) : (
                      <div style={{ color: '#bbb' }}>No items in this category.</div>
                    )}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
