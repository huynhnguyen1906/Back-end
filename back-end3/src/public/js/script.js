const questions = [
	{
		question:
			"HTTP/1.1プロトコルのリクエストメソッドの説明として正しくないのは次のうちどれか。",
		answer_1: "HTMLのフォームで指定できるのはGETとPOSTのみである。",
		answer_2:
			"GETでは、リクエストパラメータはURLに含まれるが、POSTではボディに含まれる",
		answer_3: "GETではデータサイズの制限があるが、POSTにはない。",
		answer_4:
			"GETリクエストに対しては、PUTリクエスト付きのレスポンスメッセージが戻る。",
		correctAnswer:
			"GETリクエストに対しては、PUTリクエスト付きのレスポンスメッセージが戻る。",
	},
	{
		question: "Ajax と最も関連のない技術は次のうちどれか。",
		answers: ["JavaScript", "JavaServerPages", "jQuery", "JSON"],
		correctAnswer: "JavaServerPages",
	},
	{
		question:
			"次のうち、JavaScriptの変数の宣言で、変数の値を変更できないのはどれか。",
		answers: ["const", "var", "let", "どれも変更できる"],
		correctAnswer: "const",
	},
	{
		question:
			"価格を表示する箇所で円マーク(¥)を正しく表示できないのは次のうちどれか。 なお、文字セットは UTF8、フォントは arial、円マークの unicode 文字番号は10進表記で165とする。",
		answers: ["&yen;", "&#165;", "&#&#xA5;", "¥"],
		correctAnswer: "&#&#xA5;",
	},
	{
		question:
			"ウェブサイトのコンテンツを、一元的に管理する仕組みの名称として最もふさわしいものを選択してください。",
		answers: ["Blog", "CMS", "リポジトリ", "データウェアハウス"],
		correctAnswer: "CMS",
	},
	{
		question: "文字（実体）参照として無効な記述を選択してください。",
		answers: ["&amp;", "&#39;", "&#x266A;", "&0x1A;"],
		correctAnswer: "&0x1A;",
	},
	{
		question:
			"HTML5のコンテンツ・モデル（Content models）において、セクショニング・コンテンツ（Sectioning content）である要素の組み合わせで適切なものはどれか。正しいものを1つ選びなさい。",
		answers: [
			"h1 h2 h3 h4 h5 h6",
			"footer header main section",
			"blockquote body fieldset figure td",
			"article aside nav section",
		],
		correctAnswer: "article aside nav section",
	},
]

let currentQuestionIndex = 0
let correctAnswersCount = 0
let quizStarted = false
let quizTimerInterval

let questionOrder = shuffleArray([...Array(questions.length).keys()])

let currentQuestionNumber = 1

function loadQuestions() {
	const questionIndex = questionOrder[currentQuestionIndex]
	const currentQuestion = questions[questionIndex]
	const questionNumberElement = document.querySelector(".q-number")
	const questionElement = document.querySelector(".question")
	const answerButtons = document.querySelectorAll(".answer")
	const statusElement = document.querySelector(".status")

	questionNumberElement.innerText = `Q${currentQuestionNumber}`
	questionElement.innerText = currentQuestion.question
	statusElement.innerText = `問数 ${currentQuestionIndex + 1}/${
		questions.length
	}`

	const shuffledAnswers = shuffleArray(currentQuestion.answers)
	answerButtons.forEach((button, index) => {
		button.innerText = shuffledAnswers[index]
		button.removeEventListener("click", answerButtonClickHandler)
		button.addEventListener("click", answerButtonClickHandler)
	})

	currentQuestionNumber++
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
	const currentQuestion = questions[questionOrder[currentQuestionIndex]] // Sửa đổi ở đây
	const quizContent = document.querySelector(".quiz-content")
	setTimeout(() => {
		quizContent.style.opacity = 0
	}, 5)
	setTimeout(() => {
		quizContent.style.opacity = 1
	}, 150)
	checkAnswer(selectedAnswer, currentQuestion.correctAnswer)
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

function checkAnswer(selectedAnswer, correctAnswer) {
	if (selectedAnswer === correctAnswer.toString()) {
		// Sửa đổi ở đây
		correctAnswersCount++
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
