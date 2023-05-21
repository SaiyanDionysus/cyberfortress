const questions = [
    {
        question: "Что такое фишинг?",
        answers: [
            { text: "Вирус, который может заразить компьютер", correct: false },
            { text: "Мошенничество, целью которого является получение личной информации пользователя", correct: true },
            { text: "Технология защиты компьютера от вирусов", correct: false },
        ]
    },

    {
        question: "Как можно понять, что письмо или сайт является фишинговым?",
        answers: [
            { text: "В письме или на сайте запрашивают личную информацию (номер банковской карты, пароль)", correct: true },
            { text: "На сайте отсутствует значок замка в адресной строке", correct: false },
            { text: "В письме есть грамматические ошибки или опечатки", correct: false },
        ]
    },
    
    {
        question: "Какие виды фишинга существуют?",
        answers: [
            { text: "Социальный фишинг", correct: false },
            { text: "Фишинг через электронную почту", correct: false },
            { text: "Фишинг через социальные сети", correct: false },
            { text: "Все вышеперечисленное", correct: true },
        ]
    },

    {
        question: "Как можно защитить себя от фишинга?",
        answers: [
            { text: "Не отвечать на эл.письма, которые запрашивают личную информацию", correct: false },
            { text: "Проверять адрес электронной почты и ссылки на сайты", correct: false },
            { text: "Использовать пароли, которые сложно угадать", correct: false },
            { text: "Все вышеперечисленное", correct: true}
        ]
    },

    {
        question: "Какие могут быть последствия, если вы попали в ловушку фишинга?",
        answers: [
            { text: "Кража личных данных и финансовых средств", correct: true },
            { text: "Установка программного обеспечения на компьютер", correct: false },
            { text: "Обнаружение пароля пользователя", correct: false },
        ]
    },

    {
        question: "Что такое «социальная инженерия» в контексте фишинга",
        answers: [
            { text: "Метод получения доступа к конфиденциальной информации через общение с человеком", correct: true },
            { text: "Взлом пароля пользователя", correct: false },
            { text: "Вирус, который заражает компьютер", correct: false },
        ]
    },

    {
        question: "Как можно проверить подлинность сайта, на который переадресовывает фишинговая ссылка?",
        answers: [
            { text: "Проверить, что адрес сайта начинается с 'https' и имеет значок замка в адресной строке", correct: true },
            { text: "Проверить, что адрес сайта соответствует официальному адресу организации или сервиса", correct: false },
            { text: "Проверить, что на сайте отсутствуют ошибки или опечатки", correct: false },
        ]
    },

    {
        question: "Что нужно делать, если вы стали жертвой фишинга?",
        answers: [
            { text: "Сменить пароли на всех сайтах, где вы используете такой же пароль", correct: true },
            { text: "Сообщить об этом своему банку или организации, где вы зарегистрированы", correct: false },
            { text: "Установить другой антивирус", correct: false },
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