const express = require('express');
const router = express.Router();
const {getLandingPage, getHomePage} = require('../controllers/homeController');


//  router.Method('/route', handler)

router.get('/', getLandingPage);
router.get('/home', getHomePage) ;

module.exports = router;