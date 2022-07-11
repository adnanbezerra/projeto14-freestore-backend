import { ObjectId } from "mongodb"
import db from "../database/mongodb.js"

async function getProducts(req, res) {
    const { category, name, sellerId } = req.query
    let products = [];

    if(category) {
        products = await db.collection('products').find({ category }).toArray()
    } else if(name) {
        if(name === 'all') {
            products = await db.collection('products').find().toArray()
        } else {
            products = await db.collection('products').aggregate([
                { $project: 
                    { 
                        name: { $toLower: "$name" }, 
                        images: "$images", 
                        category: "$category",
                        price: "$price"
                    }
                } 
            ]).match({ name: { $regex: name } }).toArray()
        }
    } else if(sellerId) {
        products = await db.collection('products').find({ sellerId }).toArray()
    } else {
        products = await db.collection('products').find().toArray()
    }   

    res.status(200).send(products)
}

async function getProduct(req, res) {
    const id = req.params.id

    const product = await db.collection('products').findOne({ _id: ObjectId(id) })

    if (product === null) {
        return res.sendStatus(404)
    }

    res.status(200).send(product)
}

async function updateProduct(req, res) {
    const { quantity } = req.body
    const { id } = req.params

    try {
        const productFounded = await db.collection('products').findOne({ _id: ObjectId(id) })

        if (productFounded === null) {
            return res.sendStatus(404)
        }

        await db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { quantity } })

        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function postNewProduct(req, res) {

    try {
        const newProduct = req.body;
        await db.collection('products').insertOne(newProduct);

        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error);

    }

}

export { getProducts, getProduct, updateProduct, postNewProduct }