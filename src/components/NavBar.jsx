import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function NavBar() {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 20px',
        backgroundColor: 'rgba(7, 7, 11, 0.8)',
        color: '#fff',
        width: '100%',
      }}
    >
      {/* Logo / Home Link */}
      <div style={{ fontWeight: 700, position: 'relative' }}>
        <Link
          to="/home"
          style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '1.2rem',
            fontWeight: 700,
          }}
        >
          <b>Michael Wilke</b>
        </Link>
        <div
          style={{
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '2px',
            backgroundColor: '#9aa0ff',
            bottom: '0',
          }}
        />
      </div>

      {/* Right-aligned Links & Icons */}
      <div>
        <Link
          to="/projects"
          style={{ color: '#9aa0ff', textDecoration: 'none', fontSize: '1rem' }}
        >
          Projects
        </Link>
        <Link
          to="/aboutme"
          style={{ color: '#9aa0ff', textDecoration: 'none', fontSize: '1rem' }}
        >
          About Me
        </Link>
        <Link
          to="/contact"
          style={{ color: '#9aa0ff', textDecoration: 'none', fontSize: '1rem' }}
        >
          Let's Connect
        </Link>

        {/* Icons */}
        <a
          href="https://github.com/flamespinner/portfoliov2"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#9aa0ff', textDecoration: 'none', fontSize: '1.2rem' }}
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/michaelwfwilke/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#9aa0ff', textDecoration: 'none', fontSize: '1.2rem' }}
        >
          <FaLinkedin />
        </a>
      </div>
    </nav>
  );
}