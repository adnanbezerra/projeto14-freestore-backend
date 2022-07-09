import db from "../database/mongodb.js"
import { sellSchema } from "../validations/sellSchema.js"

async function registerSell(req, res) {
    const sell = req.body

    try {
        const { error } = sellSchema.validate(sell, { abortEarly: false })

        if (error) {
            return res.status(422).send(error)
        }

        await db.collection('sells').insertOne(sell)

        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function getSell(req, res) {

    const id = req.body;

    try {
        const sells = await db.collection('sells').find({ id }).toArray();
        res.status(200).send(sells);

    } catch (err) {
        res.status(500).send(err)
    }
}

export { registerSell, getSell }