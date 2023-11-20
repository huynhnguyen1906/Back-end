const express = require('express');
const router = express.Router();
const {getHomepage, getSample} = require('../controllers/homeController');


//  router.Method('/route', handler)

router.get('/', getHomepage);
router.get('/sample', getSample) ;


module.exports = router;