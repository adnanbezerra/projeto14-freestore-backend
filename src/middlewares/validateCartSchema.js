import { cartSchema } from "../validations/cartSchema.js"

async function validateCartSchema(req, res, next) {
    if(!req.body.cartLocal) {
        const { error } = cartSchema.validate(req.body, { abortEarly: false })
    
        if(error) {
            return res.status(422).send(error)
        }
    }

    next()
}

export { validateCartSchema }