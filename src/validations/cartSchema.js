import Joi from 'joi'

const cartSchema = Joi.object({
    userId: Joi.string().required(),
    productsOnCart: Joi.array().required()
})

export { cartSchema }