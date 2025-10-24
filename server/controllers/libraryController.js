import axios from 'axios'

export const searchMovies = async (req, res) => {
    const query = req.query.q

    if (!query) {
        return res.status(400).json({ message: "Skriv något i sökrutan." })
    }
    try {
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
                'Content-Type': 'application/json;charset=utf-8',
            },
            params: {
                query,
                language: 'sv-SE',
                page: 1,
                include_adult: false,
            },
        })

        res.status(200).json(response.data.results)
    } catch (error) {
        console.error('Fel vid sökning i TMDB:', error.message)
        res.status(500).json({ message: 'Kunde inte söka i databasen.' })
    }

}