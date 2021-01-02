//jshint esversion:6
require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const app = express();


app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

// using express-local and passport 
app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// add create index to work with passport 
mongoose.connect("mongodb://localhost:27017/userDB",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const userSchema = new mongoose.Schema({
    email:String,
    password:String
});

// use passport local mongoose plugin 
userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User",userSchema);

// create a local login strategy 
passport.use(User.createStrategy());
 
// serliaze and deserialize user 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/",function (req,res) {
    res.render("home");
});

app.get("/secrets",function (req, res) {
    if (req.isAuthenticated()) {
        res.render("secrets");
    } else {
        res.redirect("/login");
    }
})

// Register route 
app.get("/register",function (req,res) {
    res.render("register");
});
app.post("/register",function (req,res) {
    
    User.register({
        username: req.body.username},
        req.body.password,
        function (err, user) {
            if (err) {
                console.log(err);
                res.redirect("/register");
            } else {
                passport.authenticate("local")(req, res, function () {
                    res.redirect("/secrets");
                });
            }
        });

});

// Login route
app.get("/login",function (req,res) {
    res.render("login");
});
app.post("/login",function (req, res) {
    
    const user = new User({
        username: req.body.username,
        password: req.body.username
    });
    req.logIn(user,function (err) {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/secrets");
            });
        }
    });
});

app.get("/logout",function (req, res) {
    req.logOut();
    res.redirect("/")
})






app.listen(3000,function () {
    console.log("Connected successfully to port 3000");
})
