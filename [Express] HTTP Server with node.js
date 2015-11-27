// Simple HTTP Server with Express
var fs = require("fs");
console.log("Starting");
var config = JSON.parse(fs.readFileSync("./conf/config.json"));
var host = config.host;
var port = config.port;
var express = require("express");

var app = express(); // create a server

app.use(express.static(__dirname+"/public_file")); // add a route to a static file.

app.get("/", function(request, response){
	response.send("Hello!");
});

app.get("/hello/:text", function(request, response){ // pass parameters from url
	response.send(request.params.text);
});

var users = {
		"1":{
			"name":"AdamKong",
			"email":"akong@tropo.com"
		},
		"2":{
			"name":"Jack",
			"email":"jack@tropo.com"
		}
};

app.get("/user/:id", function(request, response){
	var user = users[request.params.id];
	if(user){
		response.send(user.name);	
	}else{
		response.status(404).send("Sorry, the user does not exist!");
	}
});

app.listen(port, host);
