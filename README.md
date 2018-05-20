# liri-node-app

Command line that takes different arguments and runs functions based on them. 

Functions:
my-tweets: will retrieve 20 latest tweets and when they were created from a fake twitter account.
spotify-this-song: passes a string to the spotify API and displays the artist, song name, preview url, and album of the results. Defaults to "The Sign" by Ace of Base.
movie-this: passes a string to the OMDB API and retrieves the title, release year, IMDB rating, Rotten Tomatoes rating, country of production, language, plot, and actors of the movie. Default output is Mr. Nobody.
do-what-it-says: takes the text from random.txt file and uses it to call one of the other commands. Should run 'spotify-this-song' for "I Want it That Way".