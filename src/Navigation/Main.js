import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './Navigation'
import './Main.css'
import '../Css/CommonStyles.css'
import Download from '../Screens/Download/Download'
import Dashboard from '../Screens/Dashboard/Dashboard'
const Main = () => {
  return (
    <Router>
      <div className="background">
        <Routes>
          <Route path="/" element={<Navigation />} />
          <Route path="/download" element={<Download />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default Main
