require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');


var keys = require('./keys.js');
var spotify = new Spotify(keys.spotify);
var chosen = process.argv[2];
//empty variable for multiple word movie or song title inputs
var nodeArgs = process.argv;
//variable for the first param - command
var command = process.argv[2];
// Create an empty variable for holding the nodeArgs params
var title = "";
//for loop to chain together multiple word inputs and store them in the title variable
for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        title = title + " " + nodeArgs[i];
    } else {
        title += nodeArgs[i];
    }
};

var chosen = process.argv[2];

switch (chosen) {
    case 'my-tweets':
        tweetIt();
        break;
    case 'spotify-this-song':
        songIt(title);
        break;
    case 'movie-this':
        movieIt();
        break;
    case 'do-what-it-says':
        doIt();
        break;
}

function tweetIt() {
    var client = new Twitter(keys.twitter);

    var name = { userName: 'ReillyRylie', count: 20 };
    client.get(
        'search/tweets', name, function (error, tweets, response) {
            if (!error) {
                console.log(tweets);
            } else {
                console.log("You have issues.");
                console.log(error);
            }

        });
}

function songIt(song) {
    if (song != "") {
        spotify.search({ type: 'track', query: 'song' }, function (error, data) {
            if (!error) {
                console.log("------------------");
                for (var i = 0; i < data.tracks.items.length; i++) {
                    var songData = data.tracks.items[i];
                    console.log("Artist: " + songData.artists[0].name + "\nSong: " + songData.name + "\nURL: " + songData.preview_url + "\nAlbum: " + songData.album.name);
                    console.log("----------------");
                }
            }
            else {
                console.log("You have issues.");
            }
        });
    }
    else {
        var special = { type: 'track', id: '3DYVWvPh3kGwPasp7yjahc' };
        spotify.lookup(special, function (error, data) {
            if (!error) {
                console.log("------------------");
                for (var i = 0; i < data.tracks.items.length; i++) {
                    var songData = data.tracks.items[i];
                    console.log("Artist: " + songData.artists[0].name + "\nSong: " + songData.name + "\nURL: " + songData.preview_url + "\nAlbum: " + songData.album.name);
                    console.log("----------------");
                }
            }
            else {
                console.log("You have issues.");
            }
        });
    }
}
