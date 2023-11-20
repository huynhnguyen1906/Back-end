const getHomepage = (req, res) => {
    //process data
    // call model
    res.send('Hello World! with nodemon')
}

const getSample = (req, res) => {
    res.render('sample.ejs')
}

module.exports = {
    getHomepage,
    getSample
}