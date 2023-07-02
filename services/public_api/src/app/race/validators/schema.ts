import joi from 'joi'

export const grandprixSchema = joi.object().keys({
  id: joi.string().trim()
})

export const winnerSchema = joi.object().keys({
  id: joi.string().trim()
})

export const carSchema = joi.object().keys({
  id: joi.string().trim()
})

export const lapsSchema = joi.object().keys({
  id: joi.string().trim()
})

export const yearSchema = joi.object().keys({
  id: joi.number()
})

export const raceSchema = joi.object().keys({
  laps: joi.number().integer(),
  grand_prix: joi.string().trim(),
  year: joi.number().messages({ 'number.base': `Need a number` }),
  winner: joi.string().trim(),
  car: joi.string().trim()
})
