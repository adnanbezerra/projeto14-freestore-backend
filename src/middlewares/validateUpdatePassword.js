import { ObjectId } from "mongodb";
import db from "../database/mongodb.js";
import * as bcrypt from "bcrypt";

async function validateUpdatePassword(req, res, next) {
    const newInfo = req.body;
    const { userInfo, password } = newInfo;

    const user = await db
        .collection("users")
        .findOne({ _id: new ObjectId(userInfo._id) });
    if (!user) return res.sendStatus(404);

    if (user && bcrypt.compareSync(password, user.password)) {
        next();
    } else {
        return res.sendStatus(401);
    }
}

export default validateUpdatePassword;
