import User from '../../../models/User.js';
import connectMongo from '../../../lib/connectMongo.js';

connectMongo();
export default async function handler(req, res) {
    const { method } = req;
    const { username, password } = req.body;

    if(method === 'POST'){
        let user = await User.findOne({ username: username });
        
        if(user){            
            res.status(409).json({message: 'User already exists!'});
            return;
        }else{
            try{
                const createdUser = await User.create({username: username, password: password});
                res.status(200).json({message: 'Created user successfully!'});
            }catch(error){
                console.log(error);
                res.status(400);
            }
        }
    }
}