import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    gifs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Gif' }]
});




module.exports = mongoose.models.User || mongoose.model( 'User' , userSchema);
