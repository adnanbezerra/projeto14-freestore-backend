import { ObjectId } from "mongodb"
import db from "../database/mongodb.js"

async function insertToCart(req, res) {
    const productsOnCart = req.body
    const { cartId } = req.params
    const { userId } = res.locals
    const onCart = productsOnCart.cartLocal ? productsOnCart.cartLocal : [productsOnCart]
    const cart = { userId, productsOnCart: [...onCart] }

    try {
        if (cartId === undefined) {
            const userCartFounded = await db.collection('carts').findOne({ userId })

            if (userCartFounded) {
                return res.sendStatus(409)
            }

            await db.collection('carts').insertOne(cart)
        } else {
            const userCart = await db.collection('carts').findOne({ _id: ObjectId(cartId) })
            const productOnCart = userCart.productsOnCart.find(product => product._id === productsOnCart._id)

            if (productOnCart !== undefined) {
                await db.collection('carts').updateOne(
                    { _id: ObjectId(cartId), "productsOnCart._id": productsOnCart._id }, 
                    { $inc: { "productsOnCart.$.quantity": productsOnCart.quantity } }
                )
            } else {
                await db.collection('carts').updateOne(
                    { _id: ObjectId(cartId) },
                    { $push: { productsOnCart: { $each: [productsOnCart] } } }
                )
            }
        }

        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function verifyUserCart(req, res) {
    const { userId } = res.locals

    const userCartOpened = await db.collection('carts').findOne({ userId })

    if (userCartOpened === null) {
        return res.status(200).json(null)
    }

    res.status(200).send(userCartOpened)
}

async function deleteCartProduct(req, res) {
    const { cartId, productId } = req.params

    await db.collection('carts').updateOne(
        { "_id" : ObjectId(cartId) }, 
        { $pull: { "productsOnCart": { _id: productId } } }
    )

    const cartFounded = await db.collection('carts').find({ _id: ObjectId(cartId) })

    if(cartFounded.productOnCart && cartFounded.productOnCart.length === 0) {
        await db.collection('carts').deleteOne({ _id: ObjectId(cartId) })
    }

    res.sendStatus(200)
}

async function deleteAllUserCart(req, res) {
    const { userId } = req.params

    await db.collection('carts').deleteOne({ userId })

    res.sendStatus(200)
}

export { insertToCart, verifyUserCart, deleteCartProduct, deleteAllUserCart }