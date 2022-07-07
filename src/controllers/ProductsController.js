import db from "../database/mongodb.js"

async function getProducts(req, res) {
    const category = req.query.category

    const products = await db.collection('products').find(category ? { category } : '').toArray()

    res.status(200).send(products)
}

export { getProducts }