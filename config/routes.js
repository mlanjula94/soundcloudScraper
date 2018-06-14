// bring in the scrape script
var scrape = require("../scripts/scrape");

//bring in albums and notes from controller
var albumController = require("../controllers/albums");
var notesController = require("../controllers/notes");

module.exports = function(router){
  //This route renders home page
  router.get("/", function (req, res) {
    res.render("home");
  });
   //This route renders saved handlebars page
   router.get("/saved", function (req, res) {
    res.render("saved");
  }); 

  //fetching data from sound cloud
  router.get("/api/fetch", function(req, res){
    albumController.fetch(function(err, docs) {
      if (!docs ||docs.insertCount === 0) {
        res.json ({ 
          message: "No new article today. Check back tomorrow!"
        });
      }
      else {
        ress.json({
          message : "Added " +docs.insertCount + " new articles!"
        })
      }
    });
  });

  router.get("/api/albums", function(req, res){
    var query = {};
    if (req.query.saved) {
      query = req.query;
    }
    
    albumController.get(query, function(req, res){
      res.json(data);
    });
  });

  router.delete("/api/albums/:id", function(req, res){
    var query = {};
    query._id = req.params.id;
    albumsController.delete(query, function(err, data){
      res.json(data);
    }); 
  }); 

  router.patch("/api/albums", function(req, res){
    albumsController.update(req.body, function(errr, data){
      res.json(data);
    });
  });

  router.get("/api/notes/:album_id?", function(req, res){
    var query = {};
    query._id = req.params.id;
    notesController.delete(query,function(err, data){
      res.json(data);
    });
  }); 

  router.post("/api/notes", function(req, res) {
    notesController.save(req.body, function(date){
      res.json(data);
    });
  });
}