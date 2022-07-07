import db from "../database/mongodb.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function validateLoginPassword(req, res, next) {
    const login = req.body;
    const secretKey = process.env.SECRET_KEY;
    const refreshKey = process.env.REFRESH_KEY;

    const user = await db.collection('users').findOne({ email: login.email });
    if(!user) return res.sendStatus(404);


    if(user && bcrypt.compareSync(login.password, user.password)) {

        const config = { expiresIn: '1h' }
        const refreshConfig = { expiresIn: '1y' }

        const token = jwt.sign(user, secretKey, config);
        const refreshToken = jwt.sign(user, refreshKey, refreshConfig);

        res.locals.user = user;
        res.locals.token = token;
        res.locals.refreshToken = refreshToken;

        next();
    } else {
        res.sendStatus(401);
    }

}

export default validateLoginPassword;