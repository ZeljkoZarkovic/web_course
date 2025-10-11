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
        question: "Šta je XML i koja mu je osnovna svrha?",
        type: "choice",
        answers: [
            { text: "XML je programski jezik za izradu aplikacija", correct: false },
            { text: "XML je standardni format za opis i razmenu podataka", correct: true },
            { text: "XML je alat za uređivanje slika", correct: false },
            { text: "XML je protokol za prenos video sadržaja", correct: false },
        ]
    },
    {
        question: "Koji od sledećih jezika služi za transformaciju XML dokumenata?",
        type: "choice",
        answers: [
            { text: "XPath", correct: false },
            { text: "XQuery", correct: false },
            { text: "XSLT", correct: true },
            { text: "DTD", correct: false },
        ]
    },
    {
        question: "XML omogućava korisnicima da definišu sopstvene oznake (tagove).",
        type: "truefalse",
        answers: [
            { text: "Tačno", correct: true },
            { text: "Netačno", correct: false },
        ]
    },
    {
        question: "SOAP i WSDL se koriste za definisanje i razmenu podataka u okviru HTML-a.",
        type: "truefalse",
        answers: [
            { text: "Tačno", correct: false },
            { text: "Netačno", correct: true },
        ]
    },
    {
        question: "Navedite ključne aspekte bezbednosti web servisa zasnovanih na XML-u.",
        type: "text",
        keywords: ["autentifikacija", "autorizacija", "poverljivost", "integritet"],
        correctAnswer: "Autentifikacija, autorizacija, poverljivost i integritet."
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
