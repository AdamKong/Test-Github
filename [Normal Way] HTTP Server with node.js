// Simple HTTP Server
var http = require("http");
var fs = require("fs");
console.log("Starting");
var config = JSON.parse(fs.readFileSync("./conf/config.json"));
var host = config.host;
var port = config.port;
var server = http.createServer(function(request, response){
	console.log("Received request: " + request.url);
	var contents = fs.readFile("./conf"+request.url, function(error, data){
		if(error){
			response.writeHead(404, {"Content-type":"text/plain"});
			response.end("Sorry, the file was not found!" + error);	
		}else{
			response.writeHead(200, {"Content-type":"text/json"});
			response.end(data);
		}	
	});
});

server.listen(port, host, function(){
	console.log("Listening:"+host+":"+port);
});

// monitor file change
fs.watchFile("./conf/config.json", function(current, previous){
	config = JSON.parse(fs.readFileSync("./conf/config.json"));
	host = config.host;
	port = config.port;
	
	server.close();
	server.listen(port, host, function(){
		console.log("Now Listening:"+host+":"+port);
	});
});
