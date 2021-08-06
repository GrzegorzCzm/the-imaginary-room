const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const getDecodedToken = require('../utilities/getDecodedToken');
const User = require('../models/userModel');

usersRouter.post('/', async (request, response) => {
    const body = request.body;

    const saltRounds = 10;
    const password = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
        user_name: body.user_name,
        email: body.email,
        password: password,
        name: body.name,
        surname: body.surname,
        stories: body.stories
    });

    const savedUser = await user.save();

    response.json(savedUser);
});

usersRouter.get('/', async (request, response) => {
    const decodedToken = getDecodedToken(request);
    if(!decodedToken){
        return response.status(401).json({error: 'token is missing or invalid'});
    }
    const user = await User.findById(decodedToken.id);
    response.json(user);
})

module.exports = usersRouter;