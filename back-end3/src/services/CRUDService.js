const connection = require('../config/database');


const getAllUsers = async () => { 
    let sql = `SELECT * FROM Users`;
    let [result, fields] = await connection.query(sql);
    return result;
}

const getUserById = async (userId) => {
    let [results, fields] = await connection.query(`SELECT * FROM Users WHERE id = ${userId}`);
    let user = results && results.length > 0 ? results[0] : {};
    return user;
}

const createUser = async (name, email, city) => {
    let sql = `INSERT INTO Users (name, email, city) VALUES ('${name}', '${email}', '${city}')`;
    let [result, fields] = await connection.query(sql);
}

const updateUserById = async (id, name, email, city) => {
    let sql = `UPDATE Users SET name = '${name}', email = '${email}', city = '${city}' WHERE id = ${id}`;
    let [result, fields] = await connection.query(sql);
}

const deleteUserById = async (id) => {
    let sql = `DELETE FROM Users WHERE id = ${id}`;
    let [results, fields] = await connection.query(sql);
}

module.exports = {
    getAllUsers,
    getUserById,
    updateUserById,
    createUser,
    deleteUserById
}