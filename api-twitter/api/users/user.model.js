const mongoose = require('mongoose');

const USERschema = mongoose.Schema({
    userName: {
        type: String,
        unique: [true,'The userName just exist'],
        required: [true, 'The userName is required']
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'The email is required']
    },
    tweetsId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tweet',
    }]
});

const USER = mongoose.model('user', USERschema);

module.exports = USER;
