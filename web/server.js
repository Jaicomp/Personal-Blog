const http = require('http');
const fs = require('fs');
const pug = require('pug');

const port = 8080;

const server = http.createServer (function (req, resp) {

	switch (req.method) {

		case "GET":
					switch (true){
						case req.url === "/":
							var html = pug.renderFile('front/pug/blog.pug');
							resp.writeHead(200, {'Content-Type': 'text/html'});
							resp.end(html);

							break;

						case /[a-z]*.css$/.test(req.url):
								fs.readFile('.' + req.url, 'utf-8', function(error, content){
									if (error){
										console.log("ERROR");
									}
									resp.writeHead(200, {'Content-Type': 'text/css'});
									resp.end(content);
								});
						break;


							default:
								responseToWrongClientRequest(resp);
					}
				break;


		default:
			responseToWrongClientRequest(resp);
	}

}).listen(port, function(){
	console.log("Connected at port: " + port);
});

function responseToWrongClientRequest(resp){
			resp.writeHead(400, {'Content-Type': 'text/plain'});
			resp.end('Wrong request');
	
}





