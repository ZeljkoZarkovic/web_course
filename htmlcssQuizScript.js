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
        question: "Koja je svrha !DOCTYPE deklaracije u XHTML dokumentu?",
        type: "choice",
        answers: [
            { text: "Definiše naslov stranice", correct: false },
            { text: "Omogućava dodavanje CSS-a", correct: false },
            { text: "Povezuje dokument sa spoljnim JavaScript fajlom", correct: false },
            { text: "Označava verziju HTML/XHTML standarda koji se koristi", correct: true },
        ]
    },
    {
        question: "Koji tip DTD-a u XHTML-u se koristi ako želimo samo strukturu bez formatiranja?",
        type: "choice",
        answers: [
            { text: "Transitional", correct: false },
            { text: "Frameset", correct: false },
            { text: "Strict", correct: true },
            { text: "General", correct: false },
        ]
    },
    {
        question: "Da li je &ltframe&gt; novi HTML5 element?",
        type: "truefalse",
        answers: [
            { text: "Tačno", correct: false },
            { text: "Netačno", correct: true },
        ]
    },
    {
        question: "U CSS3 se mogu koristiti RGBA i HSLA boje koje omogućavaju definisanje providnosti.",
        type: "truefalse",
        answers: [
            { text: "Tačno", correct: true },
            { text: "Netačno", correct: false },
        ]
    },
    {
        question: "Napiši CSS kod koji pravi radijalni gradijent od bele (#FFF) do crne (#000).",
        type: "text",
        keywords: ["background-image", "background", "radial-gradient", "radial", "gradient", "#fff", "#000"],
        correctAnswer: "background-image: radial-gradient(#FFF, #000);"
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
