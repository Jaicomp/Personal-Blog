
exports.renderFile = function(resp, typeFile, content) {
	resp.writeHead(200, {'Content-Type': 'text/'+typeFile});
	resp.end(content);

}


exports.send404Error = function(resp, pug) {
		var html = pug.renderFile('front/pug/404Error.pug');
		resp.writeHead(404, {'Content-Type': 'text/html'});
		resp.end(html);
}














