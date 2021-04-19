const express = require('express');
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const router = express.Router();
const saltRound = 10;

router.get('/signup', (req, res) =>{
    res.render('signup');
})

router.post('/singup', (req, res, next) => {
    const { username, email, password } = req.body;

    if(!userName || !password || !email){
        res.render('signup', { errorMessage: 'Username, email and password are required'})
    }

    User.findOne({ $or: [{ userName }, { email }]})
    .then(user => {
        if(user){
            res.render('singup', {errorMessage: 'User already exist'})
        }
        
        const salt = bcrypt.genSaltSync(saltRound);
        const hashPassword = bcrypt.hashSync(password, salt);

        User.create({ username, email, password: hashPassword})
        .then(() => {
            res.render('index');
        })
        .catch((error) => next(error))
    })
})

module.exports = router;