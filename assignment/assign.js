const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const Jimp = require("jimp");
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.use(bodyParser.text());
app.set('view engine', 'hbs');

app.all('/', (req, res) => {
    res.send('Invalid request made. Only GET for /assignment nd POST for /ingest is allowed');
});

//reverse and display, title and body
app.get('/assignment', (req, res) => {
    request({
                url: 'https://jsonplaceholder.typicode.com/posts',
                json: true
            }, (error, response, body) => {
                    if (error)
                        {
                            var now = new Date().toString();
                            var log = `${now}: ${error}`;
                            console.log("ERROR: Check log file generated at " + __dirname);
                            fs.appendFile('log.txt',log + '\n');
                        }
                    for(var i in body)
                        {
                            reversetitle=body[i].title.split("").reverse().join("");
                            reversebody=body[i].body.split("").reverse().join("");
                            body[i].title=reversetitle;
                            body[i].body=reversebody;
                        }
                    res.send(body);
                });
});

//Create image with entered text
app.post('/ingest', (req, res) => {
    Jimp.read("https://vignette.wikia.nocookie.net/creepypasta/images/8/80/White.png/revision/latest?cb=20140308203440",
    (err, image)=> {
                        if (err)
                        {
                            var now = new Date().toString();
                            var log = `${now}: ${err}`;
                            console.log("ERROR: Check log file generated at " + __dirname);
                            fs.appendFile('log.txt',log + '\n');
                        }
                        Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then((font)=> {
                        image.resize(512, 512)            // resize
                        .quality(80)
                        .print(font, 10, 10, req.body, 510)
                        .write("input-text.jpg");
                        });
                    });
        res.send('Image input-text.jpg created at ' + __dirname );
});


//Handing other requests
app.use((req, res, next) => {
    if (! (req.method === "GET" && req.url==="/assignment") || (req.method === "POST" && req.url==="/ingest")) {
        res.render('ErrorPage.hbs');
    }
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});