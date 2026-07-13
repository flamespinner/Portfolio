import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaHome, FaFolderOpen, FaUser, FaEnvelope, FaFilePdf } from 'react-icons/fa';
import headshot from '../assets/headshot.jpg';
import '../Sidebar.css';

const navItems = [
  { to: '/', label: 'Home', icon: <FaHome /> },
  { to: '/projects', label: 'Projects', icon: <FaFolderOpen /> },
  { to: '/aboutme', label: 'About Me', icon: <FaUser /> },
  { to: '/contact', label: "Let's Connect", icon: <FaEnvelope /> },
];

export default function NavbarSide() {
  const location = useLocation();
  // Hide until the Home intro finishes, but only on a fresh visit landing on "/"
  const [hidden, setHidden] = useState(
    () => location.pathname === '/' && !sessionStorage.getItem('introPlayed')
  );

  useEffect(() => {
    if (!hidden) return;
    const reveal = () => setHidden(false);
    window.addEventListener('intro:done', reveal);
    return () => window.removeEventListener('intro:done', reveal);
  }, [hidden]);

  return (
    <motion.nav
      className="sidebar"
      initial={false}
      animate={{ x: hidden ? -270 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <img src={headshot} alt="Michael Wilke" className="sidebar__avatar" />
      <Link to="/" className="sidebar__name">Michael Wilke</Link>
      <div className="sidebar__role">Data Analyst · IT Systems Admin<br />Full-Stack Developer</div>

      <div className="sidebar__links">
        {navItems.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => `sidebar__link${isActive ? ' sidebar__link--active' : ''}`}
          >
            {icon} <span>{label}</span>
          </NavLink>
        ))}
      </div>

      <a href="/CV.pdf?v=2" download="Michael_Wilke_CV.pdf" className="sidebar__cta">
        <FaFilePdf /> Resume
      </a>

      <div className="sidebar__footer">
        <span className="sidebar__status">
          <span className="sidebar__status-dot" /> Open to opportunities
        </span>
        <div className="sidebar__socials">
          <a href="https://github.com/flamespinner" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/michaelwfwilke/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
