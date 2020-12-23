
const express = require("express");

const app = express();

app.get("/", function (req, res) {
    res.send("<h1>Hello, Universe!</h1>")
})

app.get("/contact",function (req,res) {  
    res.send("Contact me at jmourad312@gmail.com")
})

app.get("/about",function (req,res) {  
    res.send("<h1>I am Youssef Mourad</h1><h3>A soon to be web developer</h3><h4>I will soon graduate from the ITI with the MEARN Stack development diploma and now I am learning to use express</h4>")
})

app.get("/hobbies",function (req,res) {  
    res.send("<ul><li>Games</li><li>Movies</li><li>Programming</li></ul>")
})

app.listen(3000, function(){
    console.log("server started on port 3000");
});
