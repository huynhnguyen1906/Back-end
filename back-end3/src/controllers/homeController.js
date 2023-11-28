const connection = require('../config/database');

const getLandingPage = (req, res) => {
    res.render('landing.ejs')
}

const getHomePage = (req, res) => {
    res.render('home.ejs')
}
module.exports = {
    getLandingPage,
    getHomePage
}