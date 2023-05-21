const questions = [
    {
        question: "Что стоит использовать в паролях?",
        answers: [
            { text: "Имя и фамилия пользователя", correct: false },
            { text: "Дата рождения пользователя", correct: false },
            { text: "Номер телефона пользователя", correct: false },
            { text: "Случайный набор символов", correct: true }
        ]
    },

    {
        question: "Какой из перечисленных вариантов является наиболее безопасным способом хранения паролей?",
        answers: [
            { text: "На бумажке под клавиатурой", correct: false },
            { text: "В текстовом документе на компьютере", correct: false },
            { text: "Имя и фамилия", correct: false },
            { text: "Все вышеперечисленное", correct: true }
        ]
    },
    
    {
        question: "Какую информацию стоит считать конфиденциальной?",
        answers: [
            { text: "Номер телефона", correct: false },
            { text: "Адрес электронной почты", correct: false },
            { text: "Имя и фамилия", correct: false },
            { text: "Все вышеперечисленное", correct: true },
        ]
    },

    {
        question: "Какой из перечисленных вариантов является наиболее безопасным способом подключения к открытой Wi-Fi сети?",
        answers: [
            { text: "Использование VPN", correct: true },
            { text: "Подключение напрямую", correct: false },
            { text: "Ввод своих учетных данных на странице авторизации", correct: false },
            { text: "Нет правильного ответа", correct: false}
        ]
    },

    {
        question: "Какие из перечисленных действий могут способствовать безопасности веб-браузера?",
        answers: [
            { text: "Обновление браузера до последней версии", correct: false },
            { text: "Установка антивирусного ПО", correct: false },
            { text: "Очистка кэша и истории посещений", correct: false },
            { text: "Все вышеперечисленное", correct: true }
        ]
    },

    {
        question: "Что такое фишинг?",
        answers: [
            { text: "Неавторизованный доступ к чужой учетной записи", correct: false },
            { text: "Угон личных данных пользователя", correct: false },
            { text: "Мошенническая попытка получить личную информацию пользователя", correct: true },
            { text: "Атака на серверы", correct: false }
        ]
    },

    {
        question: "Какие из перечисленных действий могут способствовать безопасности электронной почты?",
        answers: [
            { text: "Использование сложного пароля", correct: false },
            { text: "Неотвечение на подозрительные письма", correct: false },
            { text: "Включение двухфакторной аутентификации", correct: false },
            { text: "Все вышеперечисленное", correct: true }
        ]
    },

    {
        question: "Какой из перечисленных вариантов является наиболее безопасным способом передачи конфиденциальной информации?",
        answers: [
            { text: "Через обычную электронную почту", correct: false },
            { text: "Через шифрованный канал связи, такой как HTTPS или SFTP", correct: true },
            { text: "Через мессенджер", correct: false },
            { text: "Нет правильного ответа", correct: false }
        ]
    },

    {
        question: "Какие из перечисленных действий могут помочь защитить социальные сети от злоумышленников?",
        answers: [
            { text: "Использование сильных паролей", correct: false },
            { text: "Неактивность на аккаунте в течение продолжительного времени", correct: false },
            { text: "Не разглашать конфиденциальную информацию в профиле", correct: false },
            { text: "Все вышеперечисленное", correct: true }
        ]
    },

    {
        question: "Какой из перечисленных вариантов является наиболее безопасным способом удаления конфиденциальной информации с компьютера?",
        answers: [
            { text: "Удаление файла в корзину", correct: false },
            { text: 'Использование команды "форматирование" для диска', correct: false },
            { text: "Использование специальных программ для безопасного удаления данных", correct: true },
            { text: "Нет правильного ответа", correct: false }
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