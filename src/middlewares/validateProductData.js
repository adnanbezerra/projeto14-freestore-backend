import joi from 'joi';

function validateProductData(req, res, next) {

    const newProduct = req.body;

    const validationSchema = joi.object({
        name: joi.string().required(),
        seller: joi.string().required(),
        description: joi.string().required(),
        price: joi.number().required(),
        category: joi.string().valid(['Esportes', 'Roupas', 'Moveis', 'Cosmeticos', 'Eletronicos', 'Livros', 'Brinquedos', 'Eletrodomesticos']).required(),
        quantity: joi.number().required(),
        images: joi.array(joi.string()).required()
    })

    const validate = validationSchema.validate(newProduct);

    if(validate.error) return res.send(validate.error).status(422);

    next();
}

export default validateProductData;