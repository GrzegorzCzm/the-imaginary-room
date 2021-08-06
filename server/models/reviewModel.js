const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    review_text: String,
    user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    story: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Story'  
    },
    rating: Number,
    date: Date,
});

reviewSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;