//jshint esversion:6
require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const md5 = require("md5");

const app = express();

console.log(process.env.API_KEY);

app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/userDB",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    email:String,
    password:String
});
// const secret = process.env.SECRET;


const User = new mongoose.model("User",userSchema);

app.get("/",function (req,res) {
    res.render("home");
});

app.get("/login",function (req,res) {
    res.render("login");
});
app.post("/login",function (req, res) {
    const username = req.body.username;
    const password = md5(req.body.password);

    User.findOne({email:username},function (err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                if (foundUser.password === password) {
                    res.render("secrets")
                }else{
                    res.send("Incorrect password")
                }
            } else {
                res.send("Incorrect Username")
            }
        }
    })
});

// Register route 
app.get("/register",function (req,res) {
    res.render("register");
});
app.post("/register",function (req,res) {
    const newUser = new User({
        email:req.body.username,
        password:md5(req.body.password)
    });
    newUser.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.render("secrets")
        }
    })

});





app.listen(3000,function () {
    console.log("Connected successfully to port 3000");
})
