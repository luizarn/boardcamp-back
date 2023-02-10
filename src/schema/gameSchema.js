
import joi from 'joi'

export const gameSchema = joi.object({
//   id: joi.number().required(),
  name: joi.string().required(),
  image: joi.string().required(),
  stockTotal: joi.number().required(),
  pricePerDay: joi.number().required()
})