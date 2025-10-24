import axios from 'axios'

// importera i controller för att visa info om genre för filmer
export const getGenreMap = async () => {
    const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
            'Content-Type': 'application/json;charset=utf-8',
        },
        params: { language: 'sv-SE' },
    })

    const genreMap = {}
    response.data.genres.forEach(g => {
        genreMap[g.id] = g.name
    });

    return genreMap
}