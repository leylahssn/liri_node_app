const dotenv = require("dotenv").config();

const axios = require("axios");

var moment = require('moment');

var keys = require("./keys.js");

var fs = require("fs");

var Spotify = require('node-spotify-api');
// var spotify = new Spotify(keys.spotify);
var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});

concertThis = url => {
  axios.get(url).then(
      function (response) {
        var date = moment(response.data[0].datetime).format("MM/DD/YYYY");
        console.log("Venue's Name: " + response.data[0].venue.name);
        console.log("Venue's Location: " + response.data[0].venue.country + ", " + response.data[0].venue.region + ", " + response.data[0].venue.city);
        console.log("Date of the event: " + date);


      })
    .catch(function (err) {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(err.response.data);
        console.log("---------------Status---------------");
        console.log(err.response.status);
        console.log("---------------Status---------------");
        console.log(err.response.headers);
      } else if (err.request) {
        // The request was made but no response was received
        // `err.request` is an object that comes back with details pertaining to the err that occurred.
        console.log(err.request);
      } else {
        // Something happened in setting up the request that triggered an err
        console.log("err", err.message);
      }
      console.log(err.config);
    });
}

spotifyThis = songIn => {
  spotify.search({
    type: 'track',
    query: songIn
  }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    var artist = "";
    for (let index = 0; index < data.tracks.items[0].artists.length; index++) {
      artist += data.tracks.items[0].artists[index].name + ", ";

    }

    console.log(`Artists: ${artist}`);
    console.log(`Song's  name: ${data.tracks.items[0].name}`);
    console.log(`Preview link of the song from Spotify: ${data.tracks.items[0].preview_url}`);
    console.log(`The album that the song is from: ${data.tracks.items[0].album.name}`)
  });
}
movieThis = url => {
  axios.get(url).then(
      function (response) {

        console.log(`Title of the movie: ${response.data.Title}`)
        console.log(`Year the movie came out: ${response.data.Year}`)
        console.log(`IMDB Rating of the movie: ${response.data.imdbRating}`)
        console.log(`Rotten Tomatoes Rating of the movie: ////////`)
        console.log(`Country where the movie was produced: ${response.data.Country}`)
        console.log(`Language of the movie: ${response.data.Language}`)
        console.log(`Plot of the movie: ${response.data.Plot}`)
        console.log(`Actors in the movie: ${response.data.Actors}`)
      })
    .catch(function (err) {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(err.response.data);
        console.log("---------------Status---------------");
        console.log(err.response.status);
        console.log("---------------Status---------------");
        console.log(err.response.headers);
      } else if (err.request) {
        // The request was made but no response was received
        // `err.request` is an object that comes back with details pertaining to the err that occurred.
        console.log(err.request);
      } else {
        // Something happened in setting up the request that triggered an err
        console.log("err", err.message);
      }
      console.log(err.config);
    });
}

if (process.argv[2] === `concert-this`) {

  var artist = process.argv.slice(3).join(" ");
  var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  concertThis(url);



} else if (process.argv[2] === `spotify-this-song`) {
  if (process.argv[3] == null) {
    spotify.search({
      type: 'track',
      query: "The Sign"
    }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      var artist = "";
      for (let index = 0; index < data.tracks.items[6].artists.length; index++) {
        artist += data.tracks.items[6].artists[index].name + ", ";

      }

      console.log(`Artists: ${artist}`);
      console.log(`Song's  name: ${data.tracks.items[6].name}`);
      console.log(`Preview link of the song from Spotify: ${data.tracks.items[6].preview_url}`);
      console.log(`The album that the song is from: ${data.tracks.items[6].album.name}`)
    });
  } else {
    var song = process.argv.slice(3).join(" ");
    spotifyThis(song);
  }

} else if (process.argv[2] === `movie-this`) {
  if (process.argv[3] == null) {
    const url = "https://www.omdbapi.com/?t=Mr. Nobody&y=&plot=short&apikey=trilogy";

    axios.get(url).then(
        function (response) {

          console.log(`Title of the movie: ${response.data.Title}`)
          console.log(`Year the movie came out: ${response.data.Year}`)
          console.log(`IMDB Rating of the movie: ${response.data.imdbRating}`)
          console.log(`Rotten Tomatoes Rating of the movie: ////////`)
          console.log(`Country where the movie was produced: ${response.data.Country}`)
          console.log(`Language of the movie: ${response.data.Language}`)
          console.log(`Plot of the movie: ${response.data.Plot}`)
          console.log(`Actors in the movie: ${response.data.Actors}`)
        })
      .catch(function (err) {
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("---------------Data---------------");
          console.log(err.response.data);
          console.log("---------------Status---------------");
          console.log(err.response.status);
          console.log("---------------Status---------------");
          console.log(err.response.headers);
        } else if (err.request) {
          // The request was made but no response was received
          // `err.request` is an object that comes back with details pertaining to the err that occurred.
          console.log(err.request);
        } else {
          // Something happened in setting up the request that triggered an err
          console.log("err", err.message);
        }
        console.log(err.config);
      });
  } else {
    const title = process.argv.slice(3).join(" ");
    const url = "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";
    movieThis(url);

  }

} else if (process.argv[2] === `do-what-it-says`) {
  fs.readFile("random.txt", "utf8", function (error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    // We will then print the contents of data
    console.log(data);

    // Then split it by commas (to make it more readable)
    const dataArr = data.split(",");

    // We will then re-display the content as an array for later use.
    if (dataArr[0] == "spotify-this-song") {
      spotifyThis(dataArr[1]);
    } else if (dataArr[0] == "concert-this") {
      var url = "https://rest.bandsintown.com/artists/" + dataArr[1] + "/events?app_id=codingbootcamp";
      concertThis(url);
    } else if (dataArr[0] == "movie-this") {
      var url = "https://www.omdbapi.com/?t=" + dataArr[1] + "&y=&plot=short&apikey=trilogy"
      movieThis(url);
    }

  });
}
