import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavbarSide from './components/NavbarSide'
import Home from './pages/Home'
import Projects from './pages/Projects'
import AboutMe from './pages/Aboutme'
import Contact from './pages/Contact'
import './App.css'

export default function App() {
  return (
    <div>
      <NavbarSide />
      <div className="app-content">
        <div style={{ 
          width: '100%', 
          maxWidth: '1200px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center' 
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/aboutme" element={<AboutMe />} />
            <Route path="/contact" element={<Contact />}/>
          </Routes>
        </div>
      </div>
    </div>
  )
}