import React from 'react';
import { Link, NavLink } from 'react-router-dom';
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
  return (
    <nav className="sidebar">
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
    </nav>
  );
}
