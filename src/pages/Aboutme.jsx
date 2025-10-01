import React from 'react';
import { motion } from 'framer-motion';
import { FaServer, FaNetworkWired, FaEnvelope, FaFilePdf, FaCode, FaDatabase, FaCloud, FaRobot, FaGamepad, FaCog } from 'react-icons/fa';
import { TbWorldWww } from "react-icons/tb";
import Lottie from 'lottie-react';
import serverAnim from '../assets/wired-outline-57-server-hover-pinch.json';
import cloudAnim from '../assets/wired-outline-1-cloud-hover-pinch.json';
import headshot from '../assets/headshot.jpg';


const timelineEvents = [
  { 
    year: '2024', 
    title: 'Database Administrator at AION Management', 
    description: 'Managing SQL Server databases, optimizing performance, and maintaining ETL processes for high availability and data integrity.',
    icon: <FaDatabase />,
    type: 'work'
  },
  { 
    year: '2023', 
    title: 'Tier 2 Technical Support at AION Management', 
    description: 'Providing advanced technical support for complex system issues, troubleshooting escalated tickets, and supporting infrastructure maintenance.',
    icon: <FaDatabase />,
    type: 'work'
  },
  { 
    year: '2018', 
    title: 'Contract Help Desk Technician at Erickson Marine', 
    description: 'Supporting 20+ IT devices, managing Jira ticketing system, and upgraded network infrastructure to Ubiquiti UniFi equipment.',
    icon: <FaDatabase />,
    type: 'contract'
  },
  { 
    year: '2016', 
    title: 'IT Support at Renstrom Dental Studio', 
    description: 'Maintained Windows Server systems, upgraded PCs to meet software requirements, and performed CAD/CAM scanning for dental model design.',
    icon: <FaDatabase />,
    type: 'work'
  },
];

const skills = [
  { name: 'JavaScript/TypeScript', level: 95, category: 'Frontend', icon: <FaCode /> },
  { name: 'React/Node.js', level: 90, category: 'Full Stack', icon: <FaCode /> },
  { name: 'SQL Server/ETL', level: 95, category: 'Data Engineering', icon: <FaDatabase /> },
  { name: 'PowerShell/Azure', level: 85, category: 'Cloud & Automation', icon: <Lottie animationData={cloudAnim} loop={true} style={{ width: '25px', height: '25px' }} /> },
  { name: 'Python/Lua', level: 80, category: 'Scripting', icon: <FaRobot /> },
  { name: 'Docker/DevOps', level: 75, category: 'Infrastructure', icon: <FaCog /> },
  { name: 'Linux/Windows Server', level: 80, category: 'Infrastructure', icon: <FaServer /> },
  { name: 'WebDesign', level: 85, category: 'UI/UX', icon: <TbWorldWww /> },
];


const achievements = [
  {
    title: 'Performance Optimization',
    description: 'Reduced page load time by 35% through optimized asset bundling and lazy loading.',
    impact: '35% faster'
  },
  {
    title: 'Team Leadership',
    description: 'Led a cross-functional team to deliver a micro-service architecture for a SaaS product.',
    impact: 'Full migration'
  },
  {
    title: 'Knowledge Sharing',
    description: 'Mentored junior developers and organized internal knowledge-sharing sessions.',
    impact: '10+ developers'
  },
  {
    title: 'System Scalability',
    description: 'Designed and implemented a scalable architecture that supported 500,000+ users.',
    impact: '500k+ users'
  },
  {
    title: 'Automation Efficiency',
    description: 'Automated repetitive tasks using PowerShell and Azure DevOps, reducing manual effort by 40%.',
    impact: '40% reduction in manual effort'
  }
];

export default function AboutMe() {
  const buttonStyle = {
    background: '#1d4ed8',
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
    background: 'rgba(26, 26, 26, 0.7)',
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
            background: 'linear-gradient(135deg, #1d4ed8, #9333ea)',
            margin: '0 auto 24px',
            display: 'flex',  
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            color: '#fff',
            boxShadow: '0 8px 32px rgba(29, 78, 216, 0.3)',
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
            background: 'linear-gradient(135deg, #1d4ed8, #9333ea)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            About Me
          </h1>
          
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#9aa3b2', 
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
                <p style={{ lineHeight: 1.6, color: '#bfbfbf', marginBottom: '24px' }}>
                  I am a full-stack developer with a passion for building intuitive user experiences and efficient
                  back-end solutions. Over the past few years, I've worked on projects ranging from small personal
                  applications to large enterprise platforms, consistently delivering high-quality code and engaging
                  interfaces. My skill set includes JavaScript, React, Node.js, GraphQL, Docker, and cloud platforms
                  such as AWS and Azure.
                </p>
                <p style={{ lineHeight: 1.6, color: '#bfbfbf' }}>
                  When I'm not coding, you'll find me experimenting with new tech stacks, mountain biking, or enjoying the outdoors.
                </p>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <a href="/contact" style={buttonStyle}>
                    <Lottie animationData={serverAnim} loop={true} style={{ width: '25px', height: '25px' }} />
                    Contact Me
                  </a>
                  <a href="/CV.pdf" download style={{
                    ...buttonStyle,
                    background: 'transparent',
                    border: '1px solid #1d4ed8',
                    color: '#1d4ed8'
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
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                style={{
                  ...cardStyle,
                  padding: '20px',
                  cursor: 'default'
                }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ 
                    color: '#1d4ed8', 
                    marginRight: '12px',
                    fontSize: '20px'
                  }}>
                    {skill.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>
                      {skill.name}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: '#9aa3b2', margin: 0 }}>
                      {skill.category}
                    </p>
                  </div>
                </div>
                
                <div style={{ 
                  width: '100%', 
                  height: '6px', 
                  background: '#1a1a1a', 
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.2 + 0.1 * index }}
                    style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #1d4ed8, #9333ea)',
                      borderRadius: '3px'
                    }}
                  />
                </div>
                <p style={{ 
                  fontSize: '0.8rem', 
                  color: '#666', 
                  margin: '8px 0 0 0',
                  textAlign: 'right'
                }}>
                  {skill.level}%
                </p>
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
                background: 'linear-gradient(to bottom, #1d4ed8, #9333ea)',
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
                    background: 'linear-gradient(135deg, #1d4ed8, #9333ea)',
                    border: '3px solid #07070b',
                    zIndex: 2
                  }} />
                  
                  <div style={{
                    background: 'rgba(26, 26, 26, 0.5)',
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
                        color: '#1d4ed8', 
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
                      color: '#9aa3b2',
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
                    background: 'rgba(26, 26, 26, 0.5)',
                    padding: '20px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderLeft: '4px solid #1d4ed8'
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
                      background: 'rgba(29, 78, 216, 0.2)',
                      color: '#1d4ed8',
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
                    color: '#9aa3b2',
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
            background: 'linear-gradient(135deg, rgba(29, 78, 216, 0.1), rgba(147, 51, 234, 0.1))',
            border: '1px solid rgba(29, 78, 216, 0.3)'
          }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>
              Let's Work Together
            </h2>
            <p style={{ 
              color: '#9aa3b2', 
              marginBottom: '24px',
              fontSize: '1.1rem'
            }}>
              Ready to bring your ideas to life? I'm always excited to work on challenging projects.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <a href="/contact" style={buttonStyle}>
                <FaEnvelope size={18} />
                Start a Conversation
              </a>
              <a href="/projects" style={{
                ...buttonStyle,
                background: 'transparent',
                border: '1px solid #1d4ed8',
                color: '#1d4ed8'
              }}>
                View My Work
              </a>
            </div>
          </div>
        </motion.section>
    </div>
  );
}