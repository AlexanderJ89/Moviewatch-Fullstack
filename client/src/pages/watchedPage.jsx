import React, { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard"
import ReviewModal from "../components/ReviewModal"
import "./watchedPage.scss"
import API_BASE_URL from "../api"

const WatchedPage = () => {
  const [watchedMovies, setWatchedMovies] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)

  const token = localStorage.getItem("token")

  useEffect(() => {
    const fetchWatchedMovies = async () => {
      if (!token) return

      try {
        const response = await fetch(`${API_BASE_URL}/api/watched`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }) 
        const data = await response.json()
        setWatchedMovies(data)
      } catch (error) {
        console.error("Kunde inte hämta watched movies:", error)
      }
    }

    fetchWatchedMovies()
  }, [token])

  const openReviewModal = (movie) => {
    setSelectedMovie(movie)
    setIsModalOpen(true)
  }

  const closeReviewModal = () => {
    setIsModalOpen(false)
    setSelectedMovie(null)
  }

  if (!token) return <p>You have to login to view this page.</p>

  return (
    <div className="watched-page">
      <h2>Watched Movies</h2>
      <section className="watched-gallery">
        {watchedMovies.length > 0 ? (
             watchedMovies.map((movie, index) => (
            <MovieCard
              key={movie.id || movie._id}
              movie={movie}
              index={index}
              showAddbutton={false}
              showRanking={false}
              showRating={true}
              userLoggedIn={!!token}
              onClickReview={() => openReviewModal(movie)}
            />
        ))
      ) : (
        <p>You have not added any movies yet.</p>
      )}
      </section>

      {isModalOpen && selectedMovie && (
        <ReviewModal
          isOpen={isModalOpen}
          onClose={closeReviewModal}
          movie={selectedMovie}
          readOnly={true}
          existingRating={selectedMovie.rating}
          existingComment={selectedMovie.comment}
        />
      )}
    </div>
  )
}

export default WatchedPage