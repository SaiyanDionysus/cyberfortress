const questions = [
    {
        question: "Какую информацию следует избегать публиковать на социальных сетях?",
        answers: [
            { text: "Фотографии питомцев", correct: false },
            { text: "Номер телефона и адрес", correct: true },
            { text: "Фотографии блюд, которые вы едите", correct: false },
            { text: "Все вышеперечисленное", correct: false }
        ]
    },

    {
        question: "Какие действия могут помочь защитить профиль в социальных сетях от злоумышленников?",
        answers: [
            { text: "Использование сильных паролей", correct: true },
            { text: "Активность на аккаунте в течение продолжительного времени", correct: false },
            { text: "Разглашение личной информации в профиле", correct: false },
            { text: "Все вышеперечисленное", correct: false }
        ]
    },
    
    {
        question: "Что следует сделать, если вы стали жертвой кибербуллинга в социальных сетях?",
        answers: [
            { text: "Не обращать внимание на сообщения", correct: false },
            { text: "Обратиться за помощью к родителям или учителю", correct: true },
            { text: "Написать ответное сообщение", correct: false },
            { text: "Все вышеперечисленное", correct: false },
        ]
    },

    {
        question: "Каким образом злоумышленники могут получить доступ к вашему аккаунту в социальных сетях?",
        answers: [
            { text: "Путем угадывания пароля", correct: false },
            { text: "Путем использования вредоносных программ", correct: false },
            { text: "Путем перехвата трафика", correct: false },
            { text: "Все вышеперечисленное", correct: true}
        ]
    },

    {
        question: "Что такое двухфакторная аутентификация в социальных сетях?",
        answers: [
            { text: "Метод проверки личности пользователя через два разных фактора", correct: true },
            { text: "Метод проверки личности пользователя через два одинаковых фактора", correct: false },
            { text: "Метод проверки личности пользователя через создание двух паролей", correct: false },
            { text: "Метод проверки личности пользователя по паспорту", correct: false }
        ]
    },

    {
        question: "Какие действия могут помочь в защите от фишинговых атак в социальных сетях?",
        answers: [
            { text: "Не следует нажимать на подозрительные ссылки", correct: false },
            { text: "Не следует давать свои логин и пароль никому, даже если они попросят", correct: false },
            { text: "Не следует отвечать на подозрительные сообщения", correct: false },
            { text: "Все вышеперечисленное", correct: true }
        ]
    },

    {
        question: "Какой тип информации могут собирать злоумышленники через социальные сети?",
        answers: [
            { text: "Имя, фамилия и дата рождения", correct: false },
            { text: "Местоположение, куда вы часто ходите", correct: false },
            { text: "Любимые музыкальные группы и фильмы", correct: false },
            { text: "Все вышеперечисленное", correct: true }
        ]
    },

    {
        question: "Что такое контент-фильтр в социальных сетях?",
        answers: [
            { text: "Механизм, который блокирует нецензурный контент", correct: true },
            { text: "Механизм, который фильтрует рекламу", correct: false },
            { text: "Механизм, который фильтрует сообщения от незнакомцев", correct: false },
            { text: "Механизм, который фильтрует только комментарии", correct: false }
        ]
    },

    {
        question: "Что такое «паблик» в социальных сетях?",
        answers: [
            { text: "Личный профиль в социальной сети", correct: false },
            { text: "Группа в социальной сети, доступная для публичного просмотра", correct: true },
            { text: "Чат в социальной сети", correct: false },
            { text: "Все вышеперечисленное", correct: false }
        ]
    },

    {
        question: "Что следует делать, если вы случайно поделились своей личной информацией в социальной сети с незнакомым человеком?",
        answers: [
            { text: "Немедленно удалить свой профиль", correct: false },
            { text: "Изменить пароль", correct: false },
            { text: "Обратиться к настройкам приватности и ограничить доступ к личной информации", correct: true },
            { text: "Все вышеперечисленное", correct: false }
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