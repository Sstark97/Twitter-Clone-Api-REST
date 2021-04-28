# Twitter-Api-Clone

------------

## Description
This is a simple version of the API-restfull of Twitter. In these case without any database. In these case I use fs module to simulate my db. I have two JSON's files, the db.json(I push here my users), and the tweets.json(Here you have the tweets). I create the server on port 5000. I support my api with two routers and two controllers.

#### Users Structure
```json
{
	username* : string<uniq>

	name? : string

	email* : string

	tweetsIDs : string[]
}
```

#### Tweets Structure
```json
{
	id* : string<uniq>

	text : string

	owner : string<ID>

	createdAt : timestamp
}
```
### Installation
Firts of all you must install node dependencies:
> npm install

------------

### Functions
In these API you must have these operations:
*Create a new user : POST("..../users")

*Delete a user: DELETE(.../users/:userName)

*Modify the user's name or the user's email: PATCH(.../users/:userName)

*Post a user's new tweet: POST(.../tweets) You must send a owner in the req.body

*Search a tweet with the tweet.id: GET(.../tweets/:id)

*Delete a tweet with the tweet.id: DELETE(.../tweets/:id)