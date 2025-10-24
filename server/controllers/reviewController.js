// Anpassa för TMDb - database

import Review from '../models/reviewModel.js'
import Watchlist from '../models/watchlistModel.js'
import Watched from '../models/watchedModel.js'

// SKAPA RECENSION
export const createReview = async (req, res) => {
    try {
        const {movieId, rating, comment, title, image, year, genre, platform } = req.body
        const userId = req.user.id

        // Skapa recension
        const review = await Review.create({ movieId, userId, rating, comment })

        // Hämta film från Watchlist
        const movieInWatchlist = await Watchlist.findOne({ user: userId, tmdbId: movieId })

        if (movieInWatchlist) {
            // Flytta film till watched om den finns i watchlist
            await Watched.create({
                user: userId,
                tmdbId: movieInWatchlist.tmdbId,
                title: movieInWatchlist.title,
                image: movieInWatchlist.image,
                year: movieInWatchlist.year,
                genre: movieInWatchlist.genre,
                platform: movieInWatchlist.platform,
                rating: rating
            })

            await movieInWatchlist.deleteOne()
        } else {
            // Finns inte film i watchlist skapas ny watched
            await Watched.create({
                user: userId,
                tmdbId: movieId,
                title,
                image,
                year,
                genre,
                platform,
                rating
            })
        }

        res.status(201).json({
            success: true,
            message: "Recension skapad och filmen sparad i 'watched'.",
            data: review,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// HÄMTA ALLA RECENSIONER

// Populate låter mig bara hämta det jag vill som t.ex. "userId" + "Username"
// Kan sätta - framför något jag vill utesluta t.ex. _id som automatiskt skickas med.
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
        .populate('userId', 'userName')

        res.status(200).json({
            success: true,
            message: "Hämtade alla recensioner.",
            data: reviews 
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// HÄMTA EN SPECIFIK RECENSION UTIFRÅN ID
export const getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id)
        .populate('userId', 'userName')

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Hittade ingen recension."
            })
        }
        res.status(200).json({
            success: true,
            message: "Hämtade recension.",
            data: review
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// UPPDATERA EN RECENSION

// Kontrollera att endast ägaren kan uppdatera sin egen med review.userId som måste vara samma som req.user.id (inloggad)
// toString för att göra review.userId till sträng från ObjectId
export const updateReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id)

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Hittade ingen recension."
            })
        }

        if (review.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Endast ägaren kan uppdatera."
            })
        }

        // Uppdaterar bara fält användaren skickar med annars behålls det tidigare oförändrat
        review.rating = req.body.rating ?? review.rating
        review.comment = req.body.comment ?? review.comment
        await review.save()

        res.status(200).json({
            success: true,
            message: "Recensionen har uppdaterats.",
            data: review
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// RADERA RECENSION

// Kontrollera att endast ägaren kan radera sin egen
export const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id)

        if (!review)
            return res.status(404).json({
                success: false,
                message: "Hittade ingen recension." 
            })

        if (review.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Endast ägaren kan radera."
            })
        }

        await review.deleteOne()

        res.status(200).json({
            success: true,
            message: "Recensionen har raderats."
        })
    } catch (error) {
         res.status(500).json({
            success: false,
            message: error.message
        })
    }
}