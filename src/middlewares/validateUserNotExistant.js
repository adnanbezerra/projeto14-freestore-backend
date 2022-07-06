import joi from 'joi';
import db from '../database/mongodb.js';

async function validateUserNotExistant(req, res, next) {
    const newUser = req.body;
    const testEmail = await db.collection('users').findOne({email: newUser.email});

    if(testEmail !== null) return res.sendStatus(409);

    next();
}

export default validateUserNotExistant;