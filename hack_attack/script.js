const questions = [
    {
        question: "Какой из следующих вариантов является хорошей практикой для обезопасивания от хакерских атак?",
        answers: [
            { text: "Регулярно обновлять программное обеспечение и операционные системы", correct: true },
            { text: "Отключить брандмауэр и антивирусную защиту для повышения производительности.", correct: false },
            { text: " Использовать слабые пароли для удобства запоминания.", correct: false }
        ]
    },

    {
        question: "Какая из следующих мер является эффективной для защиты от перехвата сетевого трафика?",
        answers: [
            { text: "Отключение брандмауэра для облегчения работы сети.", correct: false },
            { text: "Использование шифрования данных, например, с помощью протокола HTTPS.", correct: true },
            { text: "Открытие открытых портов на сетевом оборудовании.", correct: false }
        ]
    },

    {
        question: "Что следует делать, чтобы защитить свои учетные записи онлайн?",
        answers: [
            { text: "Хранить пароли в открытом виде на личном компьютере.", correct: false },
            { text: "Регулярно делиться паролями с друзьями и коллегами.", correct: false },
            { text: "Использовать уникальные и сложные пароли для каждой учетной записи.", correct: true }
        ]
    },
    
    {
        question: "Какой из следующих методов помогает предотвратить атаки по переполнению буфера?",
        answers: [
            { text: "Отключение брандмауэра для ускорения работы системы.", correct: false },
            { text: "Проверка и фильтрация входных данных.", correct: true },
            { text: "Разрешение удаленного доступа без аутентификации.", correct: false }
        ]
    },

    {
        question: "Какая мера обеспечивает безопасность в беспроводных сетях?",
        answers: [
            { text: "Использование сильного и уникального пароля для Wi-Fi сети.", correct: true },
            { text: "Отключение шифрования Wi-Fi для улучшения скорости передачи данных.", correct: false },
            { text: "Разрешение любому устройству автоматически подключаться к Wi-Fi сети.", correct: false }
        ]
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
    nextButton.innerHTML = "Далее";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Правильных ответов ${score} из ${questions.length}!`;
    nextButton.innerHTML = "Пройти снова";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    }else {
        startQuiz();
    }
});

startQuiz(); 