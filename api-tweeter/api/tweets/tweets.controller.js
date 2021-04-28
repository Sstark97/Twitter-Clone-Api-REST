const fs = require('fs');

var tweets = [];
var users = [];


//POST que sube un tweet por parte de un usuario
const postTweet = (req,res) => {
    let id = lowDb();
    const owner = req.body.owner;
    const tweet = req.body;
    const user = users.find(user => user.userName == owner);

    if(user){
        
        if(typeof tweet.text !== 'undefined' && tweet.text != ''){

            id++;
            tweet.id = id;
            //user.tweets.push(id);
            userController.putTweet(id,owner);
            tweets.push(tweet);
            updateDb();
            return res.status(200).json(user);

        } else {
            return res.status(404).send('The text is undefined');
        }
        
    }

    return res.status(404).send('This owner not exist');

}


//GET tweet buscado por su id
const getTweet = (req,res) =>  {
    lowDb();
    const id = req.params.id;
    const tweet = tweets.find(tweet => tweet.id == id);

    if(tweet){

        return res.status(200).json(tweet);

    }

    return res.status(404).send('This tweet not exist');

}


//DELETE un tweet por su id
const deleteTweet = (req,res) => {
    lowDb();
    const id = req.params.id;
    const tweet = tweets.find(tweet => tweet.id == id);

    if(tweet){

        //user.tweets = user.tweets.filter(tweet => tweet.id != id);
        userController.deleteTweet(tweet.owner,+id);
        tweets = tweets.filter(tweet => tweet.id != id);
        updateDb()
        return res.status(200).json(tweet);
        
    }

    return res.status(404).send('This tweet not exist');

}


const lowDb = () => {
    users = JSON.parse(fs.readFileSync('./db.json'));
    tweets = JSON.parse(fs.readFileSync('./tweet.json'));
    let id = 0;
    if(tweets.length != 0){
        id = +tweets[tweets.length-1].id;
    }

    return id;
}

const updateDb = () => {
    fs.writeFileSync('./tweet.json',JSON.stringify(tweets));
}

const deleteTweets = (owner) => {
    lowDb();
    tweets = tweets.filter(tweet => tweet.owner != owner);
    updateDb();
}

module.exports = {
    postTweet,
    getTweet,
    deleteTweet,
    deleteTweets
}

const userController = require('../users/user.controller')