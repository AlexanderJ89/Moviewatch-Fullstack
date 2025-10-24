import Joi from "joi"

// Användarnamn och lösen måste vara en sträng
// Felmeddelande om user skickar in te.x. bara 1234 som userName eller lösen

const signupUserSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.base": "Email ska vara en sträng.",
        "string.email": "Ogiltig e-postadress",
        "any.required": "Email är obligatoriskt",
    }),
    password: Joi.string().min(6).required().messages({
        "string.base": "Lösenord ska vara en sträng.",
        "string.min": "Lösenordet måste vara minst 6 tecken.",
        "any.required": "Lösenord är obligatoriskt.",
    }),   
}).options({ stripUnknown: true})

const loginUserSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "any.required": "Email är obligatoriskt",
    }),
    password: Joi.string().required().messages({
        "any.required": "Lösenord är obligatoriskt",
    }),  
})

export { signupUserSchema, loginUserSchema }