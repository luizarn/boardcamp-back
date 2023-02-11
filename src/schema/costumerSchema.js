
import joi from 'joi'

export const costumerSchema = joi.object({
  name: joi.string().required(),
  phone: joi.string().regex(/^\d{10,11}$/).min(10).max(11).required(),
  cpf: joi.string().regex(/^[0-9]{11}$/).min(11).max(11).required(),
  birthday: joi.date().format('YYYY-MM-DD').required()
})