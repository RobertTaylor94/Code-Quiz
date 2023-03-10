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
var time = document.querySelector("#time");
var initials = document.querySelector("#initials");
var timeInterval;

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
    renderQuestion(currentQuestion);
};

function timer() {
    timeInterval = setInterval(function() {
      if (timeLeft > 0) {
        time.textContent = timeLeft;
        timeLeft--;
      } else {
        stopQuiz();
      };
    }, 1000);
};

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
        finalScore.textContent = playerScore;
        clearInterval(timeInterval);
};

function saveScores() {
    //create new object to append to scores array
    var newScore = [{
        player: initials.value,
        score: playerScore
    }];
        //get current array of scores from local storage
    var savedScores = JSON.parse(localStorage.getItem("scores"));
    //add latest score to the previously saved array of scores
    if (savedScores != null) {
        //checks to see if the localstorage is empty before trying to access it
        var joined = newScore.concat(savedScores);
        localStorage.setItem("scores", JSON.stringify(joined));
    } else {
        localStorage.setItem("scores", JSON.stringify(newScore));
    }

};

function checkAnswer(target) {
    /* on answer given checks if correct
        if right, adds point to the total score and displays next question
        if wrong, subtracts time from the time remaining
    */
   if (currentQuestion < questionsArray.length-1) {
    if (target.textContent == questionsArray[currentQuestion].correct) {
        playerScore++;
        currentQuestion++;
        renderQuestion(currentQuestion);
    } else {
        timeLeft -= 10;
    }
   } else if (currentQuestion = questionsArray.length-1) {
    if (target.textContent == questionsArray[currentQuestion].correct) {
        playerScore++;
        currentQuestion++;
        stopQuiz()
    } else {
        timeLeft -= 10;
    }
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
   playerScore = 0
   currentQuestion = 0
   timeLeft = 60
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