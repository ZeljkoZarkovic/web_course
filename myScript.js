document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        window.scrollTo({
            top: target.offsetTop,
            behavior: 'smooth'
        });
    });
});

const modal = document.getElementById("quizModal");
const openQuizBtn = document.getElementById("open-quiz");
const closeQuizBtn = document.getElementById("closeQuiz");

const guideStep = document.getElementById("quizGuide");
const userStep = document.getElementById("userInfo");
const quizStep = document.getElementById("quizContainer");
const resultStep = document.getElementById("quizResult");

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

openQuizBtn.addEventListener("click", () => {
    modal.style.display = "flex";
    guideStep.classList.add("active");
    userStep.classList.remove("active");
    quizStep.classList.remove("active");
    resultStep.classList.remove("active");
    document.getElementById("imePrezime").value = "";
    document.getElementById("indeksBroj").value = "";
});

closeQuizBtn.addEventListener("click", () => modal.style.display = "none");

modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
});

document.getElementById("guideNext").addEventListener("click", () => {
    guideStep.classList.remove("active");
    userStep.classList.add("active");
});

document.getElementById("userNext").addEventListener("click", () => {
    const imePrezime = document.getElementById("imePrezime").value.trim();
    const indeks = document.getElementById("indeksBroj").value.trim();
    if (!imePrezime) {
        alert("Popunite sva polja.");
        return;
    }
    userStep.classList.remove("active");
    quizStep.classList.add("active");
    startQuiz();
});

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = "Sledeće";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    const lessonTitle = document.getElementById("lesson_title");
    const lessonTitles = [
        "Internet i WWW",
        "HTML5 i CSS3",
        "JavaScript",
        "XML",
        "WEB dizajn",
        "SEO"
    ];
    const lessonIndex = Math.floor(currentQuestionIndex / 7);
    if (lessonTitles[lessonIndex]) {
        lessonTitle.textContent = lessonTitles[lessonIndex];
    }

    if (currentQuestion.type === "choice" || currentQuestion.type === "truefalse") {
        currentQuestion.answers.forEach(answer => {
            const btn = document.createElement("button");
            btn.className = "btn";
            btn.innerText = answer.text;
            btn.dataset.correct = answer.correct;
            btn.addEventListener("click", selectAnswer);
            answerButtons.appendChild(btn);
        });
    }

    else if (currentQuestion.type === "multiple") {
        currentQuestion.answers.forEach(answer => {
            const btn = document.createElement("button");
            btn.className = "btn";
            btn.innerText = answer.text;
            btn.dataset.correct = answer.correct;
            btn.addEventListener("click", () => handleMultipleSelection(btn, currentQuestion));
            answerButtons.appendChild(btn);
        });
    }

    else if (currentQuestion.type === "text") {
        const input = document.createElement("input");
        input.type = "text";
        input.id = "text-answer";
        input.placeholder = "Unesi svoj odgovor...";
        input.style.width = "90%";
        input.style.margin = "8px auto";
        input.style.padding = "10px";
        input.style.display = "block";
        answerButtons.appendChild(input);

        nextButton.style.display = "inline-block";
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

function handleMultipleSelection(selectedBtn, currentQuestion) {
    const buttons = Array.from(answerButtons.children);
    const correctButtons = buttons.filter(b => b.dataset.correct === "true");
    const totalCorrect = correctButtons.length;

    if (buttons.every(b => b.disabled)) return;

    const isCorrect = selectedBtn.dataset.correct === "true";
    selectedBtn.classList.add(isCorrect ? "correct" : "incorrect");
    selectedBtn.disabled = true;

    if (!isCorrect) {
        buttons.forEach(b => {
            if (b.dataset.correct === "true") b.classList.add("correct");
            b.disabled = true;
        });
        nextButton.style.display = "inline-block";
        nextButton.onclick = () => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) showQuestion();
            else showScore();
        };
        return;
    }

    const selectedCorrect = buttons.filter(b => b.classList.contains("correct")).length;

    if (selectedCorrect === totalCorrect) {
        buttons.forEach(b => {
            if (b.dataset.correct === "false") b.classList.add("incorrect");
            b.disabled = true;
        });

        score++;

        nextButton.style.display = "inline-block";
        nextButton.onclick = () => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) showQuestion();
            else showScore();
        };
    }
}

function resetState() {
    nextButton.style.display = "none";
    nextButton.onclick = null;
    while (answerButtons.firstChild) answerButtons.removeChild(answerButtons.firstChild);
}

function selectAnswer(e) {
    const selected = e.target;
    const isCorrect = selected.dataset.correct === "true";

    if (isCorrect) {
        selected.classList.add("correct");
        score++;
    } else {
        selected.classList.add("incorrect");
        Array.from(answerButtons.children).forEach(btn => {
            if (btn.dataset.correct === "true") btn.classList.add("correct");
        });
    }

    Array.from(answerButtons.children).forEach(btn => btn.disabled = true);

    nextButton.style.display = "inline-block";
    nextButton.onclick = () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
    };
}

function checkTextAnswer() {
    const input = document.getElementById("text-answer");
    const userAnswer = input.value.trim().toLowerCase();
    const currentQuestion = questions[currentQuestionIndex];
    let isCorrect = true;

    currentQuestion.keywords.forEach(k => {
        if (!userAnswer.includes(k.toLowerCase())) isCorrect = false;
    });
    if (isCorrect) {
        score++;
        questionElement.innerHTML += "<div style='margin-top:10px; color:green; font-weight:600;'>Tačno!</div>";
    } else {
        questionElement.innerHTML += `<div style='margin-top:10px; color:#c00; font-weight:600;'>Tačan odgovor: ${currentQuestion.correctAnswer}</div>`;
    }
}

function showScore() {
    quizStep.classList.remove("active");
    resultStep.classList.add("active");

    const percentage = Math.round((score / questions.length) * 100);

    document.getElementById("scoreText").innerHTML = `
    Vaš rezultat ${score} od ${questions.length} (${percentage}%)
  `;

    const resultMessage = document.createElement("div");
    resultMessage.style.marginTop = "10px";
    resultMessage.style.fontWeight = "bold";
    resultMessage.style.fontSize = "1.2em";

    if (percentage >= 70) {
        resultMessage.style.color = "green";
        resultMessage.textContent = "ČESTITAMO - USPEŠNO STE POLOŽILI ZAVRŠNI ISPIT!";
    } else {
        resultMessage.style.color = "red";
        resultMessage.textContent = "NAŽALOST NISTE POLOŽILI - ŽELIMO VAM VIŠE SREĆE SLEDEĆI PUT!";
    }

    document.getElementById("scoreText").appendChild(resultMessage);

    animateProgress(percentage);
    sendResultToGoogle(percentage);
}

function animateProgress(percent) {
    const circle = document.querySelector(".progress-circle");
    const percentageSpan = document.getElementById("percentage");
    let start = 0;

    const interval = setInterval(() => {
        percentageSpan.innerText = `${start}%`;
        circle.style.background = `conic-gradient(#045293 ${start * 3.6}deg, #001e4d ${start * 3.6}deg)`;

        if (start >= percent) {
            clearInterval(interval);
        } else {
            start++;
        }
    }, 12);
}

function sendResultToGoogle(percent) {
    const imePrezime = document.getElementById("imePrezime").value;
    const smer = document.getElementById("smer").value;
    const indeks = document.getElementById("indeksBroj").value;
    const url = "https://docs.google.com/forms/d/e/1FAIpQLSe0Mu0Uvz67HY1ATTkqWbyhCyv0Iupeo9vTrhJSmwHXQhX2BA/formResponse";
    const data = new FormData();
    data.append("entry.1198736468", imePrezime);
    data.append("entry.550644946", smer);
    data.append("entry.1462552998", indeks);
    data.append("entry.2116282997", percent + "%");

    const status = percent >= 70 ? "POLOŽENO" : "NIJE POLOŽENO";
    data.append("entry.1725953495", status);
    fetch(url, { method: "POST", body: data, mode: "no-cors" });
}

document.getElementById("retryBtn").addEventListener("click", () => {
    resultStep.classList.remove("active");
    quizStep.classList.add("active");
    startQuiz();
});

document.getElementById("goHomeBtn").addEventListener("click", () => {
    modal.style.display = "none";
    window.scrollTo({ top: 0, behavior: "smooth" });
});

document.getElementById("rateBtn").addEventListener("click", () => {
    window.location.href = "rate.html";
});


