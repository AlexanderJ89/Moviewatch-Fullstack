import express from 'express'
import verifyJWT from '../middlewares/verifyJWT.js'
import { createReview, deleteReview, getAllReviews, getReviewById, updateReview } from '../controllers/reviewController.js'

const router = express.Router()

router.post("/", verifyJWT, createReview)

router.get("/", getAllReviews)

router.get("/:id", getReviewById)

router.put("/:id", verifyJWT, updateReview)

router.delete("/:id", verifyJWT, deleteReview)

export default router

