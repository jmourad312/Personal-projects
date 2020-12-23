const http = require("http")

const EventEmitter = require('events');

var qs = require('querystring');

fs = require('fs');

// class MyEmitter extends EventEmitter {}

// const myEmitter = new MyEmitter();
//     myEmitter.on('submit', () => {
//         console.log('a submit event occurred!');
//     }
// );
var server = http.createServer(function (req,res) {  
    console.log("server created!!");
    console.log(req.url);
    console.log(req.method);
    if (req.url === '/users') {
        res.write("<html><ul><li>User 1</li><li>User 2</li><li>User 3</li></ul></html>");
        res.end();
    }
    else if (req.url === '/'){
        res.write("<html><form method='post' action='/create-user'><input type='text' id='usr1' name='username'><input type='submit' value='submit'></form></html>");
        res.end();
    }
    if (req.url === "/create-user") {
        if (req.method == 'POST') {
            var body = '';
            req.on('data', function(data) {
                body += data;
            });
            req.on('end', function() {
                var post = qs.parse(body);
                res.write(`<html><h2>${post.username}</h2></html>`);
                res.end();
            });
        }
    }
})
server.listen(3000);