




exports.send404Error = function (resp, pug){
		var html = pug.renderFile('front/pug/404Error.pug');
		resp.writeHead(404, {'Content-Type': 'text/html'});
		resp.end(html);
}














