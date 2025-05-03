import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './Navigation'
import './Main.css'
import '../Css/CommonStyles.css'
const Main = () => {
  return (
    <Router>
      <div className="background">
        <Routes>
          <Route path="/" element={<Navigation />} />
        </Routes>
      </div>
    </Router>
  )
}

export default Main
