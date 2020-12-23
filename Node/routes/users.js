const express = require("express");
const router = express.Router();

router.get("/edit",(req,res)=>{
    res.send("<h1>Welcome to editing mode</h1>");
})

router.get("/welcome",(req,res)=>{
    res.send("<h1>Hello user</h1>");
})

router.get("/admin",(req,res)=>{
    res.send("<h1>Hello admin</h1>");
})

router.get("/home",(req,res)=>{
    res.send("<h1>Hello visitor</h1>");
})

router.get("/",(req,res)=>{
    res.send("<h1>Page not found!</h1>");
    console.log("third middleware");
})

module.exports=router;