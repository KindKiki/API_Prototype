const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")

})

app.post("/", function(req, res) {
  const query = req.body.genre;
  const url = "https://v2.jokeapi.dev/joke/" + query + "?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single"

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const jokeData = JSON.parse(data)
      const joketype = jokeData.category
      const hahaJoke = jokeData.joke
      res.write("<h1>Want to hear a " + joketype + " joke?</h1>");
      res.write("<h1>The joke goes like this: " + hahaJoke + " HAHAHAHA, funny am I right!!!!!</h1>");
      res.send()
    })
  })
})



app.listen(process.env.PORT || 3000, function() {

  console.log("Server is running on port 3000")
})
