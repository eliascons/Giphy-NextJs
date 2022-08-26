import jwt from "jsonwebtoken";


const accessTokenSecret = process.env.JWT_SECRET;

const authenticateJWT = (fu) => async (req, res) => {
  // dont need this if use cookies
  // const token = req.headers.authorization.split(" ")[1];

  const cookie = req.cookies.auth;
  if (!cookie) {
    res.status(401).json("forbiden");
  }

  return new Promise((resolve) => {
    jwt.verify(cookie, accessTokenSecret, async (err, user) => {
      if (!err && user) {
        req.user = user;
        
        await fu(req, res);
        return resolve();
      }
    });
  });
};

export default authenticateJWT;
