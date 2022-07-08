import jwt from 'jsonwebtoken';
import db from '../database/mongodb.js'
import { ObjectId } from 'mongodb'

async function validateToken(req, res, next) {
    const token = req.headers.authorization.replace('Bearer ', '')
    const refreshToken = req.headers.refresh

    const secretKey = process.env.SECRET_KEY
    const refreshKey = process.env.REFRESH_KEY

    try {
        const decoded = await jwt.verify(token, secretKey)

        res.locals.userId = decoded._id
    } catch (err) {
        try {
            const decodedRefresh = await jwt.verify(refreshToken, refreshKey)

            const user = await db.collection('users').findOne({ _id: ObjectId(decodedRefresh._id) })

            if(user === null) {
                return res.status(404).send('usuario deletado ou não existe')
            }

            const newToken = jwt.sign(user, secretKey, { expiresIn: '1h' })

            return res.status(401).send({ err, newToken })
        } catch (err) {
            return res.status(401).send(err)
        }
    }

    next()
}

export { validateToken }