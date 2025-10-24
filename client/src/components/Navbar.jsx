import React, { useState } from 'react'
import './Navbar.scss'
import { NavLink, useNavigate } from 'react-router-dom'


const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (searchTerm.trim()) {
            navigate(`/library?search=${encodeURIComponent(searchTerm.trim())}`)
            setSearchTerm('')
            setMenuOpen(false)
        }
    }

    // Stäng meny när man klickar på en länk
    const handleLinkClick = () => {
        setMenuOpen(false)
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    return (
        <nav className="nav-top">
            <div className="hamburger-menu" onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        
            <ul className={`nav ${menuOpen ? 'show' : ''}`}>
                <li><NavLink to="/" className="nav-link" onClick={handleLinkClick}>HOME</NavLink></li>
                <li><NavLink to="/library" className="nav-link" onClick={handleLinkClick}>LIBRARY</NavLink></li>
                <li><NavLink to="/watchlist" className="nav-link" onClick={handleLinkClick}>WATCHLIST</NavLink></li>
                <li><NavLink to="/watched" className="nav-link" onClick={handleLinkClick}>WATCHED</NavLink></li>
                <li>
                    <form onSubmit={handleSubmit} className="search-form">
                        <input 
                            type="search"
                            name="search"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="form-input"
                        />
                        <button type="submit" className="btn">Search</button>
                    </form>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar