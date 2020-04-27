//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));


app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req, res){
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us8.api.mailchimp.com/3.0/lists/f95ce0a90f",
    method: "POST",
    headers: {
      "Authorization": "himanshu1 8a745d0419d8edc9483154aeef80ec1e-us8"
    },
    body: jsonData
  };

  request(options, function(error, response, body){
    if(error){
      res.sendFile(__dirname + "/failure.html");
    } else {
      if(response.statusCode == 200){
        res.sendFile(__dirname + "/success.html");
      }
      else{
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });

  app.post("/failure", function(req, res){
    res.redirect("/");
  });





});
app.listen(process.env.PORT || 3000 , function(){
  console.log("Server is started");
});

//api-8a745d0419d8edc9483154aeef80ec1e-us8
//list-f95ce0a90f
