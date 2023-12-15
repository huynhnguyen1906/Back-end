const questions = []
let currentQuestionIndex = 0
let correctAnswersCount = 0
let quizStarted = false
let quizTimerInterval
let currentQuestionNumber = 1
let questionOrder = []

fetch("/api/questions")
	.then((response) => {
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`)
		}
		return response.json()
	})
	.then((data) => {
		// Cập nhật mảng questions với dữ liệu từ API
		questions.push(...data)

		// Cập nhật questionOrder sau khi dữ liệu đã được tải xong
		questionOrder = shuffleArray([...Array(questions.length).keys()])

		// Gọi hàm loadQuestions() hoặc thực hiện các bước khác tùy thuộc vào logic của ứng dụng
		loadQuestions()
	})
	.catch((error) => {
		console.error("Error fetching data from API:", error)
	})

function loadQuestions() {
	if (questions.length === 0 || currentQuestionIndex >= questions.length) {
		console.error("No questions loaded or index out of bounds.")
		return
	}

	const questionIndex = questionOrder[currentQuestionIndex]
	const currentQuestion = questions[questionIndex]

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
	questionNumberElement.innerText = `Q${questionIndex + 1}`
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
	const currentQuestion = questions[questionOrder[currentQuestionIndex]]

	const quizContent = document.querySelector(".quiz-content")
	setTimeout(() => {
		quizContent.style.opacity = 0
	}, 5)
	setTimeout(() => {
		quizContent.style.opacity = 1
	}, 150)

	function checkAnswer(selectedAnswer, correctAnswer) {
		if (selectedAnswer === correctAnswer.toString()) {
			correctAnswersCount++
		}
	}
	checkAnswer(selectedAnswer, currentQuestion.correct_answer)
	currentQuestionIndex++

	if (currentQuestionIndex < questions.length) {
		loadQuestions()
	} else {
		displayResult()
	}
}

function displayResult() {
	const quizContainer = document.querySelector(".quiz-container")
	const clearNotiBox = document.querySelector(".clear-noti-box")
	const clearNoti = document.querySelector(".clear-noti")
	const clearTime = document.querySelector(".clear-time")
	const clearQuest = document.querySelector(".clear-quest")
	const clearTimeText = `クリアタイム：${formatTime()}`

	clearInterval(quizTimerInterval)

	setTimeout(() => {
		quizContainer.style.display = "none"
	}, 100)
	clearNoti.innerText = "クイズ終了"
	clearQuest.innerText = `正解数：${correctAnswersCount}/${questions.length}`
	clearTime.innerText = clearTimeText
	clearNotiBox.style.display = "block"
	setTimeout(() => {
		clearNotiBox.style.opacity = 1
	}, 200)
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
			const timerElement = document.querySelector(".timer") // Thêm dòng này để lấy đúng element
			const minutes = Math.floor(seconds / 60)
				.toString()
				.padStart(2, "0")
			const remainingSeconds = (seconds % 60).toString().padStart(2, "0")
			timerElement.innerText = `${minutes}:${remainingSeconds}`
		}, 1000)
	}
}

const startBtn = document.querySelector(".start-btn")
startBtn.addEventListener("click", function () {
	this.remove()

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
