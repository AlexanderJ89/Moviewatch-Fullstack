import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routing from './routing'
import './App.css'
import Navbar from './components/Navbar'
import Header from './components/Header'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (token && userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  return (
    <Router>
      <div className="layout">
        <Header user={user} setUser={setUser} />
        <Navbar />
        <main className="content">
          <Routing />
        </main>
      </div>
    </Router>
  )
}

export default App
