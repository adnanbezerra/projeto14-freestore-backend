import db from "../database/mongodb.js"
import { sellSchema } from "../validations/sellSchema.js"
import sgMail from '@sendgrid/mail'
import { ObjectId } from "mongodb"

async function registerSell(req, res) {
    const { productsOnCart, userId } = req.body
    const sell = req.body
    let purchases = `
        <strong>Seu pedido foi enviado com sucesso!</strong>
        <p><strong>Método: </strong> ${sell.paymentMethod}</p>
        <p><strong>Total: </strong> ${sell.total}</p>
    `

    try {
        const { error } = sellSchema.validate(sell, { abortEarly: false })

        if (error) {
            return res.status(422).send(error)
        }

        const user = await db.collection('users').findOne({ _id: ObjectId(userId) })

        for(let i = 0; i < productsOnCart.length; i++) {
            purchases += `<p><strong>Produto: </strong>${productsOnCart[i].name}, Quantidade: ${productsOnCart[i].quantity}</p>`
        }

        const msg = {
            to: user.email,
            from: 'daniell.ederli@hotmail.com', 
            subject: 'Compra na FreeStore',
            text: 'Informe de compra',
            html: purchases,
        }

        sgMail.setApiKey(process.env.SENDGRID_API_KEY)

        await db.collection('sells').insertOne(sell)
        await sgMail.send(msg)

        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function getSell(req, res) {
    const { userId } = res.locals

    try {
        const sells = await db.collection('sells').find({ userId }).toArray();
        res.status(200).send(sells);

    } catch (err) {
        res.status(500).send(err)
    }
}

export { registerSell, getSell }