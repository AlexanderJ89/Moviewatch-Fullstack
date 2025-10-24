import React from 'react'
import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/homePage'
import LibraryPage from './pages/libraryPage'
import WatchlistPage from './pages/watchlistPage'
import WatchedPage from './pages/watchedPage'

const Routing = () => {

    return (
        <Routes>
            <Route path="/" element={ <HomePage /> } />
            <Route path="/library" element={ <LibraryPage /> } />
            <Route path="/watchlist" element={ <WatchlistPage /> } />
            <Route path="/watched" element={ <WatchedPage /> } />
        </Routes>
    )
}

export default Routing