import User from '../../../models/User.js';
import connectMongo from '../../../lib/connectMongo.js';

connectMongo();
export default async function handler(req, res) {
    const { method } = req;
    const { username, password } = req.body;

    if(method === 'POST'){
        console.log('test');
        let user = await User.findOne({ username: username });
        console.log(user);
        if(user){
            console.log('user exist');
            res.send('userExist');
            return;
        }else{
            try{
                const createdUser = await User.create({username: username, password: password});
                console.log(`created user ${createdUser}`);
                res.send(createdUser)
            }catch(error){
                console.log(error);
                res.status(400);
            }
        }
    }
}