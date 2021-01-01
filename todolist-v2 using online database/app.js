
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash")

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-youssef:test123@cluster0.gt6fj.mongodb.net/todolistDB",{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false});



const itemsSchema = {
  name:String
};


const Item = mongoose.model("Item",itemsSchema)

const item1 = new Item ({
  name:"Welcome to your todolist"
});
const item2 = new Item ({
  name:"Hit the + button to add a new item"
});
const item3 = new Item ({
  name:"<-- Hit this to delete an item"
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name:String,
  items:[itemsSchema]
};

const List = mongoose.model("List",listSchema);

let dict = {}

app.get("/", function(req, res) {
  
  Item.find({},function (err,results) {
    if (results.length === 0) {
      Item.insertMany(defaultItems,function (err) {
        if (err) console.log(err);
        else console.log("Added successfully");
      })
      res.redirect("/");
    }else{
      res.render("list", {listTitle: "Today", newListItems: results,listlist:dict});
     
    }
  })
  
});

app.get("/:customListName",function (req,res) {
  const customListName = _.capitalize(req.params.customListName);
  List.findOne({name:customListName},function (err,foundList) {
    if(!err){
      if (foundList) {
        dict[customListName]=foundList;
        console.log("Already exists");
        res.render("list",{listTitle: foundList.name, newListItems: foundList.items,listlist:dict});
      }
      else{
        //Create a new list
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
      }
    }else{
      console.log(err);
    }
  })
});

// app.get("/Favicon.ico",function (req,res) {
//   res.redirect("/");
// });

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });
  
  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName},function (err,foundList) {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName)
    })
  }
  
  
});

app.post("/delete",function (req,res) {
  
  const checkedItemId = req.body.checkBox;
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.findByIdAndRemove(checkedItemId,function(err) {
      if (!err) {
        console.log("Removed Successfully!");
        res.redirect("/");
      }
    })
  } else {
    List.findOneAndUpdate(
      {name: listName}, 
      {$pull:{items: {_id:checkedItemId}}}, 
      function (err, foundList) {
        if (!err) {
          res.redirect("/" + listName);
        } else {
          console.log(err);
          res.redirect("/");  
        }
      })
  }

  
})

app.get("/about", function(req, res){
  res.render("about");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started successfully");
});
