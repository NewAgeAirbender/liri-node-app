require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');


var keys = require('./keys.js');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


var chosen = process.argv[2];

switch (chosen) {
    case 'my-tweets':
        tweetIt();
        break;
    case 'spotify-this-song':
        songIt();
        break;
    case 'movie-this':
        movieIt();
        break;
    case 'do-what-it-says':
        doIt();
        break;
}

function tweetIt() {
    var name = { screen_name: 'ReillyRylie' };
    client.get(
        'search/tweets', name, function (error, tweets, response) {
            if (!error) {
                console.log(tweets);
            } else {
                console.log('An error occurred');
            }

        });
}

function songIt() {

}