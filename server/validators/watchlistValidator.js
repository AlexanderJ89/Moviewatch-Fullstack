import Joi from "joi";

const movieSchema = Joi.object({
    tmdbId: Joi.number().required().messages({
    "number.base": "TMDB-ID måste vara ett nummer.",
    "any.required": "TMDB-ID är obligatorisk.",
  }),
  title: Joi.string().required().messages({
    "string.base": "Titel måste vara en textsträng.",
    "any.required": "Titel är obligatorisk.",
  }),
  image: Joi.string().uri().allow('', null).messages({
    "string.base": "Image måste vara en textsträng.",
    "string.uri": "Image måste vara en giltig URL.",
  }),
  year: Joi.number().integer().min(1888).required().messages({
    "number.base": "År måste vara ett nummer.",
    "number.min": "Ogiltigt årtal för film.",
    "any.required": "År är obligatoriskt.",
  }),
  genre: Joi.string().required().messages({
    "string.base": "Genre måste vara en textsträng.",
    "any.required": "Genre är obligatoriskt.",
  }),
  platform: Joi.string().required().messages({
    "string.base": "Platform måste vara en textsträng.",
    "any.required": "Platform är obligatoriskt.",
  }),
}).options({ stripUnknown: true });

export { movieSchema };
