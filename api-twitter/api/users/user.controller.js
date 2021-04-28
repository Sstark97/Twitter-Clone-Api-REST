const fs = require('fs');

var users = [];

const postUsers = (req,res) => {
    loadDb();
    const user = req.body;

    let exist = users.filter(usuario => {
        if(usuario.userName == user.userName || usuario.email == user.email){
            return usuario;
        }

    });

    if(exist.length == 0){
        console.log("Va bien la cosa");
        if(typeof user.userName !== 'undefined' && user.userName != ''){
            if(typeof user.email !== 'undefined' && user.email != ''){
                users.push(user);
                fs.writeFileSync('./db.json',JSON.stringify(users));
                return res.status(200).json(user);
            } else {
                return res.status(400).send('The email is undefined');
            }
        } else {
            return res.status(400).send('The userName is undefined');
        }
    }

    return res.status(400).send('This user is already exist');
}

const deleteUser = (req,res) => {
    loadDb();
    const username = req.params.userName;
    const user = users.find(user => user.userName == username);

    if(user){
        users = users.filter(user => user.userName != username);
        tweetsController.deleteTweets(user.userName);
        console.log(users);
        fs.writeFileSync('./db.json',JSON.stringify(users));
        return res.status(200).json(user);
    }

    return res.status(404).send('This user not exist');
}

const userPatch = (req,res) => {
    loadDb();
    const username = req.params.userName;
    const usuario = req.body;

    const user = users.find(user => user.userName == username);
    console.log(user);

    if(user){
       
        if(typeof usuario.email !== 'undefined'){
            user.email = usuario.email;
        }
    
        if(typeof usuario.name !== 'undefined'){
            user.name = usuario.name;
        }
        
        fs.writeFileSync('./db.json',JSON.stringify(users));
        return res.status(200).json(user);
    }

    return res.status(404).send('This user not exist');
}

const loadDb = () => {
    users = JSON.parse(fs.readFileSync('./db.json'));
}

const putTweet = (tweet,owner) => {
    loadDb();

    user = users.find(user => user.userName == owner);
    user.tweets.push(tweet);

    fs.writeFileSync('./db.json',JSON.stringify(users));
}

const deleteTweet = (owner,id) => {
    loadDb();

    user = users.find(user => user.userName == owner);
    let tweets = user.tweets;
    user.tweets = tweets.filter(tweet => tweet != id);

    fs.writeFileSync('./db.json',JSON.stringify(users));
}

module.exports = {
    postUsers,
    deleteUser,
    userPatch,
    putTweet,
    deleteTweet
};

const tweetsController =  require('../tweets/tweets.controller');