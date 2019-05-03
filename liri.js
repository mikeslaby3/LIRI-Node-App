// ==============================
// Global Variables and Functions
// ==============================

require('dotenv').config();
var axios = require('axios');
var fs = require('fs');
var keys = require('./keys.js');

// var spotify = new spotify(keys.spotify);

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

// ====================
// Bands In Town API
// ====================

// var bandUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
