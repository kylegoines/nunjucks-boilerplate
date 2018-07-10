const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path')
const app = express();

app.engine( 'html', nunjucks.render ) ;
app.set( 'view engine', 'html' ) ;

app.use('/public', express.static('public'))

nunjucks.configure( [ 'site', 'templates', 'includes' ], {
    autoescape: true,
    express: app,
    watch: true,
    cache: false,
});

// test pages
app.get('/about', function (req, res) {
    res.render(`${__dirname}/site/templates/about`);
});

app.get('/', function (req, res) {
    res.render(`${__dirname}/site/templates/index`);
});

app.listen(9000);
