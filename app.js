var express    = require("express"), 
    app        = express(), 
    bodyParser = require("body-parser"), 
    mongoose   = require("mongoose")

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
});

var Campground = mongoose.model("Campground", campgroundSchema)

// Campground.create(
//     {
//         name: "sls", 
//         image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgUu94mmiRgPj54-gvGRIc9sfyrhxNhnKEKTULEKti1yDSfK-rUBx4X18",
//         description: "This is a Huge Granite Hill, no bathrooms, no water, beautiful granite"
        
//     }, function(err, campground){
//         if(err){
//             console.log("YOU HAD AN ERROR!");
//         }else{
//             console.log("NEWLY CREATED CAMPGROUND: ")
//             console.log(campground);
//         }
//     })

app.get("/", function(req, res){
   res.render("landing") 
});

app.get("/campgrounds", function(req, res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
          console.log("There was an error!")  
        }else{
         res.render("index", {campgrounds: allCampgrounds}); 
        }
    });
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name; 
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = { name: name, image: image, description: desc}
    //Create new campground and save to database
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log("error")
        }else{
            
        }
    })

});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs")
});

app.get("/campgrounds/:id", function(req, res){
    //find the campgtound information with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err)
        }else{
              res.render("show", {campground: foundCampground})
          }  
        });
    //render show template with that campground
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log(" The YelpCamp Server Has Started! ") 
});
 