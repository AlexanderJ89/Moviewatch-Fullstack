import React, { useState } from 'react'
import Rating from './Rating'
import './ReviewModal.scss'
import { useEffect } from 'react'


const ReviewModal = ({ isOpen, onClose, onSubmit, movie, readOnly = false, existingRating = 0, existingComment = "" }) => {
    const [rating, setRating] = useState(existingRating)
    const [comment, setComment] = useState(existingComment)

    useEffect(() => {
        setRating(existingRating)
        setComment(existingComment)
    }, [existingRating, existingComment])

    const handleSubmit = () => {
        if (rating === 0) return alert("Rate the movie!")

        onSubmit({ rating, comment })
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>Review: {movie.title}</h2>

                <Rating 
                    initialRating={rating}
                    onRate={readOnly ? () => {} : setRating} 
                    userLoggedIn={true}
                    readOnly={readOnly}
                />

                {readOnly ? (
                    <p className="readonly-comment">{comment || "No comment provided."}</p>
                ) : (
                   <textarea
                    id="comment"
                    name="comment"
                    placeholder="Leave a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    />
                )}
             

                <div className="buttons">
                    <button className="btn-cancel" onClick={onClose}>Close</button>
                    {!readOnly && (
                        <button className="btn-submit" onClick={handleSubmit}>Submit</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ReviewModal