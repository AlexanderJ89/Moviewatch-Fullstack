import mongoose from "mongoose"

const watchedSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tmdbId: { type: Number, required: true },
    image: String,
    year: Number,
    genre: String,
    platform: String,
    rating: Number,
    ratedAt: { type: Date, default: Date.now },
}, { timestamps: true })

watchedSchema.index({ user: 1, tmdbId: 1}, {unique: true })

const Watched = mongoose.model('Watched', watchedSchema)

export default Watched