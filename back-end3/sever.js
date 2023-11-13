const express = require('express') //commonjs
//import express from 'express'; // es module

const app = express() // app express
require('dotenv').config();
const port = process.env.PORT || 8081; // port => hardcode
const hostname = process.env.HOST_NAME; 

//config template engine
app.set('views', './src/views/')
app.set('view engine', 'ejs')

//khai bao route
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/home', (req, res) => {
    res.render('sample.ejs')
})
app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})