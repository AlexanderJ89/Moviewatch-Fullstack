import mongoose from 'mongoose'

// Skapar ett nytt dokument i reviews-collection
// movieId: (ObjectId) refererar till en film i TMdb databas
// userId: (ObjectId) refererar till användare (User) som skrev recension
// timestamps för både created och updated at
const reviewSchema = new mongoose.Schema({
    movieId: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: false }
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema)

export default Review