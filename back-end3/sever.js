require('dotenv').config();
const express = require('express') //commonjs
const configViewEngine = require('./src/config/viewEngine');
const webRoutes = require('./src/routes/web')
//import express from 'express'; // es module

const app = express() // app express
const port = process.env.PORT || 8081; // port => hardcode
const hostname = process.env.HOST_NAME; 


//config template engine and config static files
configViewEngine(app);

//khai báo route
app.use('/',webRoutes)


app.listen(port, hostname, () => {
    console.log(`App running on http://${hostname}:${port}/`)
})