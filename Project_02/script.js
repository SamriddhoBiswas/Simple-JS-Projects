const questions = [
  {
    question: "What does DOM stand for in JavaScript?",
    answers: [
      { text: "Document Object Model", correct: true },
      { text: "Data Object Model", correct: false },
      { text: "Document Oriented Model", correct: false },
      { text: "Dynamic Object Model", correct: false },
    ],
  },
  {
    question: "What will typeof null return?",
    answers: [
      { text: "null", correct: false },
      { text: "object", correct: true },
      { text: "undefined", correct: false },
      { text: "string", correct: false },
    ],
  },
  {
    question: "How do you declare a function in JavaScript?",
    answers: [
      { text: "function: myFunction()", correct: false },
      { text: "function myFunction()", correct: true },
      { text: "def myFunction()", correct: false },
      { text: "func myFunction()", correct: false },
    ],
  },
  {
    question: "What is the output of 5 + '5' in JavaScript?",
    answers: [
      { text: "10", correct: false },
      { text: "'55'", correct: true },
      { text: "55", correct: false },
      { text: "Error", correct: false },
    ],
  },
  {
    question: "What does the this keyword refer to in JavaScript?",
    answers: [
      { text: "Refers to the current function", correct: false },
      { text: "Refers to the parent function", correct: false },
      { text: "Refers to the global object", correct: false },
      { text: "Refers to the current object", correct: true },
    ],
  },
  {
    question: "What will the following code output: console.log(typeof([]));",
    answers: [
      { text: "'object'", correct: true },
      { text: "'array'", correct: false },
      { text: "'null'", correct: false },
      { text: "'undefined'", correct: false },
    ],
  },

  {
    question: "What does NaN stand for?",
    answers: [
      { text: "Not a Number", correct: true },
      { text: "No Available Numbers", correct: false },
      { text: "Negative Absolute Number", correct: false },
      { text: "Notation for Algebraic Numbers", correct: false },
    ],
  },
];

let test = (ele) => {
  ele.style.backgroundColor = "red";
};

const questionElement = document.getElementById("question");
const progressElement = document.getElementById("myBar");
const scoreElement = document.getElementById("score");
const ansElement = document.getElementById("ans-container");
const nextButton = document.querySelector(".next-btn");
const questionNumElement = document.getElementById("question-num");
const restartBtn = document.getElementById("restart-btn");
const mainContainer = document.querySelector(".main-container");
const scoreContainer = document.querySelector(".score-container");
let score = 0;
let progressIncrease = 100 / questions.length;
let progress = progressIncrease;
let currentQuestionNum = 0;

function startQuiz() {
  mainContainer.style.display = "block";
  scoreContainer.style.display = "none";
  progress = progressIncrease;
  score = 0;
  currentQuestionNum = 0;
  nextButton.innerHTML = 'Next<i class="fa-solid fa-angle-right">';
  scoreElement.innerText = `${score}`;
  questionNumElement.innerText = `${currentQuestionNum + 1}/${
    questions.length
  }`;
  progressElement.style.width = `${progress}%`;
  showQuestion();
}

function showQuestion() {
  resetAll();
  questionElement.innerText = `${currentQuestionNum + 1}. ${
    questions[currentQuestionNum].question
  }`;
  questions[currentQuestionNum].answers.forEach((ans) => {
    let button = document.createElement("button");
    button.innerHTML = ans.text;
    button.classList.add("btn");
    if (ans.correct) {
      button.dataset.correct = ans.correct;
    }
    button.addEventListener("click", selectAns);
    ansElement.appendChild(button);
  });
  currentQuestionNum++;
}

function selectAns(e) {
  const selectedAns = e.target;
  const isCorrect = selectedAns.dataset.correct == "true";
  if (isCorrect) {
    selectedAns.classList.add("correct");
    score++;
    scoreElement.innerText = score;
  } else if (!isCorrect) {
    selectedAns.classList.add("incorrect");
  }
  Array.from(ansElement.children).forEach((btn) => {
    if (btn.dataset.correct == "true") {
      btn.classList.add("correct");
    }
    btn.classList.remove(".btn");
    btn.disabled = "true";
    btn.style.cursor = "not-allowed";
  });
  nextButton.style.display = "block";
}

function resetAll() {
  nextButton.style.display = "none";
  while (ansElement.firstChild) {
    ansElement.removeChild(ansElement.firstChild);
  }
}

function showResult() {
  mainContainer.style.display = "none";
  scoreContainer.style.display = "flex";
  document.getElementById("score-per").innerText = `${Math.round(
    (score / questions.length) * 100
  )}% `;
  document.getElementById(
    "score-total-question"
  ).innerHTML = `${questions.length}`;
  document.getElementById("score-total-ans").innerHTML = `${score}`;
  restartBtn.addEventListener("click", startQuiz);
}

function nextQuestion() {
  if (currentQuestionNum + 1 > questions.length) {
    nextButton.innerText = "Show Result";
    showResult();
  } else {
    if (currentQuestionNum == questions.length - 1) {
      nextButton.innerHTML = "Show Result";
    }
    progress += progressIncrease;
    questionNumElement.innerText = `${currentQuestionNum + 1}/${
      questions.length
    }`;
    progressElement.style.width = `${progress}%`;
    showQuestion();
  }
}

nextButton.addEventListener("click", nextQuestion);
startQuiz();
