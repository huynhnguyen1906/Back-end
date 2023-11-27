const connection = require('../config/database');

const getHomepage = (req, res) => {
    //process data
    // call model
    let Users = []
    connection.query(
        'SELECT *FROM Users u',
        function (err, results, fields) {
            Users = results;
            // console.log('>>>results:',results);

            res.send(JSON.stringify(Users))
        }
        )
        
}

const getSample = (req, res) => {
    res.render('sample.ejs')
}

module.exports = {
    getHomepage,
    getSample
}