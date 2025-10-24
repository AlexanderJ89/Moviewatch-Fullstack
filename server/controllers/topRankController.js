import axios from 'axios'

export const getTopRankMovies = async (req, res) => {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/top_rated', {
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
        console.error('Fel vid hämtning av topprankade filmer:', error.message)
        res.status(500).json({ message: 'Kunde inte hämta topprankade filmer.' })
    }

}