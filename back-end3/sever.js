require("dotenv").config()
const express = require("express") //commonjs
const configViewEngine = require("./src/config/viewEngine")
const webRoutes = require("./src/routes/web")
const connection = require("./src/config/database")
const app = express() // app express
const port = process.env.PORT || 8081 // port => hardcode
const hostname = process.env.HOST_NAME

//config req.body
app.use(express.urlencoded({ extended: true })) //for form data

app.use(express.json()) //for json data

//config template engine and config static files
configViewEngine(app)

app.get("/api/questions", (req, res) => {
	const query = "SELECT * FROM Quiz"

	connection.query(query, (err, rows) => {
		if (err) {
			console.error("Error querying database:", err)
			res.status(500).send("Internal Server Error")
		} else {
			const questions = rows.map((row) => ({
				question: row.question,
				answers: [row.answer_1, row.answer_2, row.answer_3, row.answer_4],
				correct_answer: row.correct_answer,
			}))

			res.json(questions)
		}
	})
})

//khai báo route
app.use("/", webRoutes)

app.listen(port, hostname, () => {
	console.log(`App running on http://${hostname}:${port}/`)
})
