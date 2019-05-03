require('dotenv').config();

var keys = require('./keys.js');
var spotify = new spotify(keys.spotify);

var userArgument = process.argv.slice(2);
var search = userArgument[0];

var movieUrl = 'http://www.omdbapi.com/?t=' + title + '&apikey=4aba57dd'
var bandUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

// change to conditional operator?
if (search === 'concert-this') {
  console.log('Searching for concert');
} else if (search === 'spotify-this-song') {
  console.log('Searching for song');
} else if (search === 'movie-this') {
  console.log('Searching for movie');
} else if (search === 'do-what-it-says') {
  console.log('Checking random.txt');
} else {
  console.log('That\'s not a valid command bro');
}