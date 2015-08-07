var http = require('http');

var messages = ['Wazzz up', 'This is fun', 'Still having fun!'];

var onRequest = function(req, res) {
    if(req.method === 'GET') {
        res.statusCode = 200;
        // res.setHeader('Content-Type', 'application/json');

        res.end(JSON.stringify(messages));
    }
    else if(req.method === 'POST') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');

        var postData = '';
        req.on('data', function(chunk) {
            postData += chunk.toString();
            console.log('chunk:', chunk);
            console.log('postData:', postData);
        });
        req.on('end', function() {
            console.log('Got POST data:', postData);
            // console.log(JSON.parse(postData));
            var msg = JSON.parse(postData);
            messages.push(msg);
            res.end(JSON.stringify(messages));
        });
    }
};

var port = 9092;

http.createServer(onRequest).listen(9092);
console.log('Checking the port', port);
