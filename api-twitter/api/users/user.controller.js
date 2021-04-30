const USER = require('./user.model');

const getUser = (req,res) => {
    const owner = req.params.userName;
    const { projected } = req.query;

    if(projected){
        USER.findOne({userName:owner})
            .populate('tweetsId')
            .select({ tweetsId : { $slice : -10}})
            .then(doc => {
                if(typeof doc !== 'null'){
                    return res.status(200).json(doc);
                }
                return res.status(404).send('This user not have tweets');
            })
            .catch(error => res.status(404).send(error));
    } else {
        USER.findOne({userName:owner})
        .then(doc => {
            if(typeof doc !== 'null'){
                return res.status(200).json(doc);
            }
            return res.status(404).send('This user not exist');
        })
        .catch(error => res.status(404).send(error));
    }

    
        
}

const postUsers = (req,res) => {
    const user = req.body;
    USER.create(user)
        .then(doc => {
            return res.status(201).json(doc);
        })
        .catch(error => {
            if(error.code === 11000){
                return res.status(400).send('This user just exist');
            } else if(error.errors?.userName?.message === 'The userName is required'){
                return res.status(404).send(error.errors.userName.message);
            } else if(error.errors?.email?.message === 'The email is required'){
                return res.status(404).send(error.errors.email.message);
            }
        });
}

const deleteUser = (req,res) => {
    const username = req.params.userName;
   
    //Falta conectar con tweets
    USER.deleteOne({userName:username})
        .then(doc => {
            let resp = tweetsController.deleteTweets(username)
            if(doc?.deletedCount > 0){
                return res.status(200).json(doc);
            }

            return resp;
        })
        .then(resp => {
            if (resp !== 'OK'){
                res.status(404).send(resp);
            }
            return res.status(200).json(doc);
        })
        
}

const userPatch = (req,res) => {
    const username = req.params.userName;
    const usuario = req.body;

    USER.updateOne({userName:usuario.userName},{name:usuario.userName, email:usuario.email})
        .then(doc => res.status(202).json(doc))
        .catch(error => {
            if(error === 'The userName just exist'){
                return res.status(400).send(error);
            } else if(error === 'The userName is required'){
                return res.status(404).send(error);
            } else {
                return res.status(404).send(error);
            }
        })
}

const addTweetToUser = async (id,owner) => {
    await USER.updateOne({userName:owner},{$set: {tweetsId:tweets}})
    .then(doc => {
        console.log(doc);
        return res.status(200).json(doc);
    })
    .catch(error => {
        return res.status(404).send('This user not found');
    })
}

const deleteTweet = (owner,id) => {
    USER.updateOne({userName:owner},{$set: {tweetsId:tweetsId.filter(tweet => tweet.id != id)}})
    .then(doc => {
        return res.status(200).json(doc);
    })
    .catch(error => {
        return res.status(404).send('This user not found');
    })
}

module.exports = {
    postUsers,
    deleteUser,
    userPatch,
    addTweetToUser,
    deleteTweet,
    getUser
};

const tweetsController =  require('../tweets/tweets.controller');