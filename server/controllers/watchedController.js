import Watched from '../models/watchedModel.js'
import Review from '../models/reviewModel.js'

// Hämta filmer för användare och kombinera med recension
export const getWatchedMovies = async (req, res) => {
    try {
        const userId = req.user.id

        // Hämta watched-filmer för användare
        const watchedMovies = await Watched.find({ user: userId })

        // Hämta alla recensioner för användare
        const reviews = await Review.find({ userId })

        // Kombinera watched + recension via tmdbId
        const combined = watchedMovies.map(watched => {
            const review = reviews.find(r => r.movieId === watched.tmdbId.toString())

            return {
                ...watched.toObject(), //Konvertera Mongoose till JS
                comment: review?.comment || null,
                rating: review?.rating || watched.rating || null,
            }
        })
        res.status(200).json(combined)
    } catch (error) {
        console.error("Fel vid hämtning av watched-filmer", error)
        res.status(500).json({ message: "Kunde inte hämta filmer från watched.", error: error.message })
    }
}