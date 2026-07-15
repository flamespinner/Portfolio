import React from 'react';
import { motion } from 'framer-motion';
import { FaServer, FaNetworkWired, FaEnvelope, FaFilePdf, FaCode, FaDatabase, FaCloud, FaGamepad, FaShieldAlt, FaChartBar } from 'react-icons/fa';
import Lottie from 'lottie-react';
import serverAnim from '../assets/wired-outline-57-server-hover-pinch.json';
import headshot from '../assets/headshot.jpg';
import { Link, useNavigate } from 'react-router-dom';


const timelineEvents = [
  { 
    year: '2024', title: 'IT Systems & Data Analyst — AION Management',
    description: 'Own the reporting suite (SQL Server, Power BI/Fabric, Python ETL) and manage IT infrastructure; build custom internal applications.',
    icon: <FaDatabase />, type: 'work' 
  },
  { 
    year: '2023', title: 'Tier 2 Technical Support — AION Management',
    description: 'Advanced support for complex system issues and escalated tickets; infrastructure maintenance.',
    icon: <FaServer />, type: 'work' 
  },
  { 
    year: '2022', title: 'Founder & Lead Developer — Calico County RP (RedM)',
    description: 'Founded and lead development of a 300+ member roleplay community; built Calico Core (React web platform, Vue NUI) with Discord OAuth and admin tooling.',
    icon: <FaGamepad />, type: 'project' 
  },
  { 
    year: '2018', title: 'IT Systems Specialist — Erickson Marine (Contract)',
    description: 'Sole IT professional for a marine services company: Windows Server administration, Ubiquiti UniFi network, Jira ticketing. Ongoing freelance client since 2023 — led their Server 2012 → 2025 migration.',
    icon: <FaNetworkWired />, type: 'contract' 
  },
  { 
    year: '2016', title: 'IT Support — Renstrom Dental Studio',
    description: 'Maintained Windows Server systems, PC upgrades, CAD/CAM scanning.',
    icon: <FaServer />, type: 'work' 
  },
];

const skills = [
  { category: 'Data & Analytics', icon: <FaChartBar />, filter: 'data', skills: ['SQL Server', 'T-SQL', 'Power BI / Fabric', 'Python ETL'] },
  { category: 'Web Development', icon: <FaCode />, filter: 'web', skills: ['JavaScript/TypeScript', 'React', 'Vue', 'Node.js'] },
  { category: 'Databases', icon: <FaDatabase />, filter: 'data', skills: ['PostgreSQL', 'MariaDB/MySQL', 'MongoDB', 'Snowflake'] },
  { category: 'Infrastructure & Cloud', icon: <FaCloud />, filter: 'automation', skills: ['PowerShell', 'Azure', 'Windows Server', 'Linux', 'Active Directory', 'UniFi Networking'] },
  { category: 'Endpoint Management', icon: <FaShieldAlt />, filter: 'automation', skills: ['Microsoft Intune', 'Datto RMM / N-Central', 'LAPS', 'Patch & Compliance'] },
  { category: 'Game Development', icon: <FaGamepad />, filter: 'game', skills: ['Lua', 'RedM/FiveM', 'NUI (Vue)', 'MariaDB'] },
];


const achievements = [
  { 
    title: 'SQL Restore Automation', impact: 'Zero-touch',
    description: 'Event-driven Azure pipeline that restored SQL Server databases from blob storage automatically. Ran in production at AION.'
  },
  { 
    title: 'AION Reporting Suite', impact: 'Company-wide',
    description: 'Built and maintain the reporting stack: SQL Server, Power BI/Fabric, Python ETL.' 
  },
  { 
    title: 'Calico Core Platform', impact: '600+ players',
    description: 'Full-stack player management platform with Discord OAuth, character rosters, and admin tools.' 
  },
  { 
    title: 'Community Leadership', impact: 'Since 2022',
    description: 'Founder and lead developer of Calico County RP — roadmap, code review, and a two-person dev team within a four-person staff.'
  },
];

export default function AboutMe() {
  const navigate = useNavigate();
  const buttonStyle = {
    background: '#ea580c',
    color: '#fff',
    borderRadius: '8px',
    padding: '0.75rem 1.25rem',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none',
    fontWeight: 500,
    transition: 'all 0.3s ease',
    border: 'none',
    cursor: 'pointer',
  };

  const cardStyle = {
    background: 'rgba(28, 25, 23, 0.75)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease',
  };

  return (
    <div style={{
      color: '#fff',
      minHeight: '100vh',
      width: '100%',
      padding: '4rem'
    }}>
        
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <div style={{ 
            width: '120px', 
            height: '120px', 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, #fdba74, #ea580c)',
            margin: '0 auto 24px',
            display: 'flex',  
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            color: '#fff',
            boxShadow: '0 8px 32px rgba(234, 88, 12, 0.3)',
            overflow: 'hidden'
          }}>
            <img 
              src={headshot} 
              alt="Michael Wilke" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '50%'
              }}
            />
          </div>
          
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: '700', 
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #fdba74, #ea580c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            About Me
          </h1>
          
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#a8a29e', 
            maxWidth: '600px', 
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Full-stack developer passionate about creating efficient solutions that bridge 
            complex backend systems with intuitive user experiences.
          </p>
        </motion.section>

        {/* Professional Summary & CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ marginBottom: '60px' }}
        >
          <div style={{ ...cardStyle }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', // Use minmax for better flexibility
              gap: '32px',
              alignItems: 'center'
            }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '16px' }}>
                  Professional Summary
                </h2>
                <p style={{ lineHeight: 1.6, color: '#d6d3d1', marginBottom: '24px' }}>
                  I am a full-stack developer with a passion for building intuitive user experiences and efficient
                  back-end solutions. Over the past few years, I've worked on projects ranging from small personal
                  applications to large enterprise platforms, consistently delivering high-quality code and engaging
                  interfaces. My skill set includes JavaScript, React, Node.js, GraphQL, Docker, and cloud platforms
                  such as AWS and Azure.
                </p>
                <p style={{ lineHeight: 1.6, color: '#d6d3d1' }}>
                  When I'm not coding, you'll find me experimenting with new tech stacks, mountain biking, or enjoying the outdoors.
                </p>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <Link to="/contact" style={buttonStyle}>
                    <Lottie animationData={serverAnim} loop={true} style={{ width: '25px', height: '25px' }} />
                    Contact Me
                  </Link>
{/*                   <a href="/contact" style={buttonStyle}>
                    <Lottie animationData={serverAnim} loop={true} style={{ width: '25px', height: '25px' }} />
                    Contact Me
                  </a> */}
                  <a href="/CV.pdf?v=2" download="Michael_Wilke_CV.pdf" style={{
                    ...buttonStyle,
                    background: 'transparent',
                    border: '1px solid #ea580c',
                    color: '#ea580c'
                  }}>
                    <FaFilePdf size={20} />
                    Download CV
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ marginBottom: '60px' }}
        >
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: '600', 
            textAlign: 'center', 
            marginBottom: '32px' 
          }}>
            Skills & Expertise
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', // Slightly reduced min-width for better fit
            gap: '20px' 
          }}>
            {skills.map((group, index) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                onClick={() => navigate(`/projects?filter=${group.filter}`)}
                title={`See ${group.category.toLowerCase()} projects`}
                style={{
                  ...cardStyle,
                  padding: '20px',
                  cursor: 'pointer'
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{
                    color: '#fb923c',
                    marginRight: '12px',
                    fontSize: '20px',
                    display: 'flex'
                  }}>
                    {group.icon}
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '600', margin: 0 }}>
                    {group.category}
                  </h3>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {group.skills.map((s, i) => (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + 0.1 * index + 0.05 * i, duration: 0.25 }}
                      whileHover={{ scale: 1.08, color: '#fdba74' }}
                      style={{
                        padding: '5px 12px',
                        borderRadius: '999px',
                        background: 'rgba(251, 146, 60, 0.07)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#d6d3d1',
                        fontSize: '0.82rem',
                        cursor: 'default'
                      }}
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Timeline & Achievements */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '40px',
          marginBottom: '60px'
        }}>
          
          {/* Professional Timeline */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '600', 
              marginBottom: '24px' 
            }}>
              Professional Timeline
            </h2>
            
            <div style={{ position: 'relative' }}>
              {/* Timeline line */}
              <div style={{
                position: 'absolute',
                left: '20px',
                top: '0',
                bottom: '0',
                width: '2px',
                background: 'linear-gradient(to bottom, #fdba74, #ea580c)',
                borderRadius: '1px'
              }} />
              
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + 0.2 * index }}
                  style={{
                    position: 'relative',
                    paddingLeft: '60px',
                    paddingBottom: '32px'
                  }}
                >
                  {/* Timeline dot */}
                  <div style={{
                    position: 'absolute',
                    left: '12px',
                    top: '0',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #fdba74, #ea580c)',
                    border: '3px solid #0e0d0c',
                    zIndex: 2
                  }} />
                  
                  <div style={{
                    background: 'rgba(28, 25, 23, 0.6)',
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      marginBottom: '8px' 
                    }}>
                      <span style={{ 
                        color: '#ea580c', 
                        marginRight: '8px',
                        fontSize: '16px'
                      }}>
                        {event.icon}
                      </span>
                      <div style={{ fontWeight: '600', color: '#fff' }}>
                        {event.year}
                      </div>
                    </div>
                    <h3 style={{ 
                      fontSize: '1rem', 
                      fontWeight: '600',
                      margin: '0 0 8px 0',
                      color: '#fff'
                    }}>
                      {event.title}
                    </h3>
                    <p style={{ 
                      margin: 0, 
                      color: '#a8a29e',
                      fontSize: '0.9rem',
                      lineHeight: '1.4'
                    }}>
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Key Achievements */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '600', 
              marginBottom: '24px' 
            }}>
              Key Achievements
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + 0.1 * index }}
                  style={{
                    background: 'rgba(28, 25, 23, 0.6)',
                    padding: '20px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderLeft: '4px solid #ea580c'
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    marginBottom: '8px'
                  }}>
                    <h3 style={{ 
                      fontSize: '1rem', 
                      fontWeight: '600',
                      margin: 0,
                      color: '#fff'
                    }}>
                      {achievement.title}
                    </h3>
                    <span style={{
                      background: 'rgba(234, 88, 12, 0.2)',
                      color: '#ea580c',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      {achievement.impact}
                    </span>
                  </div>
                  <p style={{ 
                    margin: 0, 
                    color: '#a8a29e',
                    fontSize: '0.9rem',
                    lineHeight: '1.4'
                  }}>
                    {achievement.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          style={{ 
            textAlign: 'center', 
            marginBottom: '60px',
            padding: '40px 0'
          }}
        >
          <div style={{
            ...cardStyle,
            background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.1), rgba(251, 146, 60, 0.1))',
            border: '1px solid rgba(234, 88, 12, 0.3)'
          }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>
              Let's Work Together
            </h2>
            <p style={{ 
              color: '#a8a29e', 
              marginBottom: '24px',
              fontSize: '1.1rem'
            }}>
              Ready to bring your ideas to life? I'm always excited to work on challenging projects.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <Link to="/contact" style={buttonStyle}>
                <FaEnvelope size={18} />
                Start a Conversation
              </Link>
{/*               <a href="/contact" style={buttonStyle}>
                <FaEnvelope size={18} />
                Start a Conversation
              </a> */}
              <a href="/projects" style={{
                ...buttonStyle,
                background: 'transparent',
                border: '1px solid #ea580c',
                color: '#ea580c'
              }}>
                View My Work
              </a>
            </div>
          </div>
        </motion.section>
    </div>
  );
}