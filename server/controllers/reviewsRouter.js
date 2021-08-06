const reviewsRouter = require('express').Router();
const Review = require('../models/reviewModel');

reviewsRouter.post('/', async (request, response) => {
    const body = request.body;

    const review = new Review({
        review_text: body.review_text,
        user: body.user,
        story: body.story,
        rating: body.rating,
        date: body.date,
    });

    const savedReview = await review.save();

    response.json(savedReview);
});

module.exports = reviewsRouter;