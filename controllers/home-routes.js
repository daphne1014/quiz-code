const router = require('express').Router();
const sequelize = require('../config/connection');
//render homepage with user data
router.get('/', (req, res) => {
    
    res.render('homepage', {
        loggedIn: req.session.loggedIn,
        user_id: req.session.user_id
      });
  });
// /login router - renders login 
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
 // /sign up router - renders signup handlebar
  router.get('/signup', (req, res) => {
    
    res.render('signup');
  });

module.exports = router;
