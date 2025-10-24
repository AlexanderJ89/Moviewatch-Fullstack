import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { handleAddToWatchlist } from "../utils/watchlist";
import "./homePage.scss"
import API_BASE_URL from "../api";

const HomePage = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRank, setTopRank] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [nowRes, upcomingRes, topRankRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/movies/inCinema`),
        fetch(`${API_BASE_URL}/api/movies/upcomingMovies`),
          fetch(`${API_BASE_URL}/api/movies/topRank`),
        ]);

        const nowData = await nowRes.json()
        const upcomingData = await upcomingRes.json()
        const topRankData = await topRankRes.json()

        setNowPlaying(nowData.slice(0, 10))   // Visa max 10 filmer
        setUpcoming(upcomingData.slice(0, 10)) // Visa max 10 filmer
        setTopRank(topRankData.slice(0, 5)) // Visa max 5 filmer
      } catch (error) {
        console.error("Kunde inte hämta filmer:", error);
      }
    };

    fetchMovies();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? upcoming.length - 1 : prev -1
    )
  }

  const handleNext = () => {
    setCurrentIndex((prev) => 
      prev === upcoming.length - 1 ? 0 : prev + 1
    )
  }

  return (
    <div className="home-page">
      <aside className="sidebar right">
          <h2>In Theaters</h2>
          <section className="movie-list-vertical">
            {nowPlaying.map((movie, index) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                index={index}
                showAddbutton={true}
                small={true}
                onAddToWatchlist={handleAddToWatchlist}
              />
            ))}
        </section>
      </aside>


      <main className="main-feature">
        <h2>Coming Movies</h2>
        <section className="carousel">
          <button className="nav left" onClick={handlePrev}>←</button>
          {upcoming[currentIndex] && (
            <MovieCard
              movie={upcoming[currentIndex]}
              index={currentIndex}
              big={true}
              showAddbutton={true}
              onAddToWatchlist={handleAddToWatchlist}
            />
          )}
          <button className="nav right" onClick={handleNext}>→</button>
        </section>
      </main>
       

      <section className="top-list">
        <h2>Top Ranked Movies</h2>
        <div className="horizontal-scroll">
          {topRank.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              index={index}
              showAddbutton={true}
              showRanking={true}
              small={true}
              onAddToWatchlist={handleAddToWatchlist}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;

