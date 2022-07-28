import Gif from '../../../models/Gif';
import connectMongo from '../../../lib/connectMongo.js';
import authenticateJWT from '../../middleware/authJWT.js';

connectMongo();

export default authenticateJWT (async (req, res) => {
    // destructure query and method object from req
    const { method } = req;
    // gifsId it has to match the name of the file otherwise wont work
    const { gifsId } = req.query;

    if (method === 'PUT') {
        // get by user ID
        try {
            await Gif.findByIdAndUpdate(gifsId, {url: req.body.url});
            res.json({message: 'value updated', added: req.body.url});
        } catch (error) {
            console.log(error);
            res.status(400);
        }
    } else if (method === 'DELETE') {

        try {
            
            await Gif.findByIdAndDelete(gifsId);
            res.send('deleted');
            
        } catch (error) {
            console.log(error);
            res.status(400).json('error');
        }
    }else{
        res.send('Only PUT or DELETE are allowed from this route');
    }
})