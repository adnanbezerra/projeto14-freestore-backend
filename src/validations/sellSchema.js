import joi from 'joi'

const sellSchema = joi.object({
    userId: joi.string().required(),
    productsOnCart: joi.array().required(),
    paymentMethod: joi.string().required(),
    date: joi.string().required(),
    total: joi.number().required()
})

export { sellSchema }