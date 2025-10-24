import React, { useState } from "react";
import SignupModal from "./SignupModal";
import './LoginModal.scss'

const LoginModal = ({ onClose, setUser }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [showSignup, setShowSignup] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        try {
            const response = await fetch("http://localhost:8000/api/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (response.ok) {
                localStorage.setItem("token", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))
                setUser(data.user)
                onClose()
            } else {
                setError(data.message || "Något gick fel.")
            }
        } catch (error) {
            setError("Serverfel, försök igen senare.")
            console.error(error)
        }
    }

    if (showSignup) {
        return <SignupModal onClose={() => setShowSignup(false)} />
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal login-form" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>X</button>
                <h2>Login</h2>
                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                    <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error-msg">{error}</p>}
                    <button type="submit" className="btn">Login</button>
                </form>
                <p>Don't have an account? <a href="#" onClick={(e) => {
                    e.preventDefault()
                    setShowSignup(true)
                }}>Sign up here</a></p>
            </div>
        </div>
    )
}

export default LoginModal