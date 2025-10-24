import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tmdbId: { type: Number, required: true },
    title: { type: String, required: true },
    image: String,
    year: Number,
    genre: String,
    platform: String,
}, { timestamps: true });

watchlistSchema.index({ user: 1, tmdbId: 1 }, { unique: true })

const Watchlist = mongoose.model("Watchlist", watchlistSchema);

export default Watchlist;