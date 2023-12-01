const connection = require('../config/database');

const getLandingPage = (req, res) => {
    res.render('landing.ejs')
}

const getHomePage = (req, res) => {
    res.render('home.ejs')
}

const postCreateUser = (req, res) => {
    
    
    // let name = req.body.name;
    // let email = req.body.email;
    // let city = req.body.city;
    
    let {name, email, city} = req.body;
    
    let sql = `INSERT INTO Users (name, email, city) VALUES ('${name}', '${email}', '${city}')`;
    connection.query(sql, (err, result) => {
        if(err) throw err;
        console.log('>>>> result ', result);
        res.send('Create a new user')
    })

    // res.send('Create a new user77777')
}
module.exports = {
    getLandingPage,
    getHomePage,
    postCreateUser
}