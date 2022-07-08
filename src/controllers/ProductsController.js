import { ObjectId } from "mongodb"
import db from "../database/mongodb.js"

async function getProducts(req, res) {
    const category = req.query.category

    const products = await db.collection('products').find(category ? { category } : '').toArray()

    res.status(200).send(products)
}

async function getProduct(req, res) {
    const id = req.params.id
    
    const product = await db.collection('products').findOne({ _id: ObjectId(id) })

    if(product === null) {
        return res.sendStatus(404)
    }

    res.status(200).send(product)
}

async function updateProduct(req, res) {
    const { quantity } = req.body
    const { id } = req.params

    try {
        const productFounded = await db.collection('products').findOne({ _id: ObjectId(id) })

        if(productFounded === null) {
            return res.sendStatus(404)
        }

        await db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { quantity } })

        res.sendStatus(200)
    } catch(err) {
        res.status(500).send(err)
    }
}

export { getProducts, getProduct, updateProduct }