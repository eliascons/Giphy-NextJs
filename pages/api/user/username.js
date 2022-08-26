import User from "../../../models/User.js";
import connectMongo from "../../../lib/connectMongo.js";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import authenticateJWT from '../../middleware/authJWT.js';

connectMongo();

export default authenticateJWT( async function  handler(req, res) {

  const { method } = req;

  if (method === "GET") {
    try {
      res
        .status(200)
        .json({ message: "Here is the user", user: req.user.username });

    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "error" });
    }
  } else {
    res.send("Only GET is accepted on this route");
  }
});
