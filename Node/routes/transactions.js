const express = require("express");
const router = express.Router();

router.get("/first",(req,res)=>{
    res.send("First billing page")
})
router.get("/second",(req,res)=>{
    res.send("second billing page")
})
router.get("/third",(req,res)=>{
    res.send("third billing page")
})
router.get("/",(req,res)=>{
    res.send("Home billing page")
})

module.exports=router
