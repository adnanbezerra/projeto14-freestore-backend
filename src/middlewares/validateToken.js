import jwt from 'jsonwebtoken';
import db from '../database/mongodb.js'
import { ObjectId } from 'mongodb'

async function validateToken(req, res, next) {
    const token = req.headers.authorization.replace('Bearer ', '')
    const refreshToken = req.headers.refresh

    const secretKey = process.env.SECRET_KEY
    const refreshKey = process.env.REFRESH_KEY
    
    let decodedRefresh;

    try {
        await jwt.verify(token, secretKey)
    } catch (err) {
        try {
            decodedRefresh = await jwt.verify(refreshToken, refreshKey)

            const user = await db.collection('users').findOne({ _id: ObjectId(decodedRefresh._id) })

            if(user === null) {
                return res.status(404).send('usuario deletado ou não existe')
            }

            res.locals.userId = user._id

            const newToken = jwt.sign(user, secretKey, { expiresIn: '1h' })

            return res.status(401).send({ err, newToken })
        } catch (err) {
            return res.status(401).send(err)
        }
    }

    next()
}

export { validateToken }