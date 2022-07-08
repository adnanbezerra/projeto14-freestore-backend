import joi from "joi";

function validateUserUpdateData(req, res, next) {

    const newInfo = req.body;

    const validationSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        profilePicture: joi.string().required()
    })

    const validate = validationSchema.validate(newInfo.user);

    if (validate.error) return res.send(validate.error);

    next();
}

export default validateUserUpdateData;