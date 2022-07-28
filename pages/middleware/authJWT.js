
import jwt from 'jsonwebtoken';


const accessTokenSecret = process.env.JWT_SECRET;

const authenticateJWT = (fu) => async(req, res) => {

    const token = req.headers.authorization.split(" ")[1];

    if(!token){
        return res.status(400);
    }

    jwt.verify(token, accessTokenSecret, async function(err, user) {
        if(!err && user){
            req.user = user;
            return await fu(req,res);
        }
        
        res.status(500).json('forbiden');
      });
};

export default authenticateJWT;