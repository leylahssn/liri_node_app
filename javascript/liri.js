require("dotenv").config();
// const keys = require('./keys');
const axios = require('axios'); 
const moment = require('moment');
// const spotify = require('node-spotify-api');
const command = process.argv[2];
console.log(command);


if (command === "spotify") {
    console.log("spotify");
    console.log(process.env.SPOTIFY_ID)
}