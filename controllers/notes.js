
//Bring in the note mogoose models
var Note = require("../models/note");
//var Notes = require("../models/note");

module.exports = {
  delete: function (data, cb) {
    Note.remove({_id: data._id}, cb); 
  },
  get: function (data, cb) {
    Note.find({
      _albumId: data._id
    }, cb);
  },
  save: function (data, cb) {
    var newNote = {
      _albumId: data._id,
      noteText: data.noteText
    };

    Note.create(newNote, function (err, doc) {
      if(err) {
        console.log(err);
      }
      else {
        console.log(doc);
        cb(doc);
      }
    });
  }
}; 