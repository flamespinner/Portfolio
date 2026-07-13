import { useState, useEffect, useRef } from 'react';
import { MdEmail, MdPhone, MdLocationOn, MdSend } from 'react-icons/md';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { gsap } from 'gsap';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  // Refs for animation
  const headerRef = useRef(null);
  const infoRef = useRef(null);
  const formRef = useRef(null);
  const socialRef = useRef(null);

  useEffect(() => {
    // Header animation
    gsap.fromTo(
      headerRef.current,
      { y: -50, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 1, ease: 'power3.out' }
    );

    // Contact info + form
    gsap.fromTo(
      [infoRef.current, formRef.current],
      { x: -50, autoAlpha: 0 },
      {
        x: 0,
        autoAlpha: 1,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.3,
        delay: 0.5
      }
    );

    // Social icons (now inside contact info card)
    gsap.fromTo(
      socialRef.current.children,
      { y: 20, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        stagger: 0.2,
        delay: 1.2
      }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const response = await fetch('https://api.web3forms.com/submit', { /* ...unchanged... */ });
      const result = await response.json();
      setStatus(result.success ? 'success' : 'error');
    } catch {
      setStatus('error');
    } finally {
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(''), 3000);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%'}}>
      <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
        {/* Header Section */}
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1
            style={{
              fontSize: '3.75rem',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '24px',
              background: 'linear-gradient(to right, #fdba74, #ea580c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Let's Connect!
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#d6d3d1', maxWidth: '672px', margin: '0 auto', lineHeight: '1.75' }}>
            Have a project in mind or want to collaborate? Feel free to reach out. <br /> I am always open to discussing new opportunities
          </p>
        </div>

        {/* Contact Information and Form Grid */}
        <div style={{ display: 'grid', /* gridTemplateColumns: 'repeat(2, 1fr)' */gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px', marginBottom: '32px' }}>
          {/* Contact Information (now with social icons inside) */}
          <div
            ref={infoRef}
            style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(16px)',
              borderRadius: '16px',
              padding: '32px',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}
          >
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '24px' }}>
                Contact Information
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', color: '#d6d3d1' }}>
                <MdEmail size={24} style={{ marginRight: '12px', color: '#fb923c' }} />
                <span>mwilke199752@gmail.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', color: '#d6d3d1' }}>
                <MdPhone size={24} style={{ marginRight: '12px', color: '#fb923c' }} />
                <span>+1 (651) 703-6341</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', color: '#d6d3d1' }}>
                <MdLocationOn size={24} style={{ marginRight: '12px', color: '#fb923c' }} />
                <span>Saint Paul, MN</span>
              </div>
            </div>

            {/* Social Media Section (moved here) */}
            <div
              ref={socialRef}
              style={{
                display: 'flex',
                gap: '24px',
                justifyContent: 'center',
                marginTop: '16px'
              }}
            >
              <a
                href="https://github.com/flamespinner"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#d6d3d1', fontSize: '2rem' }}
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/michaelwfwilke/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#d6d3d1', fontSize: '2rem' }}
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div
            ref={formRef}
            style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(16px)',
              borderRadius: '16px',
              padding: '32px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '24px' }}>
              Send a Message
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'white'
                  }}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'white'
                  }}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'white'
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'linear-gradient(to right, #fdba74, #ea580c)',
                  color: 'white',
                  fontWeight: 'bold',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
                <MdSend />
              </button>
              {status === 'success' && <p style={{ color: 'green', marginTop: '12px' }}>Message sent successfully!</p>}
              {status === 'error' && <p style={{ color: 'red', marginTop: '12px' }}>Something went wrong. Try again.</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
