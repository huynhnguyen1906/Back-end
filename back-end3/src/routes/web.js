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
	getCreateQuestion,
	postCreateQuestion,
	getEditQuestion,
	postEditQuestion,
	postDeleteQuestion,
	getDeleteQuestion,
	getQuizPage,
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
router.get("/create-question", getCreateQuestion)
router.post("/create-question", postCreateQuestion)
router.get("/edit-question/:id", getEditQuestion)
router.post("/edit-question", postEditQuestion)
router.get("/delete-question/:id", getDeleteQuestion)
router.post("/delete-question/", postDeleteQuestion)
router.get("/quiz-start", getQuizPage)

module.exports = router
