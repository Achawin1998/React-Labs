import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//router
import { BrowserRouter as Router , Routes , Route , NavLink } from 'react-router-dom'

// components
import ProjectsPage from './projects/ProjectsPage'
import HomePage from './home/HomePage'
import ProjectPage from './projects/ProjectPage'

// img LOGO
import Logo3 from "/assets/logo-3.svg"


function App() {
 
  return (
    <Router>
      <header className='sticky'>
        <span className='logo'>
          <img src={Logo3} alt="logo" width={49} height={99} />
        </span>
        <NavLink to={"/"} className="button rounded">
          <span className='icon-home'></span>
          Home
        </NavLink>
        <NavLink to={"/projects"} className="button rounded">
          Projects
        </NavLink>
      </header>

      <div className='container'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
