import Watchlist from "../models/watchlistModel.js";

// Lägga till film i användarens watchlist
const addMovieToWatchlist = async (req, res) => {
    const userId = req.user.id
    const { tmdbId, title, image, year, genre, platform } = req.body

    try {
        const exists = await Watchlist.findOne({ user: userId, tmdbId })
        if (exists) {
            return res.status(400).json({ message: "Filmen finns redan i watchlist" })
        }

        const movie = new Watchlist({ user: userId, tmdbId, title, image, year, genre, platform })
        await movie.save()

        res.status(201).json({ message: "Film tillagd i watchlist.", data: movie })
    } catch (err) {
        res.status(500).json({ message: "Kunde inte spara filmen.", error: err.message })
    }
}

// Hämta användarens watchlist
const getWatchlist = async (req, res) => {
    const userId = req.user.id

    try {
        const watchlist = await Watchlist.find({ user: userId })
        res.status(200).json(watchlist)
    } catch (err) {
        res.status(500).json({ message: "Kunde inte hämta watchlist.", error: err.message })
    }
}

// Radera en film från användarens watchlist
const deleteMovieFromWatchlist = async (req, res) => {
    const userId = req.user.id
    // Tar id från url:en /watchlist/:id
    const movieId = req.params.id

    try {
        const deletedMovie = await Watchlist.findOneAndDelete({ _id: movieId, user: userId })

        if(!deletedMovie) {
            return res.status(404).json({ message: "Filmen kunde inte hittas eller tillhör ej användaren" })
        }

        res.status(200).json({ message: "Filmen har raderats från watchlist.", data: deletedMovie })
    } catch (err) {
        res.status(500).json({ message: "Kunde inte radera filmen.", error: err.message })
    }
}

export { addMovieToWatchlist, getWatchlist, deleteMovieFromWatchlist }