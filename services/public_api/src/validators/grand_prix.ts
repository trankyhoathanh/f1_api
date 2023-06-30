import joi from 'joi'
export const grandprixSchema = joi.object().keys({
  id: joi.string().trim()
})
