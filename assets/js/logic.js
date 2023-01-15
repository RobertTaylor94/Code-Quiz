var playerScore = 0;
var currentQuestion = 0;
var timeLeft = 60;

var finalScore = document.querySelector("#final-score");
var questions = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var choices = document.querySelector("#choices");
var endScreen = document.querySelector("#end-screen");
var startScreen = document.querySelector("#start-screen");
var feedback = document.querySelector("#feedback");
var startButton = document.querySelector("#start");
var sumbitButton = document.querySelector("#submit");
var time = document.querySelector("#time")
var initials = document.querySelector("#initials")

//MARK: - Functions
function startQuiz() {
    /* on button press begins the quiz
        starts timer
        display question id='questions'
        hides id='start-screen'
    */
    startScreen.className = "hide";
    questions.className = "";
    timer();
    renderQuestion(currentQuestion)
};

function timer() {
    var timeInterval = setInterval(function() {
      if (timeLeft > 0) {
        time.textContent = timeLeft;
        timeLeft--;
      } else {
        clearInterval(timeInterval);
        stopQuiz()
      };
    }, 1000);
}

function stopQuiz() {
    /* on timer end or after last question
        ends timer
        asks user for initials
        displays score
        saves score to local storage
        hides questions id='questions'
        shows id='end-screen'
    */
        questions.className = "hide";
        endScreen.className = "";
        finalScore.textContent = playerScore
};

function saveScores() {
    //saves player score and initials to local storage
    localStorage.setItem(`${initials}`, playerScore);
};

function checkAnswer(target) {
    /* on answer given checks if correct
        if right, adds point to the total score and displays next question
        if wrong, subtracts time from the time remaining
    */
   if (currentQuestion < questionsArray.length-1) {
    if (target.textContent == questionsArray[currentQuestion].correct) {
        console.log("CORRECT")
        playerScore++;
        currentQuestion++;
        renderQuestion(currentQuestion);
    } else {
        console.log("WRONG")
        timeLeft -= 10;
    }
   } else {
    playerScore++;
    stopQuiz();
   }

};

function renderQuestion(index) {
    /*
        h2 question
        div id='choices'
        ol with a button for each answer option
    */
    questionTitle.textContent = "";
    choices.textContent = "";
    questionTitle.textContent = questionsArray[index].question
    var ol = document.createElement("ol");
    choices.appendChild(ol);
    for (i=0; i<3; i++) {
        var option = document.createElement("li");
        var choice = document.createElement("button");
        choice.textContent = questionsArray[index].options[i];
        option.appendChild(choice);
        ol.appendChild(option);
   }
};

function resetQuiz() {
    /* 
        Reset the page to show the start screen
    */
   endScreen.className = "hide";
   startScreen.className = "start";
   time.textContent = "60";
   questionTitle.textContent = "";
   choices.textContent = "";
};

//MARK:- Event Listeners
startButton.addEventListener("click", function(event) {
    startQuiz();
});

sumbitButton.addEventListener("click", function(event) {
    saveScores();
    resetQuiz();
});

choices.addEventListener("click", function(event) {
    target = event.target;
   if (target.tagName == "BUTTON") {
    checkAnswer(target);
   }
});