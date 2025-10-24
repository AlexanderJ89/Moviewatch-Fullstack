import React, { useState } from "react";
import './LoginModal.scss'

const SignupModal = ({ onClose }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setSuccess(false)

        try {
            const response = await fetch("http://localhost:8000/api/user/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (response.ok) {
                setSuccess(true)
                setTimeout(() => onClose(), 1500)
            } else {
                setError(data.message || "Något gick fel.")
            }
        } catch (error) {
            setError("Serverfel, försök igen senare.")
            console.error(error)
        }
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal login-form" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>X</button>
                <h2>Sign Up</h2>
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
                    {success && <p className="success-msg">Konto skapat! Du kan nu logga in.</p>}
                    <button type="submit" className="btn">Signup</button>
                </form>
                <p>Already have an account? <a href="#" onClick={(e) => {
                    e.preventDefault()
                    onClose() 
                }}>Login in here</a></p>
            </div>
        </div>
    )
}

export default SignupModal