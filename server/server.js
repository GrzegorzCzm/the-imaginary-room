require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//Import routes:
const usersRouter = require('./controllers/usersRouter');
const storiesRouter = require('./controllers/storiesRouter');
const reviewsRouter = require('./controllers/reviewsRouter');
const loginRouter = require('./controllers/loginRouter');
const testRouter = require('./controllers/testRouter');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', usersRouter);
app.use('/api/stories', storiesRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/login', loginRouter);
app.use('/api/test', testRouter);

//MongoDB Setup
const password = process.env.DB_PASSWORD;
const url = `mongodb+srv://yanki:${password}@cluster0.b8yya.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true, useCreateIndex: true});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server is running on the port ${PORT}`));