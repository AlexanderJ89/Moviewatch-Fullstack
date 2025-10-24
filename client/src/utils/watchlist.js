import axios from 'axios'
import API_BASE_URL from '../api'

export const handleAddToWatchlist = async (movie, isAdded) => {
    const token = localStorage.getItem("token")
    if (!token) return alert("Du måste vara inloggad för att spara filmer till watchlist.")

    if (isAdded) {

      const posterPath = movie.poster_path
      const imageUrl = posterPath ? `https://image.tmdb.org/t/p/w300${posterPath}` : null

      const watchlistMovie = {
        tmdbId: movie.id,
        title: movie.title,
        image: imageUrl,
        year: Number(movie.release_date?.slice(0, 4)) || 0,
        genre: "Okänd", // Behöver mapps från genre_ids
        platform: "TMDB",
      }

      try {
        console.log("WatchlistMovie som skickas:", watchlistMovie)
        await axios.post(`${API_BASE_URL}/api/watchlist`, watchlistMovie, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log(`Tillagd i watchlist: ${movie.title}`)
      } catch (error) {
        console.error("Fel vid försök att lägga till i watchlist", error)
      }
    }
  }