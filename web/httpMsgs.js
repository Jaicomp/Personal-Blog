




exports.send404Error = function (resp){
		resp.writeHead(404, {'Content-Type': 'text/plain'});
		resp.end('Error 404: Resource Not Found');
}














