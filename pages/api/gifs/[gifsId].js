import Gif from '../../../models/Gif';
import connectMongo from '../../../lib/connectMongo.js';

connectMongo();

export default async (req, res) => {
    // destructure query and method object from req
    const { method } = req;
    // gifsId it has to match the name of the file otherwise wont work
    const { gifsId } = req.query;

    if (method === 'GET') {
        // get by user ID
        try {
            const data = await Gif.find({ user: gifsId });
            res.json(data);
        } catch (error) {
            console.log(error);
            res.status(400);
        }
    } else if (method === 'POST') {
        // Post to backend by user create route  
        try {
            // this will change since we pass user ID from the JWT middleware as req.user
            const data = await Gif.create({ url: req.body.url, user: gifsId });
            console.log(`added ${data} to the db`);
            res.json(data);
        } catch (error) {
            console.log(error);
            res.status(400);
        }
    } else if (method === 'DELETE') {
        // Delete gif
        try {
            // this is the gif ID that we pass here
            await Gif.findByIdAndDelete(gifsId);
            console.log(`Deleted`);
            res.send("Deleted")
        } catch (error) {
            console.log(error);
            res.status(400);
        }
    }
}