

function startQuiz() {
    /* on button press begins the quiz
        starts timer
        display question id='questions'
        hides id='start-screen'
    */
};

function stopQuiz() {
    /* on timer end or after last question
        ends timer
        asks user for initials
        displays score
        saves score to local storage
        hides questions id='questions'
        shows id='start-screen'
    */
}

function saveScores() {
    //saves player score and initials to local storage
}

function checkAnswer() {
    /* on answer given checks if correct
        if right, adds point to the total score and displays next question
        if wrong, subtracts time from the time remaining
    */
}

function renderQuestion() {
    /*
        h2 question
        div id='choices'
        ol with a button for each answer option
    */
}