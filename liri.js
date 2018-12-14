 require("dotenv").config();


const axios = require("axios");

var fs = require("fs");

var keys = require("./keys.js");

var moment = require("moment");

var Spotify = require('node-spotify-api');



var spotify = new Spotify(keys.spotify);


const command = process.argv[2];
const userInputs = process.argv.slice(3).join(" ");



function selectors (command, userInputs){
	
	switch(command){

	case "movie-this":
	getMovie(userInputs);
	break;


	case "spotify-this-song":
    getSong(userInputs);
    break;


	case "bands-this":
    getBand(userInputs);
    break;


	case "random-this":
    getRandom(userInputs);
    break;


	default:

	      console.log("Please enter one of the following commands: 'movie-this', 'spotify-this-song', 'bands-this', 'random-this' followed by parameter.");

	}
}

// //IMDB



function getMovie(userInputs){

    var movieName = userInputs;
if (process.argv[2] === undefined){
    movieName = 'mr nobody';
}  
   



// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";


console.log(queryUrl);

axios.get(queryUrl).then(
    function(response) {
      console.log("Title of the movie: " + response.data.Title);
      console.log("Release Year:" + response.data.Year);
      console.log("Rating:" + response.data.imdbRating);
      console.log("Rotten Rating:" + response.data.tomatoRating);
      console.log("Country:" + response.data.Country);
      console.log("Language:" + response.data.Language);
      console.log("Plot:" + response.data.Plot);
      console.log("Actors:" + response.data.Actors);
    }


  );



fs.appendFile('log.txt', movieName, function (err) {
    if (err) throw err;
});

movieName = movieName + ', ';
fs.appendFile('log.txt', movieName + '', function (err) {
    if (err) throw err;
});

console.log('Saved!');





//GET BANDS


};


function getBand(userInputs){
   
    var artist = userInputs;
if (process.argv[2] === undefined){
    artist = 'oasis';
} 



 
    

  


//Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

console.log(queryUrl);

axios.get(queryUrl).then(
    function(response) {
      console.log("Venue Name: " + response.data[0].venue.name);
      console.log("TIme of Show: " + response.data[0].datetime);
      console.log("City: " + response.data[0].venue.city);
 
    }
    
  );

  fs.appendFile('log.txt', artist, function (err) {
    if (err) throw err;

});


fs.appendFile('log.txt', artist + '', function (err) {
    if (err) throw err;
});

console.log('Saved!');
};

///SPOTIFY
function getSong(userInputs){
var spotify = new Spotify(keys.spotify);
var songName = userInputs;

if (process.argv[2] === undefined){
songName = 'the sign';
}  


//Callback to spotify to search for song name
spotify.search({ type: 'track', query: songName}, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    } 
    console.log("Artist: " + data.tracks.items[0].artists[0].name + 
    "Song name: " + data.tracks.items[0].name +
    "Album Name: " + data.tracks.items[0].album.name + 
    "Preview Link: " + data.tracks.items[0].preview_url); 
    
    //Creates a variable to save text into log.txt file
    var logSong = "Artist: " + data.tracks.items[0].artists[0].name + "\nSong name: " + data.tracks.items[0].name +
    "\nAlbum Name: " + data.tracks.items[0].album.name + "\nPreview Link: " + data.tracks.items[0].preview_url + "\n";
    
    //Appends text to log.txt file
    fs.appendFile('log.txt', logSong, function (err) {
        if (err) throw err;
      });

});
};

//Function for Random
function getRandom(){
    
    //Reads text in random.txt file
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        else {
        console.log(data);

        //creates a variable for data in random.txt
        var randomData = data.split(",");
        //passes data into getSong function
        commands(randomData[0], randomData[1]);
        }
        console.log("test" + randomData[0] + randomData[1]);
    });
};

// //Function to log results from the other functions
// function logResults(data){
//     fs.appendFile("log.txt", data, function(err) {
//       if (err)
//           throw err;
//     });
//   };

  selectors(command,userInputs);