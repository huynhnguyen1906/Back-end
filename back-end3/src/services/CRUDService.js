const connection = require('../config/database');


const getAllUsers = async () => { 
    let sql = `SELECT * FROM Users`;

    let [result, fields] = await connection.query(sql);

    return result;
}

module.exports = {
    getAllUsers
}