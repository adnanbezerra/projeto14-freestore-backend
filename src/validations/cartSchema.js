import joi from 'joi'

const cartSchema = joi.object({
    _id: joi.string().required(),
    name: joi.string().required(),
    seller: joi.string().required(),
    description: joi.string().required(),
    images: joi.array().required(),
    price: joi.number().required(),
    category: joi.string().required(),
    quantity: joi.number().required()
})

export { cartSchema }