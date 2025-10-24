import express from 'express'
import { getUpcomingMovies } from '../controllers/upcomingController.js';

const router = express.Router();

router.get("/", getUpcomingMovies);

export default router;