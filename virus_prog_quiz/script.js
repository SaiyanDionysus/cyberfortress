const questions = [
    {
        question: "Что такое вредоносное ПО?",
        answers: [
            { text: "Программное обеспечение, предназначенное для защиты компьютера", correct: false },
            { text: "Программное обеспечение, способное навредить компьютеру или вашим данным", correct: true },
            { text: "Онлайн-сервис для обмена файлами", correct: false },
            { text: "Графический дизайнер для создания веб-сайтов", correct: false }
        ]
    },

    {
        question: "Какое из перечисленных является типом вредоносного ПО?",
        answers: [
            { text: "MS Word", correct: false },
            { text: "Антивирус", correct: false },
            { text: "Руткит", correct: true },
            { text: "Google Chrome", correct: false }
        ]
    },
    
    {
        question: "Какое вредоносное ПО заставляет жертву платить вымогателям, чтобы вернуть доступ к своим данным?",
        answers: [
            { text: "Троян-шифровальщик", correct: true },
            { text: "Руткит", correct: false },
            { text: "Кейлоггер", correct: false },
            { text: "Вирус", correct: false },
        ]
    },

    {
        question: "Что такое фишинг?",
        answers: [
            { text: "Тип вируса, который удаляет важные файлы", correct: false },
            { text: "Метод обмана, в котором злоумышленники пытаются получить ваши личные данные", correct: true },
            { text: "Тип вредоносного ПО, которое собирает информацию о пользователях без их ведома", correct: false },
            { text: "Атака, где с помощью вашего компьютер отправляется большое количество запросов на сервер", correct: false}
        ]
    },

    {
        question: "Какое вредоносное ПО используется для перехвата вводимых пользователем данных, таких как логины и пароли?",
        answers: [
            { text: "Троян-шифровальщик", correct: false },
            { text: "Руткит", correct: false },
            { text: "Кейлоггер", correct: true },
            { text: "Вирус", correct: false }
        ]
    },

    {
        question: "Какой тип вредоносного ПО устанавливает себя на компьютер без вашего разрешения?",
        answers: [
            { text: "Вирус", correct: true },
            { text: "Руткит", correct: false },
            { text: "Троян", correct: false },
            { text: "Рекламное ПО", correct: false }
        ]
    },

    {
        question: "Что такое DDoS-атака?",
        answers: [
            { text: "Перехват данных злоумышленниками", correct: false },
            { text: "Попытка злоумышленников установить вредоносное ПО на ваш компьютер", correct: false },
            { text: "Отправка злоумышленниками огромного количества данных с сервера на какой-либо адрес", correct: true },
            { text: "Удаление злоумышленниками важных файлов с вашего компьютера", correct: false }
        ]
    },

    {
        question: "Что такое руткит?",
        answers: [
            { text: "Вредоносное ПО, получающее полный контроль над компьютером и скрывающее себя", correct: true },
            { text: "Антивирусное ПО, которое защищает компьютер от руткитов", correct: false },
            { text: "Инструмент для создания бэкапов данных", correct: false },
            { text: "Вирус, который использует обход системных механизмов защиты", correct: false }
        ]
    },

    {
        question: "Что такое малварь?",
        answers: [
            { text: "Компьютерный вирус", correct: false },
            { text: "Вредоносное ПО, включающее в себя различные виды вредоносных программ", correct: true },
            { text: "Вредоносное ПО, которое нацелено на финансовые мошенничества", correct: false },
            { text: "Вредоносное ПО, способное привести к повреждению железных компонентов компьютера", correct: false }
        ]
    },

    {
        question: "Каким образом можно защитить свой компьютер от вредоносного ПО?",
        answers: [
            { text: "Устанавливать только лицензионное ПО", correct: false },
            { text: "Регулярно обновлять операционную систему и антивирусное ПО", correct: false },
            { text: "Не открывать подозрительные файлы и ссылки", correct: false },
            { text: "Все вышеперечисленное", correct: true }
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