const { check, oneOf, validationResult } = require('express-validator');

exports.validateProductData = [
        check('name')
            .not().isEmpty().withMessage('Name must not be empty')
            .isString().withMessage('Name must be a string'),
        check('price')
            .not().isEmpty().withMessage('Price must not be empty')
            .isNumeric().withMessage('Price must be a number'),    
        check('description')
            .isString().withMessage('Description must be a string'),
        check('image_url')        
            .isString().withMessage('Url must be a string'),
        check('available')
            .not().isEmpty().withMessage('Must not be empty')
            .isBoolean().withMessage('Must be 0 or 1'),

        function (req, res, next) {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
            next();  
        } 
]

exports.validateUserData = [
    check('username')
        .not().isEmpty().withMessage('Username must not be empty')
        .isString().withMessage('Username must be a string')
        .isLength({min: 1, max: 10}).withMessage('Username must be between 1 and 10 characters long')
        .custom(value => !/\s/.test(value)).withMessage('No spaces are allowed in the username'),
    check('fullname')
        .not().isEmpty().withMessage('Fullname must not be empty')
        .isString().withMessage('Fullname must be a string'),    
    check('email')
        .not().isEmpty().withMessage('Email must not be empty')
        .isEmail().withMessage('Invalid email'),
    check('phone')   
        .not().isEmpty().withMessage('Phone must not be empty')     
        .isString().withMessage('Phone must be a string'),
    check('address')
        .not().isEmpty().withMessage('Address must not be empty')
        .isString().withMessage('Address must be a string'),
    check('password')
        .not().isEmpty().withMessage('Password must not be empty')
        .isString().withMessage('Password must be string')
        .isLength({min: 6, max: 8}).withMessage('Password must be between 6 and 8 characters long')    
        .custom(value => !/\s/.test(value)).withMessage('No spaces are allowed in the password'),
    check('admin')
        .not().isEmpty().withMessage('Admin must not be empty')
        .isBoolean().withMessage('Admin must be 0 or 1'),   

    function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        next();  
    } 
]

exports.validateLoginData = [
    oneOf([
        check('username')
          .exists().withMessage('Username is required')
          .isString().withMessage('Username must be a string')
          .isLength({min: 1, max: 10}).withMessage('Username must be between 1 and 10 characters long')
          .custom(value => !/\s/.test(value)).withMessage('No spaces are allowed in the username'),

        check('email')
          .exists().withMessage('Email is required')
          .isEmail().withMessage('Invalid email'),
    ]),
    check('password')
        .exists().withMessage('Password is required')
        .isString().withMessage('Password must be string')
        .isLength({min: 6, max: 8}).withMessage('Password must be between 6 and 8 characters long')    
        .custom(value => !/\s/.test(value)).withMessage('No spaces are allowed in the password'),

    function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        next();  
    }       
]




