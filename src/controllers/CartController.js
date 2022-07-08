import { ObjectId } from "mongodb"
import db from "../database/mongodb.js"

async function insertToCart(req, res) {
    const { productsOnCart } = req.body
    const { cartId } = req.params
    const { userId } = req.locals
    const cart = { userId, productsOnCart: [productsOnCart] }

    try { 
        if(cartId === undefined) {
            await db.collection('carts').insertOne(cart)
        } else {
            await db.collection('carts').updateOne(
                { _id: ObjectId(cartId)}, 
                { $push: { 
                    productsOnCart: { $each: productsOnCart } 
                } }
            )
        }

        res.sendStatus(201)
    } catch(err) {
        res.status(500).send(err)
    }
}   

async function verifyUserCart(req, res) {
    const { userId } = res.locals

    const userCartOpened = await db.collection('carts').findOne({ userId })

    if(userCartOpened === null) {
        return res.status(200).json(null)
    }

    res.status(200).send(userCartOpened.productsOnCart)
}

export { insertToCart, verifyUserCart }