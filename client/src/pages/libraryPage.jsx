import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import './libraryPage.scss'
import axios from 'axios'
import { handleAddToWatchlist } from '../utils/watchlist'
import API_BASE_URL from '../api'

const LibraryPage = () => {
  const location = useLocation()
  /* const navigate = useNavigate() */
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getSearchQuery= () => {
    const params = new URLSearchParams(location.search)
    return params.get('search') || ''
  }

  const searchTerm = getSearchQuery()

  useEffect(() => {
    if (!searchTerm) {
      setMovies([])
      return
    }

    const fetchMovies = async () => {
      setLoading(true)
      setError(null)
      try {

        const response = await axios.get(`${API_BASE_URL}/api/library/search?q=${encodeURIComponent(searchTerm)}`)
        
        const results = Array.isArray(response.data) ? response.data : []
        setMovies(results)

      } catch (error) {
        setError('Kunde inte hämta filmer.')
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [searchTerm])

  /* const handleMovieClick = (movieID) => {
    navigate(`/library/${movieID}`)
  } */

  return (
    <div className="library-page">
      <h2>Search results for "{searchTerm}"</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && movies.length === 0 && <p>No movies were found.</p>}

      <div className="movie-grid">
        {movies.map((movie, index) => (
          <div key={movie.id}/*  onClick={() => handleMovieClick(movie.id)} */>
            <MovieCard
              movie={movie}
              index={index}
              showAddbutton={true}
              showRating={false}
              onAddToWatchlist={handleAddToWatchlist}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default LibraryPage

