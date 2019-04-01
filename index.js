var http = require("http");
const fs = require('fs');
const path = require('path');
var finalhandler = require('finalhandler')
var http = require('http')
var Router = require('router');
// const querystring = require('querystring');

// http.createServer(function (request, response) {
//     response.writeHead(200, {
//         'Content-Type': 'application/json'
//     });

//     

// }).listen(8081);
// debugger
var router = Router()
router.get('/', function (req, res) {
    res.setHeader('Content-Type', 'Application/Json; charset=utf-8');
    fs.readdir('./assets', (err, files) => {
        if (err) {
            res.end(err.message);
        } else {
            // var x = querystring.parse(req.url, "?", "=")
            res.end(JSON.stringify(files));
        }
    });
})

router.get('/:filename', function (req, res) {
    fs.readFile(`./assets/${req.params.filename}`, (err, fileBuffer) => {
        if (err) {
            res.end(err.message);
        } else {
            res.end(fileBuffer);
        }
    });
})


const server = http.createServer(function (req, res) {
    router(req, res, finalhandler(req, res))
})

server.listen(3000, () => {
    console.log('server listening on port 3000')
});