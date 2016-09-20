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
								var posts = getPostsInfo(files);
								var contentPugPosts = {};
								contentPugPosts.posts = posts;
								var html = pug.renderFile('front/pug/blog.pug', contentPugPosts);
								resp.writeHead(200, {'Content-Type': 'text/html'}); 
								resp.end(html);

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

function getPostsInfo(files) {
	var posts = {};
	for (var i = 0; i < files.length; i++){
					
		var stats = fs.statSync('front/posts/' + files[i]);
		var post = {};
		post.tagPost = files[i].slice(0, files[i].indexOf('-'));
		post.titlePost = files[i].slice(files[i].indexOf('-')+1, files[i].indexOf('.pug'));										
		var dateLastModificationFile = new Date(stats.mtime);
		var actualDate = new Date();
		var daysAgo = actualDate.getDate() - dateLastModificationFile.getDate();
		var datePost;
		if(daysAgo == 0){
			post.datePost = actualDate.getHours() - dateLastModificationFile.getHours() + " hours ago";
		} else if (daysAgo < 31){
			post.datePost = actualDate.getDate() - dateLastModificationFile.getDate() + " days ago";
		} else {
			post.datePost = dateLastModificationFile.getDate() + " - " + (dateLastModificationFile.getMont() + 1) + " - " + dateLastModificationFile.getFullYear();	
		}

		posts["post"+i] = post;
		}

		return sortPosts(posts);

}




