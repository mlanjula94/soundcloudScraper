var mongoose = require("mongoose");

var Schema = mongoose.Schema;

//creating a schema to save Notes
var notesSchema = new Schema({
  _albumId: {
    type: Schema.Types.ObjectId,
    ref: "Headline"
  },
  arists: String,
  noteText: String
});

var Note = mongoose.model("Note", notesSchema);

module.exports = Note;
