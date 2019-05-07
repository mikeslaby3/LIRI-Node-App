// ==============================
// Global Variables and Functions
// ==============================

require('dotenv').config();

var axios = require('axios');
var fs = require('fs');
var keys = require('./keys.js');
var moment = require('moment');
moment().format();

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

function getUserArguments() {
    return process.argv.slice(2);
}

function getSearchType() {
    return getUserArguments()[0];
}

function getSearchTerm() {
    return getUserArguments().slice(1).join("*");
}

// ====================
// Movie API
// ====================

function buildMovieUrl(movieTitle) {
    return 'http://www.omdbapi.com/?t=' + movieTitle + '&apikey=4aba57dd'
}

function displayMovieData(movieData) {
    const movie = movieData
    console.log('\n');
    console.log('Title: ' + movie.Title);
    console.log('Release Year: ' + movie.Year);
    console.log('IMDB Rating: ' + movie.imdbRating);
    console.log('Rotten Tomatoes Rating: ' + movie.Ratings[1].Value);
    console.log('Country: ' + movie.Country);
    console.log('Language(s): ' + movie.Language);
    console.log('Plot: ' + movie.Plot);
    console.log('Actors: ' + movie.Actors);
    console.log('\n');
}

function findMovieData(movieTitle) {
    axios
        .get(buildMovieUrl(movieTitle))
        .then(function (response) {
            const movieData = response.data;
            displayMovieData(movieData);
        })
        .catch(function (error) {
            console.log(error);
        })
}

function searchMovie() {
    const movieTitle = getSearchTerm();

    if (getSearchType() === 'movie-this') {
        console.log('Finding movie data!')
        if (movieTitle === '') {
            findMovieData('Mr. Nobody')
        } else {
            findMovieData(movieTitle);
        }
    }
}

searchMovie();

// ====================
// Spotify API
// ====================

function findSongData(songTitle) {
    spotify.search({ type: 'track', query: songTitle }, function (err, data) {
        if (err) {
            console.log("Can't find the song you're looking for")
            findSongData('The Sign by Ace of Base');
            return;
        }
        console.log('\n');
        console.log('Song Title: ' + data.tracks.items[0].name);
        console.log('Artist(s): ' + data.tracks.items[0].artists[0].name);
        console.log('Album: ' + data.tracks.items[0].album.name);
        console.log('Preview: ' + data.tracks.items[0].preview_url);
        console.log('\n');
    });
}

function searchSong() {
    const songTitle = getSearchTerm();

    if (getSearchType() === 'spotify-this-song') {
        console.log('Finding song data!')
        findSongData(songTitle);
    }
}

searchSong();

// ====================
// Bands In Town API
// ====================

function buildArtistUrl(artistName) {
    return 'https://rest.bandsintown.com/artists/' + artistName + '/events?app_id=codingbootcamp'
}

function displayConcertData(concertData) {
    const concert = concertData
    console.log('\n');
    console.log('First concert:');
    console.log('Artist(s): ' + concert[0].lineup[0]);
    console.log('Venue: ' + concert[0].venue.name);
    console.log('Location: ' + concert[0].venue.city + ', ' + concert[0].venue.region + ', ' + concert[0].venue.country);
    console.log('Concert Date: ' + formatDateAndTime(concert[0].datetime));
    console.log('\n');
    console.log('Second concert:');
    console.log('Artist(s): ' + concert[1].lineup[0]);
    console.log('Venue: ' + concert[1].venue.name);
    console.log('Location: ' + concert[1].venue.city + ', ' + concert[1].venue.region + ', ' + concert[1].venue.country);
    console.log('Concert Date: ' + formatDateAndTime(concert[1].datetime));
    console.log('\n');
    console.log('Third concert:');
    console.log('Artist(s): ' + concert[2].lineup[0]);
    console.log('Venue: ' + concert[2].venue.name);
    console.log('Location: ' + concert[2].venue.city + ', ' + concert[2].venue.region + ', ' + concert[2].venue.country);
    console.log('Concert Date: ' + formatDateAndTime(concert[2].datetime));
    console.log('\n');
}

function findConcertData(artistName) {
    axios
        .get(buildArtistUrl(artistName))
        .then(function (response) {
            const concertData = response.data;
            displayConcertData(concertData);
        })
        .catch(function (error) {
            console.log(error);
        })
}

function searchArtist() {
    const artistName = getSearchTerm();

    if (getSearchType() === 'concert-this') {
        console.log('Finding next three concerts!')
        if (artistName === '') {
            findConcertData('Blink 182')
        } else {
            findConcertData(artistName);
        }
    }
}

function formatDateAndTime(dateAndTime) {
    const T = dateAndTime.indexOf('T');
    const formattedDate = moment(dateAndTime.slice(0,T), 'YYYY-MM-DD').format('MM/DD/YYYY');

    return formattedDate;
}

searchArtist();

// ====================
// Text File Command
// ====================

function findTextFileData() {

    fs.readFile("random.txt", "utf8", function(err, file) {
        if (err) {
            return console.log(err);
        }
        console.log(file);
        
        let textFile = file.split(",");
        const randomTextSearchType = textFile[0];
        const randomTextSearchTerm = textFile[1];

        switch (randomTextSearchType) {
            case "concert-this":
                findConcertData(randomTextSearchTerm)
                break;
        
            case "spotify-this-song":
                findSongData(randomTextSearchTerm);
                break;
        
            case "movie-this":
                findMovieData(randomTextSearchTerm);
                break;
        
            default:
                console.log("Can't read random text format");
        }
        
    });
    
}

function searchTextFile() {
    if (getSearchType() === 'do-what-it-says') {
        console.log('Finding what the text file says')
        findTextFileData();
    }
}

searchTextFile();
