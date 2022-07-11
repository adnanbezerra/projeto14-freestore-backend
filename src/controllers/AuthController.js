import bcrypt from 'bcrypt';
import db from '../database/mongodb.js'

export async function postLogin(req, res) {
    const user = res.locals.user;
    const { token, refreshToken } = res.locals;

    let response = { ...user, token, refreshToken };
    delete response.password;

    res.send(response).status(201);
}

export async function postRegister(req, res) {
    const newRegister = req.body;

    const hashedPassword = bcrypt.hashSync(newRegister.password, 10);

    await db.collection('users').insertOne({ ...newRegister, password: hashedPassword });
    res.sendStatus(201);
}

export async function putRegister(req, res) {
    const newInfos = req.body;
    const { userInfo } = newInfos;

    await db.collection('users').updateOne({
        email: userInfo.email
    }, { $set: { name: userInfo.name, email: userInfo.email, profilePicture: userInfo.profilePicture } });

    res.sendStatus(200);
}

export async function getUsers(req, res) {
    const usersArray = await db.collection('users').find().toArray();
    let usersWithProducts = []

    for(let i = 0; i < usersArray.length; i++) {
        let userHaveProducts = await db.collection('products').findOne({ sellerId: usersArray[i]._id.toString() })

        if(userHaveProducts) {
            usersWithProducts.push(usersArray[i])
        }
    }

    res.send(usersWithProducts).status(200);
}