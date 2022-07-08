import { cartSchema } from "../validations/cartSchema.js"

async function validatideCartSchema(req, res, next) {
    const { error } = cartSchema.validate(req.body, { abortEarly: false })

    if(error) {
        return res.status(422).send(error)
    }

    next()
}

export { validatideCartSchema }