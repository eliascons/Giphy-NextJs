
import Gif from '../../../models/Gif';
import connectMongo from '../../../lib/connectMongo.js';
import authenticateJWT from '../../middleware/authJWT.js';

connectMongo();

export default authenticateJWT( async function  handler(req, res) {
    
    const { method } = req;


    if (method === 'GET') {
        try {
            const data = await Gif.find({user: req.user.id});
            res.status(200).send(data)
           return Promise.resolve();
      
        } catch (error) {
            console.log(error);
            res.status(400);
        }
    } else if (method === 'POST') {

        try {
            const data = await Gif.create({ url: req.body.url, user: req.user.id});
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(400);
        }
    }else{
        res.json({message: 'Only GET or POST are allowed from this route'});
    }

});