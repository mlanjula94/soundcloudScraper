var mongoose = require("mongoose");

var Schema = mongoose.Schema;

//creating a schema to save Albums
var albumSchema = new Schema({
  album: {
    type: String,
    required: true,
    unique: true
  },
  arists: {
    type: String,
    required: true
  }
});

var Album = mongoose.model("Album", albumSchema);

module.exports = Album;
