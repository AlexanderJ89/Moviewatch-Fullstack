import User from "../models/userModel.js"
import bcrypt from "bcryptjs" //Används för hasha lösen
import jwt from "jsonwebtoken" //Används för signering

// SKAPA NY ANVÄNDARE

// Användaren matar in email och password som hämtas.
// Hashar och saltar lösenord (10 rounds) med Bcrypt för att göra det säkert.
// Sparar email och hashade lösen.
// Går allt bra skickas statuskod 201 (created) användarens info.
// Går något fel fångar vi upp det med en 500 serverfel.

const signupUser = async (req, res) => {
  const { email, password } = req.body

  try {
    // Kolla om användarnamnet redan finns
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ message: "Det finns redan en användare med denna email." })
    }

    // Hasha lösenordet
    const hashedPassword = await bcrypt.hash(password, 10)

    // Skapa ny användare och spara till databasen
    const newUser = new User({
      email,
      password: hashedPassword,
    })

    await newUser.save()

    res.status(201).json({
      message: "Skapat ny användare.",
      data: {
        email: newUser.email,
        _id: newUser._id,
      },
    })
  } catch (error) {
    console.error("Fel vid skapande av användare:", error)
    res.status(500).json({ message: "Serverfel", error: error.message })
  }
}
   

// LOGGA IN

// Hämtar email och lösen från req-body
// Söker efter användare i userDb på email
// Jämför det skrivna lösenordet med det krypterade i databasen
// Genererar JWT-token med hjälp av "jsonwebtoken" om användaren loggat in korrekt som innehåller userName
// Token signeras med hemliga nyckeln JWT_SECRET och får utgångstid på 1h
// Skickar tillbaka meddelande och en token som användare behöver till skyddade routes
const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: "Användaren finns ej." })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Fel inloggningsuppgifter." })
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    )

    res.status(200).json({
      message: "Inloggad användare",
      token,
      user: {
        email: user.email,
        id: user._id,
      }
    })
  } catch (error) {
    console.error("Fel vid inloggning:", error)
    res.status(500).json({ message: "Serverfel", error: error.message })
  }
}

export { signupUser, loginUser }