import joi from 'joi'
export const carSchema = joi.object().keys({
  id: joi.string().trim()
})
