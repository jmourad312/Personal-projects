const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
});
app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apiKey = "feae6b81bd30aa8294162b031fe59ba3";
    const unit = "metric"
    const url1 = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit
    https.get(url1, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const temp2 = weatherData.main.feels_like;
            const tempDesc = weatherData.weather[0].description;
            const tempIcon = weatherData.weather[0].icon;
            console.log(temp);
            console.log(temp2);
            console.log(tempDesc);

            res.write("<h1>The temperature in "+query+" is " + temp + " degree </h1>");

            res.write("<p>weather is currently " + tempDesc + "</p>");
            
            res.write("<img src='https://openweathermap.org/img/wn/" + tempIcon + "@2x.png'>");
            res.send();
        })
    })
})

app.listen(3000, function () {
    console.log("Server is running on port 3000");

})