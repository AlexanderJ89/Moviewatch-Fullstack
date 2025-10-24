import express from 'express'
import { getWatchedMovies } from '../controllers/watchedController.js'
import verifyJWT from '../middlewares/verifyJWT.js'

const router = express.Router()

router.get('/', verifyJWT, getWatchedMovies)

export default router
