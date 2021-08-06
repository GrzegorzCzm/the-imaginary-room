const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    story_name: String,
    story_content: Array,
    user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    status: String,
    publish_date: String,
    summary: String,
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    language: String,
    genres: Array
});

storySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;