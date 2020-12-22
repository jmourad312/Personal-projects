const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
const items = ["Buy food", "Cook food", "Eat food"];
const workList = [];

app.use(express.static("public"));

app.get("/", function (req, res) {
    const day = date.getDate();
    res.render("list", { 
        listTitle: day,
        newListItems: items,
    });
});

app.post("/",function (req,res) { 
    const item = req.body.newItem;
    
    if (req.body.list === "Work") {
        workList.push(item)
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work",function (req, res) {
    res.render("list", {
        listTitle:"Work List",
        newListItems: workList,
    });
});

app.post("/work", function (req, res) {
    const item = req.body.newItem;
    workList.push(item);
    res.redirect("/work")
})

app.get("/about",function (req, res) {
    res.render("about");
})

app.listen(3000, function () {
  console.log("Listening to port 3000");
});
