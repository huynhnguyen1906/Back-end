const {
	getAllUsers,
	getUserById,
	createUser,
	updateUserById,
	deleteUserById,
	createQuestion,
	getAllQuestion,
	getQuestionById,
	deleteQuestionById,
	updateQuestionById,
} = require("../services/CRUDService")

const getLandingPage = (req, res) => {
	res.render("landing.ejs")
}
const getEditUser = async (req, res) => {
	const userId = req.params.id
	let user = await getUserById(userId)
	res.render("edit.ejs", { user: user })
}

const getHomePage = async (req, res) => {
	let result = await getAllUsers()
	let result2 = await getAllQuestion()
	res.render("home.ejs", { users: result, Quiz: result2 })
}

const getCreateUser = (req, res) => {
	res.render("create-user.ejs")
}

const postEditUser = async (req, res) => {
	let { id, name, email, city } = req.body

	await updateUserById(id, name, email, city)

	// res.send('User updated successfully');
	res.redirect("/home")
}

const postCreateUser = async (req, res) => {
	// let name = req.body.name;
	// let email = req.body.email;
	// let city = req.body.city;

	let { name, email, city } = req.body

	await createUser(name, email, city)

	// res.send('User created successfully');
	res.redirect("/home")
}

const getDeleteUser = async (req, res) => {
	const userId = req.params.id
	let user = await getUserById(userId)
	res.render("delete-user.ejs", { user: user })
}

const postDeleteUser = async (req, res) => {
	const id = req.body.id
	await deleteUserById(id)
	res.redirect("/home")
}

const getCreateQuestion = (req, res) => {
	res.render("create-question.ejs")
}

const postCreateQuestion = async (req, res) => {
	let {
		question,
		answer_1,
		answer_2,
		answer_3,
		answer_4,
		correct_answer,
		explain_text,
	} = req.body

	await createQuestion(
		question,
		answer_1,
		answer_2,
		answer_3,
		answer_4,
		correct_answer,
		explain_text
	)
	res.redirect("/create-question")
}

const getEditQuestion = async (req, res) => {
	const questionId = req.params.id
	let Quiz = await getQuestionById(questionId)
	res.render("edit-question.ejs", { Quiz: Quiz })
}

const postEditQuestion = async (req, res) => {
	let {
		id,
		question,
		answer_1,
		answer_2,
		answer_3,
		answer_4,
		correct_answer,
		explain_text,
	} = req.body

	await updateQuestionById(
		id,
		question,
		answer_1,
		answer_2,
		answer_3,
		answer_4,
		correct_answer,
		explain_text
	)

	// res.send('User updated successfully');
	res.redirect("/home")
}

const getDeleteQuestion = async (req, res) => {
	const questionId = req.params.id
	let Quiz = await getQuestionById(questionId)
	res.render("delete-question.ejs", { Quiz: Quiz })
}

const postDeleteQuestion = async (req, res) => {
	const id = req.body.id
	await deleteQuestionById(id)
	res.redirect("/home")
}

const getQuizPage = (req, res) => {
	res.render("quiz.ejs")
}

module.exports = {
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
	postDeleteQuestion,
	postEditQuestion,
	getDeleteQuestion,
	getQuizPage,
}
