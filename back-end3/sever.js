require('dotenv').config();
const express = require('express'); //commonjs
const configViewEngine = require('./src/config/viewEngine');
const webRoutes = require('./src/routes/web');


const app = express() // app express
const port = process.env.PORT || 8081; // port => hardcode
const hostname = process.env.HOST_NAME; 


//config req.body 
app.use(express.urlencoded({ extended: true })); //for form data

app.use(express.json()); //for json data


//config template engine and config static files
configViewEngine(app);

//khai báo route
app.use('/',webRoutes)




app.listen(port, hostname, () => {
    console.log(`App running on http://${hostname}:${port}/`)
})