import User from '../../../models/User.js';
import connectMongo from '../../../lib/connectMongo.js';
import jwt from "jsonwebtoken";

connectMongo();

const accessTokenSecret = process.env.JWT_SECRET;

export default async function handler(req, res) {
    const { method } = req;
    const { username, password } = req.body;

    if (method === 'POST') {
        try {
            let user = await User.findOne({ username: username });
            if (user) {
                if (password === user.password) {

                    const accessToken = jwt.sign(
                        { username: user.username, id: user._id },
                        accessTokenSecret,
                        { expiresIn: "120m" }
                    );
                    res.json(accessToken);
                }else{
                    res.status(401).json('Invalid password ');
                    return;
                }
            } else {
                res.status(401).json('Invalid credentials user not found');
                return;
            }
        } catch (error) {
            console.log(error);
            res.status(400).json('error');
        }

    }
}