import express from 'express'
import { getInCinemaMovies } from '../controllers/inCinemaController.js';

const router = express.Router();

router.get("/", getInCinemaMovies);

export default router;