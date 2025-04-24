const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    numberViews:{
        type:Number,
        default: 0
    },
    likes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    dislikes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    image:{
        type: String,
        default: 'https://static.wikia.nocookie.net/zenless-zone-zero/images/9/95/Wallpaper_Collection_002_-_05.png/revision/latest?cb=20230130022355'
    },
    author: {
        type: String,
        default: 'Admin'
    }
}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

//Export the model
module.exports = mongoose.model('Blog', blogSchema);