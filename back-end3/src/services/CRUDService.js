const connection = require("../config/database")

const getAllUsers = async () => {
	let sql = `SELECT * FROM Users`
	let [result, fields] = await connection.query(sql)
	return result
}

const getUserById = async (userId) => {
	let [results, fields] = await connection.query(
		`SELECT * FROM Users WHERE id = ${userId}`
	)
	let user = results && results.length > 0 ? results[0] : {}
	return user
}

const createUser = async (name, email, city) => {
	let sql = `INSERT INTO Users (name, email, city) VALUES ('${name}', '${email}', '${city}')`
	let [result, fields] = await connection.query(sql)
}

const updateUserById = async (id, name, email, city) => {
	let sql = `UPDATE Users SET name = '${name}', email = '${email}', city = '${city}' WHERE id = ${id}`
	let [result, fields] = await connection.query(sql)
}

const deleteUserById = async (id) => {
	let sql = `DELETE FROM Users WHERE id = ${id}`
	let [results, fields] = await connection.query(sql)
}

const getAllQuestion = async () => {
	let sql = `SELECT * FROM Quiz`
	let [result, fields] = await connection.query(sql)
	return result
}

const createQuestion = async (
	question,
	answer_1,
	answer_2,
	answer_3,
	answer_4,
	correct_answer,
	explain_text
) => {
	let sql = `INSERT INTO Quiz (question,
	answer_1,
	answer_2,
	answer_3,
	answer_4,
	correct_answer,
	explain_text) VALUES ('${question}', '${answer_1}', '${answer_2}', '${answer_3}', '${answer_4}', '${correct_answer}', '${explain_text}')`
	let [result, fields] = await connection.query(sql)
}

const getQuestionById = async (questionId) => {
	let [results, fields] = await connection.query(
		`SELECT * FROM Quiz WHERE id = ${questionId}`
	)
	let question = results && results.length > 0 ? results[0] : {}
	return question
}
const updateQuestionById = async (
	id,
	question,
	answer_1,
	answer_2,
	answer_3,
	answer_4,
	correct_answer,
	explain_text
) => {
	let sql = `UPDATE Quiz SET question = '${question}', answer_1 = '${answer_1}', answer_2 = '${answer_2}', answer_3 = '${answer_3}', answer_4 = '${answer_4}', correct_answer = '${correct_answer}', explain_text = '${explain_text}' WHERE id = ${id}`
	let [result, fields] = await connection.query(sql)
}
const deleteQuestionById = async (id) => {
	let sql = `DELETE FROM Quiz WHERE id = ${id}`
	let [results, fields] = await connection.query(sql)
}
module.exports = {
	getAllUsers,
	getUserById,
	updateUserById,
	createUser,
	deleteUserById,
	createQuestion,
	getAllQuestion,
	getQuestionById,
	deleteQuestionById,
	updateQuestionById,
}
