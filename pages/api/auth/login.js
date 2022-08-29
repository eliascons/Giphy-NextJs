
import User from '../../../models/User.js';
import connectMongo from "../../../lib/connectMongo.js";
import jwt from "jsonwebtoken";
import cookie from "cookie"; 


connectMongo();

const accessTokenSecret = process.env.JWT_SECRET;
// const refreshTokenSecret = process.env.JWT_REFRESH;

// let refreshTokens = [];

export default async function handler(req, res) {
  const { method } = req;
  const { username, password } = req.body;

  
  if (method === "POST") {

    try {

      let user = await User.findOne({ username: username });
      
      if (user) {

        user.comparePassword(password, function (err, isMatch){
          if(err) throw err;

          if (isMatch) {
            const accessToken = jwt.sign(
              { username: user.username, id: user._id },
              accessTokenSecret,
              { expiresIn: "120m" }
            );
  

      
            res.setHeader(
              "Set-Cookie",
              cookie.serialize("auth", accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
                maxAge: 3600,
                path: "/",
              })
            );
  
            res.status(200).json({ message: "Welcome back to app"});
          } else {
            res.status(401).json("Invalid credentials");
            return;
          }

        });


      } else {
        res.status(401).json("Invalid credentials user not found");
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({message:"error"});
    }
  } else {
    res.send("Only POST is accepted on this route");
  }
}
