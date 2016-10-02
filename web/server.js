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
								var posts = getPostsInfoSorted(files);
								var contentPugPosts = {};
								contentPugPosts.posts = posts;
								var html = pug.renderFile('front/pug/blog.pug', contentPugPosts);
								httpMsgs.renderFile(resp, 'html', html);
							});

							break;

						case /[a-z]*.css$/.test(req.url):
								fs.readFile('.' + req.url, 'utf-8', function(error, content){
									if (error)	{
										httpMsgs.send404Error(resp, pug);
									}
									httpMsgs.renderFile(resp, 'css', content);
								});
						break;

						case /posts\/*/.test(req.url):
							console.log(req.url);
							fs.readFile('.' + req.url, 'utf-8', function(error, content){
								if(error) {
									httpMsgs.send404Error(resp, pug);
								}
								httpMsgs.renderFile(resp, 'plain', content);
								
							});
						break;
					
							default:
								
								fs.readdir('./front/posts', function(err, files){
									for (var i = 0; i < files.length; i++) {

										var post = new RegExp(req.url.substring(1));
										if (post.test(files[i].substring(files[i].indexOf('-')+1))) {
											console.log('./front/posts/'+files[i]);
								
											var html = pug.renderFile('front/posts/'+files[i]);
											httpMsgs.renderFile(resp, 'html', html);
										}
									}
								});

								//httpMsgs.send404Error(resp, pug);
					}
				break;


		default:
			httpMsgs.send404Error(resp, pug);
	}

}).listen(settings.PORT, function(){
	console.log("Connected at port: " + settings.PORT);
});

function getPostsInfoSorted(files) {
	var posts = {};
	var statsFiles = sortFiles(files);

	for (var i = 0; i < files.length; i++){
		var post = {};
		post.tagPost = files[i].slice(0, files[i].indexOf('-'));
		post.titlePost = files[i].slice(files[i].indexOf('-')+1, files[i].indexOf('.pug'));										
		var dateLastModificationFile = new Date(statsFiles[i]);
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



		return posts;

}


function sortFiles(files) {
	var statsFiles = [];

	for (var i = 0; i < files.length; i++){
		statsFiles[i] = fs.statSync('front/posts/' + files[i]).mtime;	
		for (var j = i; j > 0; j--) {
			if (new Date(statsFiles[j]) > new Date(statsFiles[j-1])) {
				var aux = statsFiles[j];
				statsFiles[j] = statsFiles[j-1];
				statsFiles[j-1] = aux;
			}

		}
	}

	return statsFiles;
}



