const express = require('express');
const router = express.Router();
const {getLandingPage, getHomePage, postCreateUser} = require('../controllers/homeController');


//  router.Method('/route', handler)

router.get('/', getLandingPage);
router.get('/home', getHomePage);
router.post('/create-user', postCreateUser);

module.exports = router;