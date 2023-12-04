const express = require('express');
const router = express.Router();
const {getLandingPage, getHomePage, postCreateUser, getCreateUser, getEditUser, postEditUser} = require('../controllers/homeController');


//  router.Method('/route', handler)

router.get('/', getLandingPage);
router.get('/home', getHomePage);
router.post('/create-user', postCreateUser);
router.post('/edit-user', postEditUser);
router.get('/create-user', getCreateUser);
router.get('/edit-user/:id', getEditUser);

module.exports = router;