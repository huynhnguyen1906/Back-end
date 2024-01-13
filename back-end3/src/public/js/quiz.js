const questions = []
let correctQuestions = []
let incorrectQuestions = []
let incorrectAnswersText = []
let currentQuestionIndex = 0
let correctAnswersCount = 0
let quizStarted = false
let quizTimerInterval
let currentQuestionNumber = 1

window.onload = function () {
	fetch("/api/questions")
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`)
			}
			return response.json()
		})
		.then((data) => {
			let shuffledData = shuffleArray(data)
			questions.push(...shuffledData)

			loadQuestions()
		})
		.catch((error) => {
			console.error("Error fetching data from API:", error)
		})
}
console.log(questions)

function loadQuestions() {
	if (questions.length === 0 || currentQuestionIndex >= questions.length) {
		console.error("No questions loaded or index out of bounds.")
		return
	}

	const currentQuestion = questions[currentQuestionIndex]

	// Kiểm tra xem currentQuestion có tồn tại hay không
	if (!currentQuestion || !currentQuestion.hasOwnProperty("question")) {
		console.error("Invalid question data:", currentQuestion)
		return
	}

	const questionNumberElement = document.querySelector(".q-number")
	const questionElement = document.querySelector(".question")
	const answerButtons = document.querySelectorAll(".answer")
	const statusElement = document.querySelector(".status")

	// Sử dụng questionIndex + 1 để hiển thị số câu hỏi hiện tại
	questionNumberElement.innerText = `Q${currentQuestionIndex + 1}`
	questionElement.innerText = currentQuestion.question
	statusElement.innerText = `問数 ${currentQuestionIndex + 1}/${
		questions.length
	}`

	const shuffledAnswers = shuffleArray([...currentQuestion.answers])
	answerButtons.forEach((button, index) => {
		button.innerText = shuffledAnswers[index]
		button.removeEventListener("click", answerButtonClickHandler)
		button.addEventListener("click", answerButtonClickHandler)
	})

	// Không cần tăng giá trị của currentQuestionNumber ở đây
}

function shuffleArray(array) {
	const shuffledArray = array.slice()
	for (let i = shuffledArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
	}
	return shuffledArray
}

function answerButtonClickHandler() {
	const selectedAnswer = this.innerText
	const currentQuestion = questions[currentQuestionIndex]

	const quizContent = document.querySelector(".quiz-content")
	setTimeout(() => {
		quizContent.style.opacity = 0
	}, 5)
	setTimeout(() => {
		quizContent.style.opacity = 1
	}, 150)

	function checkAnswer(selectedAnswer, correctAnswer, questionIndex) {
		if (selectedAnswer === correctAnswer.toString()) {
			correctAnswersCount++
			return { correct: true, questionIndex }
		} else {
			incorrectAnswersText.push(selectedAnswer)
			return { correct: false, questionIndex }
		}
	}

	let result = checkAnswer(
		selectedAnswer,
		currentQuestion.correct_answer,
		currentQuestionIndex
	)
	if (result.correct) {
		correctQuestions.push(result.questionIndex)
	} else {
		incorrectQuestions.push(result.questionIndex)
	}

	currentQuestionIndex++

	if (currentQuestionIndex < questions.length) {
		console.log(
			"correctQuestions:",
			correctQuestions,
			"incorrectQuestions:",
			incorrectQuestions,
			"incorrectAnswersText:",
			incorrectAnswersText
		)

		loadQuestions()
	} else {
		displayResult()
	}
}
function displayResult() {
	const quizContainer = document.querySelector(".quiz-container")
	const clearNotiBox = document.querySelector(".clear-noti-box")
	const clearTime = document.querySelector(".clear-time")
	const clearQuest = document.querySelector(".clear-quest")
	const clearTimeText = `${formatTime()}`
	const checkElements = document.querySelectorAll(".check")
	const questExplainBox = document.querySelector(".quest-explain-box")
	const checkBoxes = document.querySelectorAll(".u-a")
	const closeBtn = document.querySelector(".close-button")

	for (let i = 0; i < checkElements.length; i++) {
		if (correctQuestions.includes(i)) {
			checkElements[i].textContent = "〇"
		} else if (incorrectQuestions.includes(i)) {
			checkElements[i].textContent = "✕"
		}
	}

	clearInterval(quizTimerInterval)

	setTimeout(() => {
		quizContainer.style.display = "none"
	}, 100)
	clearQuest.innerText = correctAnswersCount
	clearTime.innerText = clearTimeText
	clearNotiBox.style.display = "block"
	setTimeout(() => {
		clearNotiBox.style.opacity = 1
	}, 200)

	function updateQuestionDetails(i) {
		let question = questions[i]

		document.querySelector(".quest-explain-title").textContent = `Q${i + 1}`
		document.querySelector(".quest-explain").textContent = question.question

		const answerElements = document.querySelectorAll(".e-answer")
		for (let j = 0; j < answerElements.length; j++) {
			answerElements[j].classList.remove("e-a-cr", "e-a-incr")

			answerElements[j].textContent = question.answers[j]

			if (answerElements[j].textContent === question.correct_answer) {
				answerElements[j].classList.add("e-a-cr")
			}

			if (incorrectAnswersText.includes(answerElements[j].textContent)) {
				answerElements[j].classList.add("e-a-incr")
			}
		}

		document.querySelector(".explain-text").textContent = question.explain
	}

	for (let i = 0; i < checkBoxes.length; i++) {
		checkBoxes[i].addEventListener("click", function (event) {
			questExplainBox.style.display = "block"
			event.stopPropagation()

			updateQuestionDetails(i)
		})
	}
	closeBtn.addEventListener("click", function () {
		questExplainBox.style.display = "none"
	})
	document.addEventListener("click", function (event) {
		if (!questExplainBox.contains(event.target)) {
			questExplainBox.style.display = "none"
		}
	})
}

function formatTime() {
	const minutes = Math.floor(seconds / 60)
		.toString()
		.padStart(2, "0")
	const remainingSeconds = (seconds % 60).toString().padStart(2, "0")
	return `${minutes}:${remainingSeconds}`
}

let seconds = 0

function startQuizTimer() {
	if (!quizStarted) {
		quizStarted = true
		seconds = 0
		quizTimerInterval = setInterval(function () {
			seconds++
			const timerElement = document.querySelector(".timer")
			const minutes = Math.floor(seconds / 60)
				.toString()
				.padStart(2, "0")
			const remainingSeconds = (seconds % 60).toString().padStart(2, "0")
			timerElement.innerText = `${minutes}:${remainingSeconds}`
		}, 1000)
	}
}

const startBtn = document.querySelector(".start-btn")
const startDisplay = document.querySelector(".start-display")
startBtn.addEventListener("click", function () {
	this.remove()
	startDisplay.remove()

	let countdown = 3
	const countdownBox = document.querySelector(".countdown-time")
	const countdownTime = document.querySelector(".timer")
	countdownBox.style.display = "flex"
	setTimeout(() => {
		countdownBox.style.opacity = 1
		countdownTime.innerText = countdown
		let intervalId = setInterval(function () {
			countdown--
			countdownTime.innerText = countdown

			if (countdown === 0) {
				clearInterval(intervalId)
				setTimeout(() => {
					countdownBox.remove()
					const quizContainer = document.querySelector(".quiz-container")
					quizContainer.style.display = "block"
					setTimeout(() => {
						quizContainer.style.opacity = 1
					}, 5)
					loadQuestions()
					startQuizTimer()
				}, 1000)
			}
		}, 1000)
	}, 5)
})
