const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

function authAdmin (req, res, next) {
    // get token from authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    // if there is no token return unauthorized status
    if (token == null) res.sendStatus(401);
    // if there is, get user data from that token
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // if user isn't admin send forbidden status
    if (user.admin != 1) return res.sendStatus(403);
    // if user is admin continue
    next();
}

function authUser (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) res.sendStatus(401);
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // if params id doesn't match user id send unauthorized status
    if (user.id != req.params.id) return res.status(401).send('Unauthorized');
    // if it does continue
    next();    
}

function setUser (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    next();    
}

module.exports = {
    authAdmin,
    authUser,
    setUser
}