const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            {text: "Berlin", correct:false},
            {text: "Accra", correct:false},
            {text: "Paris", correct:true},
            {text: "London", correct:false}
        ]
    },
    {
        question: "What is the capital of Finland?",
        answers: [
            {text: "Lome", correct:false},
            {text: "Oslo", correct:false},
            {text: "Helsinki", correct:true},
            {text: "Stockholm", correct:false}
        ]
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            {text: "Earth", correct:false},
            {text: "Jupiter", correct:true},
            {text: "Mars", correct:false},
            {text: "Earth", correct:false}
        ]
    },
    {
        question: "Who wrote the book Great Expectations?",
        answers: [
            {text: "Leo Tolstoy", correct:false},
            {text: "Charles Dickens", correct:true},
            {text: "Chinua Achebe", correct:false},
            {text: "Virginia Woolf", correct:false}
        ]
    }
];

var correctAns = ["Paris", "Helsinki","Jupiter","Charles Dickens"]

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === 'true';
    if (isCorrect) {
        score++;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (questions.length > currentQuestionIndex + 1) {
        nextButton.style.display = 'block';
    } else {
        nextButton.innerHTML = 'Restart';
        nextButton.style.display = 'block';
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

nextButton.addEventListener('click', () => {
    if (questions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        startQuiz();
    }
});

startQuiz();