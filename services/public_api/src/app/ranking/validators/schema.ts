import joi from 'joi'

export const rankingMultipleSchema = joi.object().keys({
  from_year: joi.number().integer(),
  to_year: joi.number().integer()
})

export const rankingSchema = joi.object().keys({
  year: joi.number().integer().required(),
  type: joi.string().trim().required().valid('winner', 'car').messages({ 'any.required': `accept 'winner' or 'car'` }),
  name: joi.string().trim()
})
