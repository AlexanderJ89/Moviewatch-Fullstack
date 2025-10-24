import React, { useEffect, useState } from 'react'
import './Rating.scss'

const Rating = ({ initialRating = 0, onRate, userLoggedIn, readOnly = false }) => {
    const [hoveredStar, setHoveredStar] = useState(0)
    const [rating, setRating] = useState(initialRating)

    useEffect(() => {
        setRating(initialRating)
    }, [initialRating])
    
    const handleClick = (star) => {

        if (readOnly) {
            if (onRate) onRate(star)
            return
        }
        
        if (!userLoggedIn) {
            alert("Logga in för att ge betyg.")
            return
        }
        setRating(star)
        if (onRate) onRate(star)
    }

    const handleMouseEnter = (star) => {
        setHoveredStar(star)
    }

    const handleMouseLeave = () => {
        setHoveredStar(0)
    }

    return (
        <ul className='stars'>
            {[1, 2, 3, 4, 5].map((star) => (
                <li
                    key={star}
                    className={`star ${(hoveredStar || rating) >= star ? "selected" : ""}`}
                    onClick={() => handleClick(star)}
                    onMouseLeave={handleMouseLeave}
                    role="button"
                    tabIndex={0}
                    aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") handleClick(star)
                    }}
                >
                    ☆    
                </li>
            ))}
        </ul>
    )
}

export default Rating