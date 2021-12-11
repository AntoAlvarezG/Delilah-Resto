// initializations
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require ('dotenv').config();
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const expressJwt = require('express-jwt');

// middlewares
app.use(express.static('public')); 
app.use(bodyParser.json({ limit: '100kb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(helmet());
app.disable ('x-powered-by');
app.use(expressJwt({ secret: process.env.ACCESS_TOKEN_SECRET, algorithms: ['HS256'] }).unless({ path: ['/register', '/login'] }));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests, please try again later.'
});
app.use(limiter);

// routes
app.use(require('./routes/products'));
app.use(require('./routes/users'));
app.use(require('./routes/orders'));

// settings 
app.set('port', process.env.PORT || 3000);
app.set('trust proxy', (ip) => {
    if(ip === '127.0.0.1' || ip === '123.123.123.123') return true;
    else return false;
})

// server listening  
app.listen(app.get('port'), ()=> {
    console.log(`Server on port ${app.get('port')}`);
});
