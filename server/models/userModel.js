const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_name: String,
    email: String,
    password: String,
    name: String,
    surname: String,
    stories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Story'
        }
    ]
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;