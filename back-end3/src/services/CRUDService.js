const connection = require('../config/database');


const getAllUsers = async () => { 
    let sql = `SELECT * FROM Users`;

    let [result, fields] = await connection.query(sql);

    return JSON.stringify(result);
}

module.exports = {
    getAllUsers
}