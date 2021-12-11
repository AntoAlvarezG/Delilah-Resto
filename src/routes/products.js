const express = require('express');
const router = express.Router();
const { Sequelize, db } = require('../connection');
const { authAdmin, setUser } = require('../auth');
const { validateProductData } = require('../validations');

// get all products (admin) and available products (users)
router.get('/products', setUser, (req, res) => {
    if (req.user.admin == 1) {
        db.query('SELECT * FROM products', { type: Sequelize.QueryTypes.SELECT })
        .then(
            rows => {
                if (rows == false) return res.status(404).send('No products found.')
                res.status(200).json(rows)
            }
        ).catch ( error => console.log(error) )    
    } else {
        db.query('SELECT * FROM products WHERE available=1', { type: Sequelize.QueryTypes.SELECT })
        .then(
            rows => {
                if (rows == false) return res.status(404).send('No products found.')
                res.status(200).json(rows)
            }
        ).catch ( error => console.log(error) )
    }        
})

// get product by id (both)
router.get('/product/:id', (req, res) => {
    db.query( 'SELECT * FROM products WHERE id=?',
        { replacements: [req.params.id], type: Sequelize.QueryTypes.SELECT })
    .then( rows => {
        if (rows == false) return res.status(404).send('Product not found.');
        res.status(200).json(rows[0]); 
    }).catch( error => console.log(error) )
})

// add new product (admin)
router.post('/product/add', authAdmin, validateProductData, (req, res) => {
    let { name, price, description, image_url, available } = req.body;
    db.query('SELECT * FROM products WHERE name=?', 
        { replacements: [name], type: Sequelize.QueryTypes.SELECT} )    
    .then(
        rows => {
            if (rows[0]) return res.status(400).send('Product already added.')
            db.query( 'INSERT INTO products (name, price, description, image_url, available) VALUES (?,?,?,?,?)',
                { replacements: [name, price, description, image_url, available], 
                        type: Sequelize.QueryTypes.INSERT })
            .then(
                () => res.status(201).send('New product added to the store.')
            ).catch( error => console.log(error))
    })
})    

// update product (admin)
router.put('/product/:id', authAdmin, validateProductData, (req, res) => {
    let { name, price, description, image_url, available } = req.body;
    let id = req.params.id;
    db.query( 'UPDATE products SET name=?, price=?, description=?, image_url=?, available=? WHERE id=?',
        { replacements: [name, price, description, image_url, available, id], type: Sequelize.QueryTypes.UPDATE })
    .then( 
        () => res.status(200).send('Product updated.') 
    ).catch( error => console.log(error) )
})

// delete product (admin)
router.delete('/product/:id', authAdmin, (req, res) => {
    db.query('SELECT * FROM products WHERE id=?',
        { replacements: [req.params.id], type: Sequelize.QueryTypes.SELECT })
    .then( rows => {
        if (rows == false) return res.status(404).send('Product not found.');
        db.query( 'DELETE FROM products WHERE id=?',
            { replacements: [req.params.id], type: Sequelize.QueryTypes.DELETE })
        .then( 
            () => res.status(200).send('Product deleted.')
        ).catch( error => console.log(error) )
    }).catch( error => console.log(error) )
})

module.exports = router;