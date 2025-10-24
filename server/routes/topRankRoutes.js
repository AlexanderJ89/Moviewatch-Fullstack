import express from 'express'
import { getTopRankMovies } from '../controllers/topRankController.js';

const router = express.Router();

router.get("/", getTopRankMovies);

export default router;