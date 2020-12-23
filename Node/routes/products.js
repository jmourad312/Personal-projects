const express = require("express");
const router = express.Router();



router.get("/add",(req,res)=>{
    res.send("<form action='/product/list' method='POST'><input type='text' name='pName' placeholder='Product name'>&nbsp&nbsp&nbsp<input type='text' name='pPrice' placeholder='Product price'><br><br><button type='submit'>Add</button></form>");
})

router.post("/list",(req,res)=>{
    console.log("body from product form: ", req.body.pName, req.body.pPrice);
    res.send("Product : " + req.body.pName + "<br> and price is : " + req.body.pPrice);
})
router.get("/",(req,res)=>{
    res.send("This is the products page")
})


module.exports=router