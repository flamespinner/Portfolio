import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function NavbarSide() {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '250px',
        height: '100vh',
        backgroundColor: 'linear-gradient(135deg, rgba(7, 7, 11, 0.95), rgba(15, 15, 23, 0.95))',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start', // Align items to the top
        alignItems: 'center',
        padding: '20px',
        boxSizing: 'border-box',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        transition: 'background 0.3s ease',
      }}
    >
      {/* Logo / Home Link */}
      <div style={{ fontWeight: 700, marginBottom: '16px' }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '1.4rem',
            fontWeight: 700,
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#9aa0ff'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
        >
          <b>Michael Wilke</b>
        </Link>
      </div>

      {/* Navigation Links */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px', justifyContent: 'center', alignItems: 'center' }}>
        <Link
          to="/"
          style={{
            color: '#9aa0ff',
            textDecoration: 'none',
            fontSize: '1rem',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#6c75f0'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#9aa0ff'}
        >
          Home
        </Link>
        <Link
          to="/projects"
          style={{
            color: '#9aa0ff',
            textDecoration: 'none',
            fontSize: '1rem',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#6c75f0'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#9aa0ff'}
        >
          Projects
        </Link>
        <Link
          to="/aboutme"
          style={{
            color: '#9aa0ff',
            textDecoration: 'none',
            fontSize: '1rem',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#6c75f0'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#9aa0ff'}
        >
          About Me
        </Link>
        <Link
          to="/contact"
          style={{
            color: '#9aa0ff',
            textDecoration: 'none',
            fontSize: '1rem',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#6c75f0'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#9aa0ff'}
        >
          Let's Connect
        </Link>
      </div>

      {/* Social Icons */}
      <div style={{ display: 'flex', gap: '24px' }}>
        <a
          href="https://github.com/flamespinner/Portfolio"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#9aa0ff',
            textDecoration: 'none',
            fontSize: '1.2rem',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#6c75f0'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#9aa0ff'}
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/michaelwfwilke/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#9aa0ff',
            textDecoration: 'none',
            fontSize: '1.2rem',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#6c75f0'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#9aa0ff'}
        >
          <FaLinkedin />
        </a>
      </div>
    </nav>
  );
}
