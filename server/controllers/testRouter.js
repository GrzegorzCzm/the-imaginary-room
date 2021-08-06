const testRouter = require('express').Router();

testRouter.get('/', (req, res) => {
    res.send('TEST ROUTER');
});

module.exports = testRouter;