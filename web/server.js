//Internal modules
const http = require('http');
const fs = require('fs');

//Npm modules
const pug = require('pug');

//Personal's Blog modules
const httpMsgs = require('./httpMsgs');
const settings = require('./settings');

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
										httpMsgs.send404Error(resp, pug);
									}
									resp.writeHead(200, {'Content-Type': 'text/css'});
									resp.end(content);
								});
						break;


							default:
								httpMsgs.send404Error(resp, pug);
					}
				break;


		default:
			httpMsgs.send404Error(resp, pug);
	}

}).listen(settings.PORT, function(){
	console.log("Connected at port: " + settings.PORT);
});

