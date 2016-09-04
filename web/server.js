const http = require('http');
const pug = require('pug');

const port = 8080;

const server = http.createServer (function (req, resp) {

	switch (req.method) {

		case "GET":
					switch (req.url){
						case "/":
							var html = pug.renderFile('blog.pug');
							console.log(html);						


							break;


							default:
								responseToBadClientRequest(resp);
					}
				break;


		default:
			responseToBadClientRequest(resp);
	}

}).listen(port, function(){
	console.log("Connected at port: " + port);
});

function responseToBadClientRequest(resp){
			resp.writeHead(400, {'Content-Type': 'text/plain'});
			resp.end('Wrong request');
	
}





