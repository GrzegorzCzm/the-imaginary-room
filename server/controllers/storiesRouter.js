const storiesRouter = require('express').Router();
const Story = require('../models/storyModel');
const User = require('../models/userModel');
const getDecodedToken = require('../utilities/getDecodedToken');
const changeNext = require('../utilities/changeNext');

storiesRouter.post('/', async (request, response) => {
    const body = request.body;
    const decodedToken = getDecodedToken(request);
    if(!decodedToken.id){
        return response.status(401).json({error: 'token is missing or invalid'});
    }

    const user = await User.findById(decodedToken.id);

    const story = new Story({
        story_name: body.story_name,
        story_content: [],
        user: user._id,
        status: 'draft',
        publish_date: null,
        summary: body.summary,
        reviews: [],
        language: body.language,
        genres: body.story_genres
    });

    const savedStory = await story.save();
    user.stories = user.stories.concat(savedStory._id);
    await user.save();

    response.json(savedStory._id);
});

storiesRouter.get('/browseStories', async (request, response) => {
    const stories = await Story.find({status: 'published'}, '_id story_name user publish_date summary genres').populate('user', {name: 1, surname: 1});
    response.json(stories);
})

storiesRouter.get('/:id', async (request, response) => {
    const storyId = request.params.id;
    const story = await Story.findById(storyId);
    response.json(story);
});

storiesRouter.put('/:id', async (request, response) => {
    const storyId = request.params.id;
    const newStory = request.body;
    const story = await Story.findById(storyId);
    story.overwrite(newStory);
    const savedStory = await story.save();
    response.json(savedStory);
});

storiesRouter.put('/updateStoryNode/:id', async (request, response) => {
    const storyId = request.params.id;
    const newStoryNode = request.body;
    const story = await Story.findById(storyId);
    story.story_content = story.story_content.map(s => s.id === newStoryNode.id ? newStoryNode : s);
    const savedStory = await story.save();
    response.json(savedStory.story_content);
});

storiesRouter.put('/createStoryNode/:id', async (request, response) => {
    const storyId = request.params.id;
    const newStoryNode = request.body;
    const story = await Story.findById(storyId);
    story.story_content = story.story_content.map(s =>  s.node_id >= newStoryNode.node_id ? changeNext(s, 'increment') : s); //.map is not an in-place method, so it doesn't apply the chagne to the array. That's why I reset it to itself.
    story.story_content = story.story_content.concat(newStoryNode);
    story.story_content.sort((a, b) => a.node_id - b.node_id); //sort is an in-palce method, so no need to assign it to itself.
    const savedStory = await story.save();
    response.json(savedStory.story_content);
});

storiesRouter.put('/deleteStoryNode/:id', async (request, response) => {
    const storyId = request.params.id;
    const nodeToDelete = request.body.node_id;
    const story = await Story.findById(storyId);
    story.story_content = story.story_content.filter(s => s.node_id !== nodeToDelete); //Filtering the deleted node out.
    story.story_content = story.story_content.map(s => s.node_id > nodeToDelete ? changeNext(s, 'decrement') : s);
    const savedStory = await story.save();
    response.json(savedStory.story_content);
})

module.exports = storiesRouter;