import joi from 'joi'
export const yearSchema = joi.object().keys({
  id: joi.number()
})
