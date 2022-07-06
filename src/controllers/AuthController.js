import bcrypt from 'bcrypt';
import db from '../database/mongodb.js'

export async function postLogin(req, res) {
    const user = res.locals.user;
    const token = res.locals.token;
    res.send({...user, token}).status(201);
}

export async function postRegister(req, res) {
    const newRegister = req.body;

    const hashedPassword = bcrypt.hashSync(newRegister.password, 10);

    await db.collection('users').insertOne({...newRegister, password: hashedPassword});
    res.sendStatus(201);
}