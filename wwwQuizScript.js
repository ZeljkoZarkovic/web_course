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
        question: "Koja organizacija je razvila prvu računarsku mrežu ARPANET?",
        type: "choice",
        answers: [
            { text: "NASA", correct: false },
            { text: "ARPA", correct: true },
            { text: "IETF", correct: false },
            { text: "ISOC", correct: false },
        ]
    },
    {
        question: "Koja je ključna karakteristika Full-duplex prenosa?",
        type: "choice",
        answers: [
            { text: "Podaci se mogu slati samo u jednom smeru", correct: false },
            { text: "Uređaji šalju podatke, ali ne istovremeno", correct: false },
            { text: "Uređaji mogu istovremeno slati i primati podatke", correct: true },
            { text: "Prenos se obavlja samo preko bežične mreže", correct: false },
        ]
    },
    {
        question: "Internet protokol (IP) omogućava isporuku podataka bez prethodnog uspostavljanja veze.",
        type: "truefalse",
        answers: [
            { text: "Tačno", correct: true },
            { text: "Netačno", correct: false },
        ]
    },
    {
        question: "Switch uređaj prosleđuje pakete koristeći IP adrese.",
        type: "truefalse",
        answers: [
            { text: "Tačno", correct: false },
            { text: "Netačno", correct: true },
        ]
    },
    {
        question: "Objasni kako funkcioniše AJAX?",
        type: "text",
        keywords: ["ajax", "interaktiv", "stranica"],
        correctAnswer: "AJAX omogućava web programerima kreiranje interaktivnih sajtova koji funkcionišu slično desktop programima, za razliku od klasičnih sajtova, gde se nakon svake promene učitava cela stranica."
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
