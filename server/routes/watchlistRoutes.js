import express from 'express';
import { addMovieToWatchlist, getWatchlist, deleteMovieFromWatchlist } from '../controllers/watchlistController.js';
import verifyJWT from '../middlewares/verifyJWT.js';
import { validateBody } from '../middlewares/validateBody.js';
import { movieSchema } from '../validators/watchlistValidator.js';

const router = express.Router();

// Skyddade routes med verifyJWT

/**
 * @swagger
 * tags:
 *  name: Watchlist
 *  description: Hantera användarens watchlist.
 */

/**
 * @swagger
 * /api/watchlist:
 *  post:
 *      summary: Lägg till film i inloggad användares watchlist.
 *      tags: [Watchlist]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - title
 *                          - year
 *                          - genre
 *                          - platform
 *                      properties:
 *                          title:
 *                              type: string
 *                          year:
 *                              type: number
 *                          genre:
 *                              type: string
 *                          platform:
 *                              type: string
 *      responses:
 *          201:
 *              description: (Created) - Filmen lades till i watchlist.
 *          400:
 *              description: (Bad Request) - Saknar eller ogiltig data.
 *          401:
 *              description: (Unauthorized) - Token saknas eller är ogiltig.
 *          500:
 *              description: (Internal Server Error) - Fel vid försök att lägga till film.
 */
router.post('/', verifyJWT, validateBody(movieSchema), addMovieToWatchlist);

/**
 * @swagger
 * /api/watchlist:
 *   get:
 *     summary: Hämta inloggad användares watchlist.
 *     tags: [Watchlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: (OK) - Returnerar en lista med filmer i användarens watchlist.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   year:
 *                     type: number
 *                   genre:
 *                     type: string
 *                   platform:
 *                     type: string
 *       401:
 *         description: (Unauthorized) - Token saknas eller är ogiltig.
 *       500:
 *         description: (Internal Server Error) - Serverfel vid hämtning av watchlist.
 */

router.get('/',verifyJWT, getWatchlist);

/**
 * @swagger
 * /api/watchlist/{id}:
 *   delete:
 *     summary: Radera en film från inloggad användares watchlist
 *     tags: [Watchlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID för filmen som ska raderas
 *     responses:
 *       200:
 *         description: (OK) - Filmen har raderats.
 *       401:
 *         description: (Unauthorized) - Token saknas eller ogiltig.
 *       404:
 *         description: (Not Found) - Filmen kunde inte hittas eller tillhör inte användaren.
 *       500:
 *         description: (Internal Server Error) - Fel vid radering av film.
 */
router.delete("/:id", verifyJWT, deleteMovieFromWatchlist);


export default router;