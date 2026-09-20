const questions = [
    {
        question: "Which language is used to style web pages?",
        answers: [
            { text: "Python", correct: false },
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "SQL", correct: false }
        ]
    },

    {
        question: "Which language is used to create the structure of a webpage?",
        answers: [
            { text: "HTML", correct: true },
            { text: "Python", correct: false },
            { text: "SQL", correct: false },
            { text: "Java", correct: false }
        ]
    },

    {
        question: "Which language adds interactivity to websites?",
        answers: [
            { text: "CSS", correct: false },
            { text: "JavaScript", correct: true },
            { text: "SQL", correct: false },
            { text: "HTML", correct: false }
        ]
    },

    {
        question: "Which one is a programming language?",
        answers: [
            { text: "Python", correct: true },
            { text: "HTML", correct: false },
            { text: "CSS", correct: false },
            { text: "XML", correct: false }
        ]
    },

    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Text Machine Language", correct: false },
            { text: "Hyperlink Text Management Language", correct: false },
            { text: "Home Tool Markup Language", correct: false }
        ]
    },

    {
        question: "Which company developed the JavaScript language?",
        answers: [
            { text: "Microsoft", correct: false },
            { text: "Netscape", correct: true },
            { text: "Google", correct: false },
            { text: "Apple", correct: false }
        ]
    },

    {
        question: "Which symbol is used for comments in JavaScript?",
        answers: [
            { text: "//", correct: true },
            { text: "#", correct: false },
            { text: "<!-- -->", correct: false },
            { text: "/* only */", correct: false }
        ]
    },

    {
        question: "Which property is used to change text color in CSS?",
        answers: [
            { text: "background", correct: false },
            { text: "font-size", correct: false },
            { text: "color", correct: true },
            { text: "text-style", correct: false }
        ]
    },

    {
        question: "Which language is commonly used to work with databases?",
        answers: [
            { text: "SQL", correct: true },
            { text: "HTML", correct: false },
            { text: "CSS", correct: false },
            { text: "Photoshop", correct: false }
        ]
    },

    {
        question: "Which HTML tag is used to create a hyperlink?",
        answers: [
            { text: "<p>", correct: false },
            { text: "<img>", correct: false },
            { text: "<a>", correct: true },
            { text: "<h1>", correct: false }
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

    nextButton.innerHTML = "Next";

    showQuestion();
}


function showQuestion() {

    resetState();

    const currentQuestion = questions[currentQuestionIndex];

    questionElement.innerHTML =
        (currentQuestionIndex + 1) +
        ". " +
        currentQuestion.question;


    currentQuestion.answers.forEach(answer => {

        const button = document.createElement("button");

        button.innerHTML = answer.text;

        button.classList.add("answer");

        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);

        answerButtons.appendChild(button);

    });
}


function resetState() {

    nextButton.style.display = "none";

    while (answerButtons.firstChild) {

        answerButtons.removeChild(answerButtons.firstChild);

    }
}


function selectAnswer(event) {

    const selectedButton = event.target;

    const isCorrect =
        selectedButton.dataset.correct === "true";


    if (isCorrect) {

        selectedButton.style.backgroundColor = "lightgreen";

        selectedButton.innerHTML =
            "✓ " + selectedButton.innerHTML;

        score++;

    } else {

        selectedButton.style.backgroundColor = "salmon";

        selectedButton.innerHTML =
            "✗ " + selectedButton.innerHTML;


        // Show the correct answer
        Array.from(answerButtons.children).forEach(button => {

            if (button.dataset.correct === "true") {

                button.style.backgroundColor = "lightgreen";

                button.innerHTML =
                    "✓ " + button.innerHTML;

            }

        });

    }


    // Disable all buttons
    Array.from(answerButtons.children).forEach(button => {

        button.disabled = true;

    });


    nextButton.style.display = "block";
}


function showScore() {

    resetState();

    let message = "";

    if (score === questions.length) {

        message = "Excellent! 🏆";

    } else if (score >= 7) {

        message = "Great job! 🎉";

    } else if (score >= 5) {

        message = "Good effort! 👍";

    } else {

        message = "Keep practicing! 💪";

    }


    questionElement.innerHTML =
        `Quiz Completed! 🎉
        <br><br>
        Your Score: ${score} / ${questions.length}
        <br><br>
        ${message}`;


    nextButton.innerHTML = "Restart";

    nextButton.style.display = "block";
}


function handleNextButton() {

    currentQuestionIndex++;


    if (currentQuestionIndex < questions.length) {

        showQuestion();

    } else {

        showScore();

    }
}


nextButton.addEventListener("click", function () {

    if (currentQuestionIndex < questions.length) {

        handleNextButton();

    } else {

        startQuiz();

    }

});


startQuiz(); 