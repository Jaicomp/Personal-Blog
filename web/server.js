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

							fs.readdir('./front/posts', function(err, files){
								console.log(files);
					
								var tagPost = files[0].slice(0, files[0].indexOf('-'));
								var titlePost = files[0].slice(files[0].indexOf('-')+1, files[0].indexOf('.pug'));										
								fs.stat('front/posts/'+files[0], function(err, stats){
									var dateLastModificationFile = new Date(stats.mtime);
									var actualDate = new Date();
									var daysAgo = actualDate.getDate() - dateLastModificationFile.getDate();
									var datePost;
									if(daysAgo == 0){
										datePost = actualDate.getHours() - dateLastModificationFile.getHours() + " hours ago";
									} else if (daysAgo < 31){
										datePost = actualDate.getDate() - dateLastModificationFile.getDate() + " days ago";
									} else {
										datePost = dateLastModificationFile.getDate() + " - " + (dateLastModificationFile.getMont() + 1) + " - " + dateLastModificationFile.getFullYear();	
									}
								var html = pug.renderFile('front/pug/blog.pug', {tag: tagPost, title: titlePost, date: datePost});
								resp.writeHead(200, {'Content-Type': 'text/html'}); 
								resp.end(html);

								});

							});

							break;

						case /[a-z]*.css$/.test(req.url):
								fs.readFile('.' + req.url, 'utf-8', function(error, content){
									if (error)	{
										httpMsgs.send404Error(resp, pug);
									}
									resp.writeHead(200, {'Content-Type': 'text/css'});
									resp.end(content);
								});
						break;

						case /posts\/*/.test(req.url):
							console.log(req.url);
							fs.readFile('.' + req.url, 'utf-8', function(error, content){
								if(error) {
									httpMsgs.send404Error(resp, pug);
								}
								resp.writeHead(200, {'Content-Type': 'text/plain'});
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

