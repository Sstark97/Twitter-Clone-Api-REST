const express = require('express');
const userRouter = require('./api/users');
const tweetRouter = require('./api/tweets');

const PORT = 5000;
const app = express();

//MiddleWares
app.use(express.json());

app.use('/users',userRouter);
app.use('/tweets',tweetRouter);

app.listen(PORT, () => {
    console.log(`Listen on port ${PORT}`);
});