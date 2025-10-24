import express from "express"
import { signupUser, loginUser } from "../controllers/userController.js"
import { validateBody } from "../middlewares/validateBody.js"
import { signupUserSchema, loginUserSchema } from "../validators/userValidator.js"

const router = express.Router()

// Validering med hjälp av signupUserSchema och loginUserSchema sker innan signupUser anropas
// och säkerställer att mitt POST-anrop innehåller email+password enligt mina regler i Scheman.
// Bra för att fånga upp felaktig data tidigt

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Skapa och logga in användare.
 */

/**
 * @swagger
 * /api/user/signup:
 *  post:
 *      summary: Skapa nytt användarkonto
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                          - password
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          201:
 *              description: (Created) - Användare skapad.
 *          400:
 *              description: (Bad Request) - Ogiltig data. email och password krävs.
 *          500:
 *              description: (Internal Server Error) - Fel vid skapande av användare.
 */
router.post("/signup", validateBody(signupUserSchema), signupUser)


/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Loggar in för att få en JWT-token.
 *     description: För att autentisera dig och få din JWT-token behöver du logga in med email och lösen.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: (OK) - Inloggning lyckades.
 *       401:
 *         description: (Unathorized) - Fel inloggningsuppgifter.
 *       404:
 *         description: (Not Found) - Användaren finns ej.
 *       500:
 *         description: (Internal Server Error) - Serverfel vid försök att logga in.
 */
router.post("/login", validateBody(loginUserSchema), loginUser)

export default router