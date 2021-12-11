const express = require('express');
const router = express.Router();
const { Sequelize, db } = require('../connection');
const { authAdmin, setUser } = require('../auth');

// get all orders (admin) and particular orders (user)
router.get('/store/orders', setUser, (req, res) => {
    if (req.user.admin == 1) {
        db.query(`SELECT order_status, timestamp, order_id, name, description, amount, payment_method, fullname, address 
            FROM store s
            LEFT JOIN order_status os
            ON s.order_status_id = os.id
            LEFT JOIN products p
            ON s.product_id = p.id
            LEFT JOIN users u 
            ON s.user_id = u.id
            LEFT JOIN payment_method pm
            ON s.payment_method_id = pm.id
            ORDER BY timestamp ASC`, 
                { type: Sequelize.QueryTypes.SELECT } )
        .then(
            rows => {
                if (rows == false) return res.status(404).send('No orders found.')
                res.status(200).json(rows)
            }    
        ).catch( error => console.log (error) )    
    } else {
        db.query(`SELECT timestamp, name, amount, payment_method, address
            FROM store s
            LEFT JOIN products p
            ON s.product_id = p.id
            LEFT JOIN users u
            ON s.user_id = u.id
            LEFT JOIN payment_method pm
            ON s.payment_method_id = pm.id
            WHERE user_id=?`, 
            { replacements: [req.user.id], type: Sequelize.QueryTypes.SELECT })
        .then(
            rows => {
                if (rows == false) return res.status(404).send('No orders found.')
                res.status(200).json(rows)
            }
        ).catch( error => console.log(error) )    
    }
})

// add to cart (users)
var cart = [];
router.post('/store/cart', setUser, (req, res) => {
    let order = {
        product: req.body.product_id,
        amount: req.body.amount,
        payment_method: req.body.payment_method_id,
        user: req.user.id
    }
    if (!order.product || !order.amount || !order.payment_method) {
        res.status(400).send('Please fill in all required inputs.')
    } else {
        cart.push(order)
        res.status(200).send('Product added to the cart.')
    }
    console.log(cart);
    return cart;
})

// confirm order (users)
router.post('/store/order', setUser, (req, res) => {
    for (let i = 0; i < cart.length; i++) {
        db.query('INSERT INTO store (product_id, user_id, amount, payment_method_id) VALUES (?,?,?,?)',
            { replacements: [cart[i].product, req.user.id, cart[i].amount, cart[i].payment_method], 
                type: Sequelize.QueryTypes.INSERT })
        .then( () => {
            cart = [];
            res.status(200).send('Order placed.')    
        }).catch( error => console.log(error) )    
    }    
})

// update order status (admin)
router.put('/store/order/:id', authAdmin, (req, res) => {
    let status_id = req.body.order_status_id;
    db.query('UPDATE store SET order_status_id=? WHERE order_id=?', 
        { replacements: [status_id, req.params.id], type: Sequelize.QueryTypes.UPDATE })
    .then(
        () => res.status(200).send('Status updated.')
    ).catch( error => console.log(error) )    
})

// delete order (admin)
router.delete('/store/order/:id', authAdmin, (req, res) => {
    db.query('SELECT * FROM store WHERE order_id=?', 
    { replacements: [req.params.id], type: Sequelize.QueryTypes.SELECT })
    .then( rows => {
        if (rows == false) res.status(404).send('Order not found.');
        db.query('DELETE FROM store WHERE order_id=?',
            { replacements: [req.params.id], type: Sequelize.QueryTypes.DELETE })
        .then( 
            () => res.status(200).send('Order deleted.')
        ).catch( error => console.log(error) )    
    }).catch( error => console.log(error) )    
})

module.exports = router;