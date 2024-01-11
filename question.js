let rightNumber = 0;
let falseNumber = 0;
let questionCount = 0;
let currentQuestion; // Added a variable to store the current question.

const startBtn = document.getElementById("start_btn");
startBtn.addEventListener("click", () => {
  if ((document.getElementById("navbar").style.display == "none")) {
    startBtn.style.display = "none";

    // document.querySelector('info-box').style.display = "flex";
    infoBox.classList.add("activeInfo"); //shows info box
  } else {
    window.location.href = "access.html";
  }
});
startBtn.addEventListener("click", function () {
  addQuestion();
  eventListeners();
});

eventListeners = () => {
  document.querySelector("#check").addEventListener("click", validateAnswer);
  
};

addQuestion = () => {
  if (questionCount < 10) {
    const url = "https://opentdb.com/api.php?amount=1&category=18&type=multiple";
    fetch(url)
      .then((data) => data.json())
      .then((result) => {
        currentQuestion = result.results[0]; // Store the current question.
        showQuestion(currentQuestion);
      });
  } else {
    showResults();
  }
};

showQuestion = (question) => {
  questionCount++;
  startBtn.style.display = "none";
  let rightAns = question.correct_answer;
  let possibleAnswers = question.incorrect_answers;
  possibleAnswers.splice(Math.floor(Math.random() * 3), 0, rightAns);

  const questionHTML = document.createElement("div");
  questionHTML.classList.add("col-12");
  questionHTML.innerHTML = `<div class="row justify-content-between heading">
    <p class="category">Category: ${question.category}</p>
    <div class="scores">
    <span class="badge badge-primary">${rightNumber}</span>
    <span class="badge badge-warning">${falseNumber}</span>
    </div>
    <div>
    <h2 class="text-center">${question.question}`;
  document.getElementById("check").style.display = "block";
  const answerDiv = document.createElement("div");
  answerDiv.classList.add("questions", "row", "justify-content-around", "mt-5");
  possibleAnswers.forEach((answer) => {
    const answerHTML = document.createElement("li");
    answerHTML.classList.add("col-12", "col-md-5");
    answerHTML.textContent = answer;
    answerHTML.onclick = selectAnswer;
    answerDiv.appendChild(answerHTML);
  });

  questionHTML.appendChild(answerDiv);
  document.querySelector("#app").innerHTML = "";
  document.querySelector("#app").appendChild(questionHTML);
};

selectAnswer = (e) => {
  if (document.querySelector(".active")) {
    const activeAnswer = document.querySelector(".active");
    activeAnswer.classList.remove("active");
  }

  e.target.classList.add("active");
};

validateAnswer = () => {
  if (document.querySelector(".questions .active")) {
    verifyAnswer();
  } else {
    const errorDiv = document.createElement("div");
    errorDiv.classList.add("alert", "alert-danger", "col-md-6");
    errorDiv.textContent = "Please select an answer";
    const questionsDiv = document.querySelector(".questions");
    questionsDiv.appendChild(errorDiv);

    setTimeout(() => {
      document.querySelector(".alert-danger").remove();
    }, 2000);
  }
};

verifyAnswer = () => {
  const userAnswer = document.querySelector(".questions .active");
  if (userAnswer) {
    const userSelectedAnswer = userAnswer.textContent;
    const correctAnswer = currentQuestion.correct_answer; // Use the current question's correct answer.
    if (userSelectedAnswer === correctAnswer) {
      rightNumber++;
    } else {
      falseNumber++;
    }
    addQuestion();
  }
};

showResults = () => {
  const app = document.querySelector("#app");
  app.innerHTML = `<div class="col-12 text-center">
    <h2>Quiz Completed!</h2>
    <p>You got ${rightNumber} out of 10 questions correct.</p>
    </div>`;
    document.getElementById("check").style.display = "none";
};
