import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MovieCard from '../components/MovieCard'
import ReviewModal from '../components/ReviewModal'
import "./watchlistPage.scss"
import API_BASE_URL from '../api'

const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState([])
  const [loading, setLoading] = useState(true)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)

  const token = localStorage.getItem("token")

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/watchlist`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log("Watchlist-data:", response.data)
        setWatchlist(response.data)
      } catch (error) {
        console.error("Fel vid hämtning av watchlist", error)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchWatchlist()
    } else {
      setLoading(false)
    }
  }, [token])

  const handleRemoveFromWatchlist = async (movie, shouldAdd) => {
    if (shouldAdd) return

    try {
      await axios.delete(`${API_BASE_URL}/api/watchlist/${movie._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setWatchlist((prev) => prev.filter((m) => m._id !== movie._id))
    } catch (error) {
      console.error("Fel vid radering av film", error)
    }
  }

  // Den här öppnar din ReviewModal när användaren klickar på rating i MovieCard
  const openReviewModal = (movie) => {
    setSelectedMovie(movie)
    setIsModalOpen(true)
  }

  // Skickar betyg + kommentar till backend och stänger modal
  const submitReview = async ({ rating, comment }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/reviews`, 
        {
          movieId: selectedMovie.tmdbId || selectedMovie._id,
          rating,
          comment,
          title: selectedMovie.title,
          image: selectedMovie.image || (selectedMovie.poster_path ? `https://image.tmdb.org/t/p/w300${selectedMovie.poster_path}` : ""),
          year: selectedMovie.year || (selectedMovie.release_date ? selectedMovie.release_date.slice(0, 4) : ""),
          genre: selectedMovie.genre || "",
          platform: selectedMovie.platform || "",
        }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log("Recension skapad", response.data)

      // Ta bort film från watchlist efter recension
      setWatchlist(prev => prev.filter(m => m._id !== selectedMovie._id))
      setIsModalOpen(false)
      setSelectedMovie(null)
    } catch (error) {
      console.error("Fel vid betyg", error)
    }
  }

  if (!token) return <p>You have to login to view this page.</p>
  if (loading) return <p>Loading Watchlist...</p>
  if (watchlist.length === 0) return <p>You have not added any movies to your Watchlist.</p>

  return (
    <div className='watchlist-page'>
      <h2>Watchlist</h2>
      <div className='movie-list'>
        {watchlist.map((movie, index) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            index={index}
            showAddbutton={true}
            isInWatchList={true}
            showRating={true}
            userLoggedIn={!!token}
            onAddToWatchlist={handleRemoveFromWatchlist}
            // Istället för onRate som skickar betyg direkt, öppna modal
            onRate={() => openReviewModal(movie)}
          />
        ))}
      </div>

      {isModalOpen && selectedMovie && (
        <ReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={submitReview}
          movie={selectedMovie}
        />
      )}
    </div>
  )
}

export default WatchlistPage