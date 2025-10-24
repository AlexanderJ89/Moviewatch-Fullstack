import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"

import userRouter from './routes/userRoutes.js'
import topRankRouter from './routes/topRankRoutes.js'
import upcomingMovies from './routes/upcomingRoutes.js'
import inCinema from './routes/inCinemaRoutes.js'
import libraryRouter from './routes/libraryRoutes.js'
import reviewRouter from './routes/reviewRoutes.js'
import watchlistRouter from './routes/watchlistRoutes.js'
import watchedRouter from './routes/watchedRoutes.js'
import swaggerUi from "swagger-ui-express"
import swaggerDocumentation from "./swaggerConfig.js"

// Skapa express server
dotenv.config()

const app = express()
const PORT = process.env.PORT || 6000

// Middleware för att kunna ta emot JSON-data i req-body
app.use(express.json())

// Cors för att koppla frontend
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

// Routes
app.use('/api/user', userRouter)
app.use('/api/movies/topRank', topRankRouter)
app.use('/api/movies/upcomingMovies', upcomingMovies)
app.use('/api/movies/inCinema', inCinema)
app.use('/api/library', libraryRouter)
app.use('/api/reviews', reviewRouter)
app.use('/api/watchlist', watchlistRouter)
app.use('/api/watched', watchedRouter)

// Swagger-dokumentation som finns i mina routes och läses med hjälp av swagger ui-express
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocumentation))

// Global felhantering
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({message: "Något gick fel på servern." })
})

// Start server **endast efter lyckad DB-anslutning**
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server körs på http://localhost:${PORT}`);
  });
};

startServer();

/* app.listen(PORT, () => {
    console.log(`Server körs på http://localhost:${PORT}`)
    connectDB()
}) */