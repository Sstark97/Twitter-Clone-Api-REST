const TWEET = require('./tweets.model');

var tweets = [];
var users = [];


//POST que sube un tweet por parte de un usuario
const postTweet = (req,res) => {

    const tweet = req.body;

    TWEET.create(tweet)
        .then(doc => {
            //userController.addTweetToUser(tweet._id,tweet.owner)
            return res.status(201).json(doc);
        })
        .catch(error => {
             if(error === "The owner is required"){
                return res.status(404).send(error);
            } else {
                return res.status(404).send(error);
            }
        });
    
}


//GET tweet buscado por su id
const getTweet = (req,res) =>  {
    const id = req.params.id;

    TWEET.findOne({_id:id})
        .then(doc => res.status(200).json(doc))
        .catch(error => {
            return res.status(404).send('This tweet not exist');
        });

}


//DELETE un tweet por su id
const deleteTweet = (req,res) => {
    const id = req.params.id;

    TWEET.findOneAndDelete({_id:id})
        .then(doc => {
            //userController.deleteTweet(doc.owner,id);
            return res.status(202).json(doc);
        })
        .catch(error => {
            
            return res.status(404).send('This tweet not exist');
        });

}

const deleteTweets = (userName) => {
    let res = TWEET.deleteMany({owner:userName})
        .then(doc => {
            if(doc?.deletedCount > 0){
                return 'OK';
            } 
            console.log('Fail');
            return 'This operation failed';
        })
    return res;
}        

module.exports = {
    postTweet,
    getTweet,
    deleteTweet,
    deleteTweets
}

const userController = require('../users/user.controller')