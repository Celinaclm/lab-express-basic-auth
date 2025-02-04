const express = require('express');
const routes = express.Router();

function isLoggedIn(req, res, next){
    if(req.session.currentUser) next();
    else res.redirect('/auth/login')
}
router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', {user: req.session.currentUser});
})

router.get('/main', isLoggedIn, (req, res) => {
    res.render('main', {user: req.session.currentUser});
})


module.exports = router;