import React, { useState, useEffect } from "react";
import "./MovieCard.scss"
import Rating from "./Rating"
import { FaPlusCircle } from "react-icons/fa"

const MovieCard = ({
    movie,
    index,
    showRanking = false,
    showAddbutton = false,
    showRating = false,
    isInWatchList = false,
    onAddToWatchlist,
    onRate,
    userLoggedIn = false,
    small = false,
    big = false,
    onClickReview,
}) => {

    const [inWatchList, setInWatchlist] = useState(isInWatchList)

    useEffect(() => {
        setInWatchlist(isInWatchList)
    }, [isInWatchList])

    const handleAdd = () => {
        const updatedStatus = !inWatchList
        setInWatchlist(updatedStatus)

        if (onAddToWatchlist) {
            onAddToWatchlist(movie, updatedStatus)
        }
    }

    const handleRating = () => {
        if (onRate) {
            onRate(movie)
        }
    }


    const imageUrl = movie.image && movie.image.startsWith("http")
        ? movie.image
        : movie.poster_path
            ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
            : null

    const cardClass = `gallery-article${small ? " small" : big ? " big" : ""}`

    return (
        <article className={cardClass}>
            {showRating && (
                <Rating 
                    onRate={handleRating} 
                    userLoggedIn={userLoggedIn}
                    initialRating={movie.rating || 0}
                    readOnly={false}
                />
            )}

            <figure className="img-gallery">
           
                {imageUrl ? (
                    <img src={imageUrl} alt={movie.title} />
                ) : (
                    <div className="no-image">Ingen bild</div>
                )}

                {showAddbutton && (
                    <FaPlusCircle
                        className={`icon-add-movie ${inWatchList ? "active" : ""}`}
                        onClick={handleAdd}
                        title={
                            inWatchList
                            ? "Remove from Watchlist"
                            : "Add to Watchlist"
                        }    
                    />
                )}
            </figure>

            <section className="info-gallery">
                <h3>{showRanking ? `#${index + 1}` : movie.release_date?.slice(0, 4)}</h3>
                <h5>{movie.platform || movie.original_language?.toUpperCase()}</h5>

                {onClickReview && (
                    <button className="btn-view-review" onClick={onClickReview}>
                        View Review
                    </button>
                )}
            </section>
        </article>
    )
}

export default MovieCard