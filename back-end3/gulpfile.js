"use strict"

// import module
const gulp = require("gulp")
const sass = require("gulp-sass")(require("sass"))
const sourcemaps = require("gulp-sourcemaps")
const autoprefixer = require("gulp-autoprefixer")
const plumber = require("gulp-plumber")
const notify = require("gulp-notify")

//gulp task
const { series, task, src, dest, watch } = gulp

/*
in-out dir settings
*/

const cssSrcPath = "./src/sass"
const cssDestPath = "./src/public/css"
const jsSrcPath = "./src/public/js"
const jsDestPath = "./src/public/js"

//run task sass
task("sass", (done) => {
	console.log("///// sassのタスク実行 /////")
	src(cssSrcPath + "/*.scss")
		.pipe(
			plumber({
				errorHandler: notify.onError("Error: <%= error.message %>"),
			})
		)
		.pipe(
			sass({
				outputStyle: "expanded", // expanded or compressed <- CSSの圧縮
			})
		)
		.pipe(sourcemaps.write("./maps"))
		.pipe(autoprefixer())
		.pipe(dest(cssDestPath))
	done()
})

//run task js
task("js", (done) => {
	console.log(">>>>>>>> jsのタスク実行 <<<<<<<<<")
	src(jsSrcPath + "/*.js")
		.pipe(
			plumber({
				errorHandler: notify.onError("Error: <%= error.message %>"),
			})
		)
		//授業では特に触れない為、各自でモジュールを追加して環境を組む
		.pipe(dest(jsDestPath))
	done()
})

//run task watch
task("watch", (done) => {
	console.log("+++++ watchの実行 +++++")
	watch(`${cssSrcPath}/*.scss`, task("sass"))
	watch(`${jsSrcPath}/*.js`, task("js"))
	done()
})

task("default", series("sass", "js"))
