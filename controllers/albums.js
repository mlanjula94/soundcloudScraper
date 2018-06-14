// bring in the scrape script
var scrape = require("../scripts/scrape");

//Bring in the albums and note mongoose models
var Albums = require("../models/albums");
//var Notes = require("../models/note");

module.exports = {
  fetch: function (cb) {
    scrape(function (data) {
      var albums = data;
      for (var i = 0; i < albums.length; i++) {
        albums[i].saved = false;
      }

      Albums.collection.insertMany(articles, {
        ordered: false
      }, function (err, docs) {
        cb(err, docs);
      });
    });
  },
  delete: function (query, cb) {
    Albums.remove(qurey, cb);
  },
  get: function (query, cb) {
    Albums.find(query)
      .sort({
        _id: -1
      })
      .exec(function (err, doc) {
        cb(doc);
      });
  },
  update: function (query, cb) {
    Albums.update({
      _id: query._id
    }, {
      $set: query
    }, {}, cb);
  }
};