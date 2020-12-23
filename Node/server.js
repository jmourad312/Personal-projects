const express = require("express");
const bodyParser = require("body-parser");
var usersRoutes = require("./routes/users");
var productsRoutes = require("./routes/products");
var transactionsRoutes = require("./routes/transactions");
const app = express();

app.use(bodyParser.urlencoded({extended:false}))

app.use(express.static(__dirname + "/public"))

app.use("/user",usersRoutes);
app.use("/product",productsRoutes);
app.use("/trans",transactionsRoutes);

// app.use("/",(req,res)=>{
//     res.send("<h1>Hello this is the homepage</h1><h2>Welcome to all pirates</h2>")
// })



app.listen(3000)