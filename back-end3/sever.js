const express = require('express') //commonjs
const path =  require('path');
require('dotenv').config();

//import express from 'express'; // es module

const app = express() // app express
const port = process.env.PORT || 8081; // port => hardcode
const hostname = process.env.HOST_NAME; 


//config template engine
app.set('views', path.join(__dirname,'src' ,'views'));
app.set('view engine', 'ejs')

//config static files
app.use(express.static(path.join(__dirname , 'src' ,'public')));
//khai bao route
app.get('/', (req, res) => {
    res.send('Hello World! with nodemon')
})

app.get('/home', (req, res) => {
    res.render('sample.ejs')
})
app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})