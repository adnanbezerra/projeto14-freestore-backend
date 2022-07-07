import joi from 'joi';

function validateRegisterData(req, res, next) {

    const validationSchema = joi.object({
        name: joi.string().trim().required(),
        email: joi.string().trim().email().required(),
        profilePicture: joi.string().uri().required().allow(''),
        password: joi.string().trim().required()
    })

    const validate = validationSchema.validate(req.body);

    if(validate.error) return res.status(422).send(validate.error);

    next()
}

export default validateRegisterData;