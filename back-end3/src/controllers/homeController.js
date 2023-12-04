const connection = require('../config/database');
const { getAllUsers } = require('../services/CRUDService');

const getLandingPage = (req, res) => {
    res.render('landing.ejs')
}
const getEditUser = (req, res) => {
    res.render('edit.ejs')
}

const getHomePage = async (req, res) => {
    let result = await getAllUsers();
    res.render('home.ejs', {users: result})
}

const getCreateUser = (req, res) => {
    res.render('create-user.ejs')
}

const postCreateUser = async (req, res) => {
    
    
    // let name = req.body.name;
    // let email = req.body.email;
    // let city = req.body.city;
    
    let {name, email, city} = req.body;
    
    let sql = `INSERT INTO Users (name, email, city) VALUES ('${name}', '${email}', '${city}')`;

    let [result, fields] = await connection.query(sql);
    res.send('User created successfully');


}
module.exports = {
    getLandingPage,
    getHomePage,
    postCreateUser,
    getCreateUser,
    getEditUser
}