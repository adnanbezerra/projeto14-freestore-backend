import joi from 'joi';

function validateLoginData(req, res, next) {
    const validationSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    })

    const validate = validationSchema.validate(req.body);

    if(validate.error) return res.sendStatus(422);

    next()
}

export default validateLoginData;