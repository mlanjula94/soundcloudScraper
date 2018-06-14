// Require request and cheerio, making our scrapes possible
var request = require("request");
var cheerio = require("cheerio");

var scrape = function(cb){
  request("https://soundcloud.com/", function(err, res, body){
    var $ = cheerio.load(body);

    var albums = [];

    $(".playableTile__description").each(function(i, element){
      var album = $(this).children(".playableTile__descriptionContainer").children(".playableTile__mainHeading").text().trim();
      var artist = $(this).children(".playableTile__usernameHeadingContainer").children(".playableTile__usernameHeading ").text().trim();

      if(album && artist){
        var data = {
          album: album,
          artist: artist};

          albums.push(data);
      }
    });
    cb(albums);
  });
};

module.exports = scrape;
