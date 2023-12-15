const {
	getAllUsers,
	getUserById,
	createUser,
	updateUserById,
	deleteUserById,
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
	res.render("home.ejs", { users: result })
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

module.exports = {
	getLandingPage,
	getHomePage,
	postCreateUser,
	getCreateUser,
	getEditUser,
	postEditUser,
	getDeleteUser,
	postDeleteUser,
}
