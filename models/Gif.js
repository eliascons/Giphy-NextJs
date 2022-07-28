import mongoose from 'mongoose';

const gifSchema = new mongoose.Schema({
    url: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});


module.exports = mongoose.models.Gif || mongoose.model( 'Gif' ,gifSchema);

