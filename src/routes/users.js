const express = require('express');
const router = express.Router();
const { Sequelize, db } = require('../connection');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const { validateUserData, validateLoginData } = require('../validations');
const bcrypt = require('bcrypt');
const { authAdmin, authUser } = require('../auth');

// middleware
const createAccountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 5, // start blocking after 5 requests
    message:
      "Too many accounts created from this IP, please try again after an hour"
});

// register new user
router.post('/register', validateUserData, createAccountLimiter, (req, res) => {
    const user = {
        id: req.body.id,
        username : req.body.username,
        fullname: req.body.fullname,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        password: req.body.password,
        admin: req.body.admin
    }
    // make query to the database  
    db.query('SELECT * FROM users WHERE email=?', 
        { replacements: [user.email], type: Sequelize.QueryTypes.SELECT} )    
    .then(
        rows => {
            // if the user is already registered
            if (rows[0] != null) return res.status(400).send('User already registered.');
            // if not, insert data into the database               
            bcrypt.hash(user.password, 10)                
            .then( hashedPassword => {
                db.query(`INSERT INTO users (id, username, fullname, email, phone, address, password, admin) 
                            VALUES (?,?,?,?,?,?,?,?)`, 
                    { replacements: [user.id, user.username, user.fullname, user.email, user.phone, user.address, hashedPassword, user.admin], 
                        type: Sequelize.QueryTypes.INSERT } )
            }).then( 
                () => res.status(201).send('User created. Go to login.')
            ).catch( error => console.log(error) )
        }
    ).catch( error => console.log(error) )
})

// log in
router.post('/login', validateLoginData, (req, res) => {
    const { username, email, password } = req.body;
    db.query('SELECT * FROM users WHERE username=? OR email=?', 
        { replacements: [username, email], type: Sequelize.QueryTypes.SELECT })      
    .then(
        user => {
            // if user doesnt exist
            if (user[0] == null) return res.status(404).send('User not found.');
            // if it does, compare passwords
            bcrypt.compare(password, user[0].password).then( function (result) {
                // if true generate token, else send not allowed
                if (result) {
                    const accessToken = jwt.sign( user[0], process.env.ACCESS_TOKEN_SECRET );
                    res.status(200).json({ accessToken: accessToken });
                }
                res.status(400).send('Not allowed. Invalid password.') 
            }).catch( error => console.log(error) )
        }
    ).catch( error => console.log(error) )
}) 

// update user (only logged in user)
router.put('/user/:id', authUser, validateUserData, (req, res) => {
    const user = {
        username : req.body.username,
        fullname: req.body.fullname,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        password: req.body.password,
    }
    bcrypt.hash(user.password, 10)
    .then(
        hashedPassword => {
            db.query('UPDATE users SET username=?, fullname=?, email=?, phone=?, address=?, password=? WHERE id=?',
                { replacements: [user.username, user.fullname, user.email, user.phone, user.address, hashedPassword, req.params.id], 
                    type: Sequelize.QueryTypes.UPDATE })
            .then(
                () => res.status(200).send('User updated.')
            ).catch( error => console.log(error) )        
        }
    ).catch (error => console.log(error) )
})

// delete user (only logged in user)
router.delete('/user/:id', authUser, (req, res) => { 
    db.query('DELETE FROM users WHERE id=?',
        { replacements: [req.params.id], type: Sequelize.QueryTypes.DELETE })   
    .then( () => res.status(200).send('User deleted.')            
    ).catch( error => console.log(error) )
})

// get all users (admin)
router.get('/users', authAdmin, (req, res) => {
    db.query('SELECT * FROM users WHERE admin=0',
        { type: Sequelize.QueryTypes.SELECT })
    .then( rows => {
        if (rows == false) return res.status(404).send('No users found.');
        res.status(200).json(rows); 
    }).catch( error => console.log(error) )
});

module.exports = router;
