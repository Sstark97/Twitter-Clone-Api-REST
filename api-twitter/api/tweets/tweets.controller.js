const TWEET = require('./tweets.model');
const USER = require('../users/user.model');

//POST que sube un tweet por parte de un usuario
const postTweet = async (req,res) => {

    const tweet = req.body;
    const owner = req.body.owner;
    const user = await USER.findOne({userName:owner});

    TWEET.create(tweet)
        .then(doc => {
            let exist = user.tweetsId.find(id => id == doc._id);
            user.tweetsId.push(doc._id);
            user.save()
            
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
        .then(async doc => {
            let owner = doc.owner;
            const user = await USER.findOne({userName:owner});
            user.tweetsId = user.tweetsId.filter(tweet => tweet != String(doc._id));
        
            user.save();
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