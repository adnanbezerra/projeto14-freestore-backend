import * as bcrypt from "bcrypt";
import db from "../database/mongodb.js";
import sgMail from "@sendgrid/mail";

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

    await db
        .collection("users")
        .insertOne({ ...newRegister, password: hashedPassword });
    res.sendStatus(201);
}

export async function putRegister(req, res) {
    const newInfos = req.body;
    const { userInfo } = newInfos;

    try {
        await db.collection("users").updateOne(
            {
                email: userInfo.email,
            },
            {
                $set: {
                    name: userInfo.name,
                    email: userInfo.email,
                    profilePicture: userInfo.profilePicture,
                },
            }
        );

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export async function getUsers(req, res) {
    const usersArray = await db.collection("users").find().toArray();
    let usersWithProducts = [];

    for (let i = 0; i < usersArray.length; i++) {
        let userHaveProducts = await db
            .collection("products")
            .findOne({ sellerId: usersArray[i]._id.toString() });

        if (userHaveProducts) {
            usersWithProducts.push(usersArray[i]);
        }
    }

    res.send(usersWithProducts).status(200);
}

export async function emailResetPassword(req, res) {
    const { email } = req.body;

    try {
        const userFounded = await db.collection("users").findOne({ email });

        if (!userFounded) {
            return res.sendStatus(404);
        }

        const msg = {
            to: email,
            from: "daniell.ederli@hotmail.com",
            subject: "Redefinir senha",
            text: "Redefinir senha",
            html: `
                <h1>Clique no link para redefinir a senha</h1>
                <a href="http://localhost:3000/login/reset-password/${email}">Redefinir senha</a>
            `,
        };

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        await sgMail.send(msg);

        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function resetPassword(req, res) {
    const { email, password } = req.body;

    try {
        const newPassword = bcrypt.hashSync(password, 10);
        const userFounded = await db.collection("users").findOne({ email });

        if (!userFounded) {
            return res.sendStatus(404);
        }

        await db
            .collection("users")
            .updateOne({ email }, { $set: { password: newPassword } });

        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
}
