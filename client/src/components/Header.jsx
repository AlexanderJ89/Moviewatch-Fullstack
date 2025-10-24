import React, { useState } from 'react'
import './Header.scss'
import logo from '../assets/logos/logo-transparent.png'
import LoginModal from './LoginModal'

const Header = ({ user, setUser }) => {
    const [showLoginModal, setShowLoginModal] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
    }

    return (
        <header className="header">
            <div className="logo-container">
                <img className="logo" src={logo} alt="MovieWatch Logo" />
                <h1>Movie<span>Watch</span></h1>
            </div>

            <div className="auth-section">
                {user ? (
                    <button className="btn-logout" onClick={handleLogout}>Logout</button>
                ) : (
                    <button className="btn-login" onClick={() => setShowLoginModal(true)}>Login</button>
                )}
            </div>

            {showLoginModal && (
                <LoginModal
                    onClose={() => setShowLoginModal(false)}
                    setUser={setUser}
                />
            )}            
        </header>
    )
}

export default Header