const connection = require('../config/database');

const getLandingPage = (req, res) => {
    res.render('landing.ejs')
}

const getHomePage = (req, res) => {
    res.render('home.ejs')
}

const postCreateUser = (req, res) => {
    console.log( '>>>> req.body: ', req.body);
    res.send('Create a new user')
}
module.exports = {
    getLandingPage,
    getHomePage,
    postCreateUser
}