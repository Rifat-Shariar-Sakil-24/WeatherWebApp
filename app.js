const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const https = require("node:https");
app.get("/", function (req, res) {
   res.sendFile(__dirname + "/index.html");
});
app.use(bodyParser.urlencoded({extended:true}));

app.post("/", function(req,res){
    const endPoint = "https://api.openweathermap.org/data/2.5/weather"
    const city = req.body.cityName;
    const apiKey = "56880fba5b2a82f296a29d3ca4a536ae";
    const units = "metric";
    const key1 = "q";
    const key2 = "appid";
    const key3 = "units";

    const url = endPoint + "?" + key1 + "=" + city + "&" + key2 + "=" + apiKey + "&" + key3 + "=" + units;
    //const url = "https://api.openweathermap.org/data/2.5/weather?q=paris&appid=56880fba5b2a82f296a29d3ca4a536ae";


    // get documentation for external server;
   // https://nodejs.org/api/https.html#httpsgeturl-options-callback
    https
      .get(url, (response) => {
       // console.log("statusCode:", res.statusCode);
       // console.log("headers:", res.headers);
  
        response.on("data", (d) => {
          const WeatherData = JSON.parse(d);
          console.log(WeatherData);
          const Temperature = WeatherData.main.temp;
          res.write("<h1> Current City : " + city + "</h1>");
          res.write("<h1> Temperature is " + Temperature + "in Celsius </h1>");
          res.send();
         // process.stdout.write(d);
        });
      })
      .on("error", (e) => {
        console.error(e);
      });
      //res.send("wow");
})




app.listen(4000, function () {
  console.log("server is running on port 4000");
});
