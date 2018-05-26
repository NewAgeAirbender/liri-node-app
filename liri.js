//sets up the keys, twitter, and spotify
require("dotenv").config();
var keys = require('./keys.js');
var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require("fs");

//makes it easier to read
var divider = "\n------------------------------------------------------------\n\n";

//empty variable for multiple word movie or song title inputs
var nodeArgs = process.argv;
//variable for the first param - command
var chosen = process.argv[2];
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

doSomething(chosen, title);

//need to include the default cases
function doSomething(chosen, title) {
    switch (chosen) {
        case 'my-tweets':
            tweetIt();
            break;
        case 'spotify-this-song':
            songIt(title);
            break;
        case 'movie-this':
            movieIt(title);
            break;
        case 'do-what-it-says':
            doIt();
            break;
    }
}

//pulls maybe 20 tweets from my fake twitter
function tweetIt() {
    var client = new Twitter(keys.twitter);

    var myTwitter = 997195376393322497;
    var name = { follow: myTwitter, count: 20 };
    client.get(
        'statuses/user_timeline/', name, function (error, tweets, response) {
            if (!error) {
                for (var i = 0; i < tweets.length; i++) {
                    console.log([i + 1] + '. ' + tweets[i].text);
                    console.log('Tweeted on: ' + tweets[i].created_at);
                    console.log(divider);
                }
            } else {
                console.log("You have issues.");
                console.log(error);
            }

        });
}

//function to pull info from spotify
function songIt(song) {
    //sets up the key
    var spotify = new Spotify(keys.spotify);
    //if there is are other arguments in the terminal line, it searches for that given string
    if (song != "") {
        spotify.search({ type: 'track', query: song }, function (error, data) {
            if (!error) {
                console.log(divider);
                //prints artist, song name, preview url, and album name
                for (var i = 0; i < data.tracks.items.length; i++) {
                    var songData = data.tracks.items[i];
                    console.log("Artist: " + songData.artists[0].name + "\nSong: " + songData.name + "\nURL: " + songData.preview_url + "\nAlbum: " + songData.album.name);
                    console.log(divider);
                }
            }
            else {
                console.log("You have issues.");
            }
        });
    }
    //default to given song
    else {
        var special = { type: 'track', id: '3DYVWvPh3kGwPasp7yjahc' };
        spotify.lookup(special, function (error, data) {
            if (!error) {
                console.log(divider);
                for (var i = 0; i < data.tracks.items.length; i++) {
                    var songData = data.tracks.items[i];
                    console.log("Artist: " + songData.artists[0].name + "\nSong: " + songData.name + "\nURL: " + songData.preview_url + "\nAlbum: " + songData.album.name);
                    console.log(divider);
                }
            }
            else {
                console.log("You have issues.");
            }
        });
    }
}

//function to pull the movie shit
function movieIt(title) {
    //creates the query url
    var URL = "http://www.omdbapi.com/?apikey=trilogy&t=" + title;

    //requests, saves the info, then logs it to file
    request(URL, function (err, response, body) {
        var data = JSON.parse(body);
        //console.log(data);

        var movieData = [
            "Movie: " + data.Title,
            "Released: " + data.Released,
            "IMDB Rating: " + data.Ratings[0].Value,
            "Rotten Tomatos Rating: " + data.Ratings[1].Value,
            "Country of Origin: " + data.Country,
            "Language: " + data.Language,
            "Plot: " + data.Plot,
            "Players: " + data.Actors
        ].join('\n');

        fs.appendFile('log.txt', movieData + divider, function (err) {
            if (err) throw err;
            console.log(movieData);
        });
    });

}

//function that pulls from the random file
//need this to work properly to be done
function doIt() {

    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");
        console.log(dataArr);
        doSomething(dataArr[0], dataArr[1]);
    });
}