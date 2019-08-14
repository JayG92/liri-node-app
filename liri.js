require("dotenv").config();
// variables//
const fs = require("fs");
const keys = require("./keys.js");
const axios = require("axios");
const moment = require("moment");
const Spotify = require('node-spotify-api');
const request = require("request")

const spotify = new Spotify(keys.spotify);

let action = process.argv[2];
let userInput = process.argv.slice(3).join(" ");

// switches for commands
function inputRequest(action, userInput) {
    switch (action) {
        case "concert-this":
            concertThis(userInput);
            break;

        case "movie-this":
            movieThis(userInput);
            break;
        case "spotify-this-song":
            spotifyThis(userInput);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
    }
}
inputRequest(action, userInput);
// end of switch commands

// start concert-this//
// works//
function concertThis() {

    var queryURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=" + keys.bandsInTown;

    axios.get(queryURL).then(
        function (bandResponse) {
            console.log(userInput)
            console.log("Venue: " + bandResponse.data[0].venue.name);
            console.log("City: " + bandResponse.data[0].venue.city);
            console.log(moment(bandResponse.data[0].datetime).format("MM/DD/YYYY"));
        })
        .catch(function (error) {
            if (error.response) {
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("No upcoming shows for this artist ");
            }
            if (process.argv[2] === "concert-this") {
                // concertThis();
            }
        });
}
// end of bandsinTown// (working)


// start of movie-this//
function movieThis() {
    var queryUrl = 'http://www.omdbapi.com/?t=' + userInput + '&y=&plot=short&apikey=trilogy';
    axios.get(queryUrl).then(
        function (response) {
            console.log('Title: ' + response.data.Title);
            console.log('Release Year: ' + response.data.Year);
            console.log('IMDB Rating: ' + response.data.imdbRating);
            console.log('Rotten Tomato Rating: ' + response.data.Ratings[1].Value);
            console.log('Country Produced: ' + response.data.Country);
            console.log('Language: ' + response.data.Language);
            console.log('Plot: ' + response.data.Plot);
            console.log('Cast: ' + response.data.Actors);
        })
        .catch(function (error) {
            if (error.response) {
                console.log('---------------Data---------------');
                console.log(error.response.data);
                console.log('---------------Status---------------');
                console.log(error.response.status);
                console.log('---------------Status---------------');
                console.log(error.response.headers);
            }
            else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        });
};
//  end of movie-this//(working)


// start of spotify
function spotifyThis() {

    // if (userInput === undefined) {
    //     userInput === "The Sign ace"}

    spotify.search({
        type: 'track',
        query: userInput,
        limit: 1
    },
        function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            let artistName = data.tracks.items[0].album.artists[0].name;
            let albumName = data.tracks.items[0].album.name;
            let songName = data.tracks.items[0].name;
            let songURL = data.tracks.items[0].external_urls.spotify;

            console.log('Artist: ' + artistName);
            console.log('Song: ' + songName);
            console.log('URL: ' + songURL);
            console.log('Album: ' + albumName);
        })
};
// end of spotifyThis //

// start of doWhatItSays //
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return consol.log(error);
        } else {
            let result = data.split(",");
            for (var i = 0; i < result.length; i++) {
                console.log(result);
            }
        }
    });
};
// inputRequest(action, userInput);