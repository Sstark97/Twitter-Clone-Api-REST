const router = require('express').Router();
const tweetsController = require('./tweets.controller');

router.get('/:id',tweetsController.getTweet);
router.get('/',tweetsController.getTweets);
router.delete('/:id',tweetsController.deleteTweet);
router.post('/',tweetsController.postTweet);

module.exports = router;