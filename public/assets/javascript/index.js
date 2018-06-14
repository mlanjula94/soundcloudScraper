//loading css and html before js runs
$(document).ready(function () {
  //setting a album-contaoner div to set up dynamic content
  var albumContainer = $(".album-container");

  //event listener to dynamically generated "save albums" and "sacrape album" 
  $(document).on("click", ".btn.save", handleAlbumSave);
  $(document).on("click", ".scrape-new", handleAlbumScrape);

  //This function kick things off in the website 
  initPage();

  function initPage() {
    // Empty the album container
    albumContainer.empty();

    //Run an AJAX request for any unsaved headlines
    $.get("/api/albums?saved=false")
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
        "<h4>No new albums</h4>",
        "</div>",
        "<div class='panel panel-default'>",
        "<div class='panel-heading text-center'>",
        "<h3>What now?????</h3>",
        "</div>",
        "<div class='panel-body text-center'>",
        "<h4><a class='scrape-new'>Try scraping a new album</a></h4>",
        "</div>",
        "</div>"
      ].join(""));

    //Append data to page
    albumContainer.append(emptyAlert);
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

  function handleAlbumSave() {
    //This function triggers when the user ewants to save an album

    var albumToSave = $(this).parets(".panel").data();
    albumToSave.saved = true;

    //Using patch method becuase this an update to an existing record in our collection
    $.ajax({
      method: "PATCH",
      url: "/api/albums",
      data: articleToSave
    })
    .then(function(data){
      //if succecful mongoose will send back an object containing a key of "ok" with the value of 1

      if (data.ok) {
        initPage();
      }
    });
  }

  // This function triggers if user click "scrape new album"
  function handleAlbumScrape() {
    $.get("/api/fetch")
    .then(function(data){
      initPage();
      bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "<h3>");
    });
  }
})