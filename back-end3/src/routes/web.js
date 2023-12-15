const express = require("express")
const router = express.Router()
const {
	getLandingPage,
	getHomePage,
	postCreateUser,
	getCreateUser,
	getEditUser,
	postEditUser,
	getDeleteUser,
	postDeleteUser,
} = require("../controllers/homeController")

//  router.Method('/route', handler)

router.get("/", getLandingPage)
router.get("/home", getHomePage)
router.post("/create-user", postCreateUser)
router.get("/create-user", getCreateUser)
router.get("/edit-user/:id", getEditUser)
router.post("/edit-user", postEditUser)
router.get("/delete-user/:id", getDeleteUser)
router.post("/delete-user/", postDeleteUser)

module.exports = router
