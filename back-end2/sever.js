const express = require("express");
const mysql = require("mysql");
const path = require("path");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());
const port = process.env.PORT || 8080;
const host = process.env.HOST_NAME || "localhost";

// Set 'ejs' as the template engine
app.set("view engine", "ejs");
// Set the views directory
app.set("views", path.join(__dirname));

const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	port: process.env.DB_PORT,
});

let dbConnected = false;

db.connect((err) => {
	if (err) {
		console.log("エラーが発生しました。");
	} else {
		console.log("せいこうしました！");
		dbConnected = true;
	}
});

app.get("/users", (req, res) => {
	db.query("SELECT user_name, dob, country FROM users", (err, result) => {
		if (err) {
			console.log("Error fetching users: ", err);
			res.status(500).send("Error fetching users");
		} else {
			console.log(result);
			res.send(result);
		}
	});
});

app.get("/", (req, res) => {
	res.render("home", { message: "Hello World!", dbConnected: dbConnected });
});

app.listen(port, () => {
	console.log(`App running on http://${host}:${port}/`);
});
