const questions = [
    {
        question: "Что такое двухфакторная аутентификация?",
        answers: [
            { text: "Использование двух разных паролей для доступа к учетной записи.", correct: false },
            { text: "Метод проверки личности, требующий два разных типа идентификационных данных.", correct: true },
            { text: "Процесс шифрования данных для предотвращения их подделки.", correct: false }
        ]
    },

    {
        question: "Что такое шифрование данных?",
        answers: [
            { text: "Процесс преобразования данных в непонятный для посторонних вид.", correct: true },
            { text: "Запись данных на физический носитель для долгосрочного хранения.", correct: false },
            { text: "Удаление данных с компьютера с целью обезопасить их.", correct: false }
        ]
    },
    
    {
        question: "Что такое резервное копирование данных?",
        answers: [
            { text: "Сохранение данных на внешнем носителе для их долгосрочного хранения.", correct: false },
            { text: "Создание копии данных с целью восстановления в случае потери или повреждения.", correct: true },
            { text: "Процесс удаления ненужных данных с компьютера.", correct: false }
        ]
    },

    {
        question: "Что такое многофакторная аутентификация?",
        answers: [
            { text: "Использование трех и более разных паролей для доступа к учетной записи.", correct: false },
            { text: "Метод проверки личности, c использованием различных типов идентификационных данных.", correct: true },
            { text: "Процесс удаления несанкционированных пользователей из системы.", correct: false },
        ]
    },

    {
        question: "Что такое цифровая подпись?",
        answers: [
            { text: "Уникальный код, присваиваемый каждому файлу для проверки его целостности и подлинности.", correct: true },
            { text: "Процесс удаления цифровых данных с компьютера.", correct: false },
            { text: "Использование цифрового шифрования для защиты данных.", correct: false }
        ]
    },

    {
        question: "Что такое антивирусное программное обеспечение?",
        answers: [
            { text: "Программа, для защиты от фальсификации данных и несанкционированного доступа.", correct: true },
            { text: "Специальное устройство, обнаруживающее фальсификацию данных в сети.", correct: false },
            { text: "Процесс резервного копирования данных для предотвращения потери информации.", correct: false }
        ]
    },

    {
        question: "Что такое обновление программного обеспечения?",
        answers: [
            { text: "Процесс удаления программного обеспечения с компьютера.", correct: false },
            { text: "Установка новых версий программ для исправления уязвимостей с целью безопасности данных.", correct: true },
            { text: "Процесс шифрования данных для защиты от фальсификации.", correct: false }
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