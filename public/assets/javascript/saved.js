//loading css and html before js runs
$(document).ready(function () {
  //setting a album-contaoner div to set up dynamic content
  var albumContainer = $(".album-container");

  //event listener to dynamically generated "save albums" and "sacrape album" 
  $(document).on("click", ".btn.delete", handleAlbumDelete);
  $(document).on("click", ".btn.notes", handleAlbumNotes);
  $(document).on("click", ".btn.save", handleNoteSave);
  $(document).on("click", ".btn.note-delete", handleNoteDelete);

  //This function kick things off in the website 
  initPage();

  function initPage() {
    // Empty the album container
    albumContainer.empty();
    //Run an AJAX request for any unsaved headlines
    $.get("/api/albums?saved=true")
      .then(function (data) {
        // If we albums render them to the page
        if (data && data.length) {
          renderAlbums(data);
        }
        //If not message "we have no albums"
        else {
          renderEmpty();
        }
      });
  }

  function renderEmpty() {
    var emptyAlert =
      $(["<div class='alert alert-warning text-center'>",
        "<h4>No saved Album</h4>",
        "</div>",
        "<div class='panel panel-default'>",
        "<div class='panel-heading text-center'>",
        "<h3>What now?????</h3>",
        "</div>",
        "<div class='panel-body text-center'>",
        "<h4><a href='/'>Try Browse Album</a></h4>",
        "</div>",
        "</div>"
      ].join(""));

    //Append data to page
    albumContainer.append(emptyAlert);
  }

  function renderNotesList(data) {
    var notesToRender = [];
    var currentNote;

    if (!data.notes.length) {
      currentNote = [
        "<li class='list-group-item'>","Not Notes For this Album yet","</li>"
      ].join("");
      notesToRender.push(currentNote);
    }
    else {
      //If we have notes go thru each one
      for (var i = 0; i < data.notes.length; i++) {
        currentNote = $([
          "<li class='list-group-item  note'>",
          data.notes[i].notetext,
          "<button class='btn btn-danger note-delete'>x</button>",
          "</li>"
        ].join(""));

        CurrentNote.children("button").dta("_id", data.notes[i]._id);
        notesToRender.push(currentNote);
      }
    }
    $(".note-container").append(notesToRender);
  }

  //This function appends albums to the html 
  function renderAlbums(albums) {
    var albumPanel = [];

    for (var i = 0; i < albums.length; i++) {
      albumPanel.push(createPanel(albums[i]));
    }
    albumContainer.append(albumPanel);
  }

  function createPanel(albums) {
    var panel =
      $(["div class='panel panel-default'>",
        "<div class=panel-heading'>",
        "<h3>",
        albums.album,
        "<a class='btn btn-warning save'",
        "Save Album",
        "</a></h3></div>",
        "<div clas='panel-body'>",
        albums.artist,
        "</div></div>"
      ].join(""));

    //attach the article's id to the jQuery elemet
    panel.data("_id", albums._id);
    //return the constructed panel jQuery element
    return panel;
  }

  function handleAlbumDelete() {
    var albumToDelete = $(this).parents(".panel").data();
    $.ajax({
      method: "DELETE",
      url: "/api/albums/"+ albumToDelete._id
    }).then(function(data) {
      if(data.ok) {
        initPage();
      }
    });
  }
  
  //Apending notes model
  function handleAlbumNotes() {
    var currentAlbum =$(this).parents(".panel").data();
 
    //Grab any notes with this headline/article id
    $.get("/api/notes" + currentAlbum._id).then(function(data){
      var modalText = [
        "<div class='container-fluid text-center'>",
        "<h4>Notes For Album: ",
        "</h4>",
        "<hr>",
        "<ul class=list-group note container'>",
        "</ul>",
        "<textarea placeholder='New Note' rows='4' cols='60'></textarea>",
        "button class='btn btn-success save'>Save Note</tton>",
        "</div>"
      ].join("");
      //adding formated HTML to the note modal  
      bootbox.dialog({
        message: modalText,
        closeButton: true
      });
      var noteData = {
        _id: currentAlbum._id,
        notes: data || []
      };
      $(".btn.save").data("article", noteData);

      renderNotesList(noteData)
    })

  }


  function handleNoteSave() {
    //This function triggers when the user ewants to save an album

   var noteData;
   var newNote = $(".bootbox textarea").val().trim();

   if (newNote) {
    noteData = {
      _id: $(this).data("article")._id,
      noteText: newNote
    };
    $.post("/api/notes", noteData).then(function() {
      bootbox.hideAll();
    });
   }
  }

  // This function triggers if user click "scrape new album"
  function handleNoteDelete() {
    var noteToDelete = $(this).data("_id");

    $.ajax({
      url: "/api/notes" + noteToDelete,
      method: "DELETE"
    }).then(function() {
      bootbox.hideAll();
    })
  }
})