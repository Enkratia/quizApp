const startBtn = document.querySelector(".start-btn button");
const infoBox = document.querySelector(".info-box");
const exitBtn = document.querySelector(".buttons .quit");
const continueBtn = document.querySelector(".buttons .restart");

const quizBox = document.querySelector(".quiz-box");
const nextBtn = quizBox.querySelector(".next-btn");
const optionList = quizBox.querySelector(".option-list");
const timeCount = quizBox.querySelector(".timer .time-sec");

const timeLine = quizBox.querySelector(".time-line");
const resultBox = document.querySelector(".result-box");
const restartQuiz = resultBox.querySelector(".buttons .restart");
const quitQuiz = resultBox.querySelector(".buttons .quit");
const timeOff = quizBox.querySelector(".quiz-box .time-text");

startBtn.onclick = () => {
  infoBox.classList.add("activeInfo");
}
exitBtn.onclick = () => {
  infoBox.classList.remove("activeInfo");
}
continueBtn.onclick = () => {
  infoBox.classList.remove("activeInfo");
  quizBox.classList.add("activeQuiz");
  showQuestions(0);
  queCounter(1);
  startTimer(15);
  startTimerLine(0);
  timeOff.textContent = "Time left";
}

let queCount = 0;
let queNumb = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;


nextBtn.onclick = () => {
  if (queCount < questions.length - 1) {
    queCount++;
    queNumb++;
    showQuestions(queCount);
    queCounter(queNumb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    nextBtn.style.display = "none";
    timeOff.textContent = "Time left";
  } else {
    clearInterval(counter);
    clearInterval(counterLine);
    showResultBox();
  }
}

restartQuiz.onclick = () => {
  resultBox.classList.remove("activeResult");
  quizBox.classList.add("activeQuiz");

  showQuestions(0);
  queCounter(1);
  startTimer(15);
  startTimerLine(0);
  timeOff.textContent = "Time left";

  queCount = 0;
  queNumb = 1;
  timeValue = 15;
  widthValue = 0;
  userScore = 0;
}

quitQuiz.onclick = () => {
  window.location.reload();
}

function showQuestions(index) {
  const queText = document.querySelector(".que-text");

  let queTag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
  let optionTag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>'
    + '<div class="option"><span>' + questions[index].options[1] + '</span></div>'
    + '<div class="option"><span>' + questions[index].options[2] + '</span></div>'
    + '<div class="option"><span>' + questions[index].options[3] + '</span></div>';

  queText.innerHTML = queTag;
  optionList.innerHTML = optionTag;

  const option = optionList.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function showResultBox() {
  quizBox.classList.remove("activeQuiz");
  resultBox.classList.add("activeResult");
  const scoreText = resultBox.querySelector(".score-text");

  if (userScore > 3) {
    let scoreTag = '<span>and congrats, You got <p>' + userScore + '</p>out of<p>' + questions.length + '</p></span>';
    scoreText.innerHTML = scoreTag;
  }
  else if (userScore > 1) {
    let scoreTag = '<span>and nice, You got <p>' + userScore + '</p>out of<p>' + questions.length + '</p></span>';
    scoreText.innerHTML = scoreTag;
  }
  else {
    let scoreTag = '<span>and sorry, You got only <p>' + userScore + '</p>out of<p>' + questions.length + '</p></span>';
    scoreText.innerHTML = scoreTag;
  }
}

function optionSelected(answer) {
  clearInterval(counter);
  clearInterval(counterLine);

  let userAns = answer.textContent;
  let correctAns = questions[queCount].answer;
  let allOptions = optionList.children.length;

  if (userAns === correctAns) {
    userScore += 1;
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", tickIcon);

  } else {
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", crossIcon);

    for (let i = 0; i < allOptions; i++) {
      if (optionList.children[i].textContent === correctAns) {
        optionList.children[i].setAttribute("class", "option correct");
        optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
      }
    }
  }

  for (let i = 0; i < allOptions; i++) {
    optionList.children[i].classList.add("disabled");
  }

  nextBtn.style.display = "block";
}


function queCounter(index) {
  const bottomQuesCounter = quizBox.querySelector(".total-que");
  let totalQuesCountTag = '<span><p>' + index + '</p>of<p>' + questions.length + '</p>Questions</span>';
  bottomQuesCounter.innerHTML = totalQuesCountTag;
}

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;

    if (time < 9) {
      let addZero = timeCount.textContent;
      addZero.textContent = "0" + addZero;
    }
    if (time < 0) {
      clearInterval(counter);
      timeCount.textContent = "00";
      timeOff.textContent = "Time Off";

      let correctAns = questions[queCount].answer;
      let allOptions = optionList.children.length;

      for (let i = 0; i < allOptions; i++) {
        if (optionList.children[i].textContent === correctAns) {
          optionList.children[i].setAttribute("class", "option correct");
          optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
        }
      }

      for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add("disabled");
      }

      nextBtn.style.display = "block";
    }
  }
}

function startTimerLine(time) {
  counterLine = setInterval(timer, 29);
  function timer() {
    time += 1;
    timeLine.style.width = time + "px";

    if (time > 549) {
      clearInterval(counterLine);
    }
  }
}