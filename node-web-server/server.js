//require is used to import libraries
const express = require('express');
const fs = require('fs');
const hbs = require('hbs');

//this is an instance of express()
let app = express();
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname+ '/partials');

app.use(express.static(__dirname+ '/public'));
app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + "\n", (error) => {
        if(error){
            console.log('unable to append to server.log');
        }
    });
    next();
});
let port = process.env.PORT || 8080

// app.use((req, res, next) => {
//     res.render('home.hbs');
// });

// console.log("hi");

// '/' is the BaseURL
app.get('/', (req, res) => {
    // res.send({
    //     name: "Rajeev",
    //     date: new Date().toString()
    // });
    res.render('home.hbs', {
        name: "Rajeev",
        date: new Date().toString()
    });
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().toString();
});

hbs.registerHelper('screamAt', (txt) => {
    return txt.toUpperCase();
});

app.get('/about', (req, res) => {
    res.render('about.hbs');
});

app.get('/contact', (req, res) => {
    res.render('contact.hbs');
});

// app.get('/about', (req, res) => {
//     res.send("This is the about page");
// });

app.listen(port, () => {
    // console.log(__dirname);
    console.log(`Server is ready at ${port}`);
});

//view engines to load partial views
//for node there are three view engines
//1) HBS : popular (amber.js and react js) called handle bars
//2) Jade
//3) pug

//https://handlebarsjs.com/

