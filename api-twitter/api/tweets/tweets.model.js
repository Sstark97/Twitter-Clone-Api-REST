const mongoose = require('mongoose');
const USER = require('../users/user.model');

const TWEETschema = mongoose.Schema({
    text: {
        type: String,
    },
    owner: {
        type: String,
        required: [true, 'The owner is required'],
        validate: {
            validator: (owner) => {
            return USER.find({userName:owner})
                .then(doc => {
                    if(doc.length === 0){
                        return false;
                    }
                    return true;
                })
                .catch(error => false);
            },
            message: "This user not exist"
            
        }
    },
    createdAt: String
});

const TWEET = mongoose.model('tweet', TWEETschema);

module.exports = TWEET;