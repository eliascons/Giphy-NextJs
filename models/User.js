// import mongoose from "mongoose";


// const userSchema = new mongoose.Schema({
//     username: { type: String, unique: true },
//     password: String,
//     gifs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Gif' }]
// });

// const User = mongoose.model('User', userSchema);

// module.exports = mongoose.models.User || User;

import mongoose from "mongoose";

const User = mongoose.model('User', mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    gifs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Gif'}]
}));

export default User;