import axios from 'axios'

export const getUpcomingMovies = async (req, res) => {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/upcoming', {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
                'Content-Type': 'application/json;charset=utf-8',
            },
            params: {
                language: 'sv-SE',
                page: 1,
            },
        })

        res.status(200).json(response.data.results)
    } catch (error) {
        console.error('Fel vid hämtning av kommande filmer:', error.message)
        res.status(500).json({ message: 'Kunde inte hämta kommande filmer.' })
    }

}

