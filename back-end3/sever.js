require('dotenv').config();
const express = require('express') //commonjs
const configViewEngine = require('./src/config/viewEngine');
const webRoutes = require('./src/routes/web')
const mysql = require('mysql2')
//import express from 'express'; // es module

const app = express() // app express
const port = process.env.PORT || 8081; // port => hardcode
const hostname = process.env.HOST_NAME; 


//config template engine and config static files
configViewEngine(app);

//khai báo route
app.use('/',webRoutes)


//test connection 
//create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '123456',
    database: 'huynhnguyen'
});

connection.query(
    'SELECT *FROM Users u',
    function (err, results, fields) {
        console.log('>>>results:',results);
        console.log('>>>fields:',fields);
    }
)




app.listen(port, hostname, () => {
    console.log(`App running on http://${hostname}:${port}/`)
})