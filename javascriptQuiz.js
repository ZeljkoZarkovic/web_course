const modal = document.getElementById("quizModal");
const openBtn = document.getElementById("open-quiz");
const closeBtn = document.getElementById("closeQuiz");

openBtn.addEventListener("click", () => {
    modal.style.display = "block";
    startQuiz();
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

const questions = [
    {
        question: "Šta je JavaScript?",
        type: "choice",
        answers: [
            { text: "Programski jezik koji se izvršava na strani klijenta i omogućava interaktivnost web stranica", correct: true },
            { text: "Programski jezik koji se izvršava isključivo na serveru", correct: false },
            { text: "Jezik za uređivanje slika", correct: false },
            { text: "Format za razmenu podataka", correct: false }
        ]
    },
    {
        question: "Koja je glavna svrha jQuery biblioteke?",
        type: "choice",
        answers: [
            { text: "Upravljanje bazama podataka", correct: false },
            { text: "Olakšavanje rada sa DOM elementima, događajima i AJAX-om", correct: true },
            { text: "Kreiranje PDF dokumenata", correct: false },
            { text: "Pokretanje servera", correct: false }
        ]
    },
    {
        question: "JavaScript kod se uvek izvršava na serveru.",
        type: "truefalse",
        answers: [
            { text: "Tačno", correct: false },
            { text: "Netačno", correct: true }
        ]
    },
    {
        question: "DOM omogućava pristup i manipulaciju HTML dokumentima pomoću JavaScript-a.",
        type: "truefalse",
        answers: [
            { text: "Tačno", correct: true },
            { text: "Netačno", correct: false }
        ]
    },
    {
        question: "Koje promenljive (valiables) postoje u JavaScript-u.",
        type: "text",
        keywords: ["integer", "floating point number", "boolean", "string", "niz", "objekat"],
        correctAnswer: "Integer, Floating point number, Boolean, String, Niz i Objekat."
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Dalje";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = (currentQuestionIndex + 1) + ". " + currentQuestion.question;

    if (currentQuestion.type === "choice" || currentQuestion.type === "truefalse") {
        currentQuestion.answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");
            answerButtons.appendChild(button);
            button.dataset.correct = answer.correct;
            button.addEventListener("click", selectAnswer);
        });
    } else if (currentQuestion.type === "text") {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Unesi svoj odgovor...";
        input.classList.add("btn");
        input.style.textAlign = "center";
        input.id = "text-answer";
        answerButtons.appendChild(input);

        nextButton.style.display = "block";
        nextButton.onclick = () => {
            checkTextAnswer();
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                showScore();
            }
        };
    }
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    nextButton.onclick = null;
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
        Array.from(answerButtons.children).forEach(button => {
            if (button.dataset.correct === "true") {
                button.classList.add("correct");
            }
        });
    }

    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
    });

    nextButton.style.display = "block";
}


function checkTextAnswer() {
    const input = document.getElementById("text-answer");
    const userAnswer = input.value.trim().toLowerCase();
    const currentQuestion = questions[currentQuestionIndex];
    let isCorrect = true;

    currentQuestion.keywords.forEach(word => {
        if (!userAnswer.includes(word)) {
            isCorrect = false;
        }
    });

    if (isCorrect) {
        score++;
        questionElement.innerHTML += "<br><br><b>Tačno!</b>";
    } else {
        questionElement.innerHTML += "<br><br><b>Tačan odgovor:</b> " + currentQuestion.correctAnswer;
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Osvojio si ${score} od ${questions.length} poena!`;
    nextButton.innerHTML = "Igraj ponovo";
    nextButton.style.display = "block";
}

function handleNextButton() {
    let currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.type === "text") {
        checkTextAnswer();
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
