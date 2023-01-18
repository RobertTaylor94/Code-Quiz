var clearButton = document.querySelector("#clear");
var highscores = document.querySelector("#highscores");

function clearScores() {
    //clear scores from local storage on a button press
    localStorage.clear();
    highscores.textContent = ""
};

function getScores() {
    //get scores from storage to display with initals
    var scores = JSON.parse(localStorage.getItem("scores"));
    if (scores != null) {
        for (i = 0; i < scores.length; i++) {
            renderScores(scores[i]);
        };
    }

};

function renderScores(object) {
    var newLi = document.createElement("li");
    newLi.textContent = `${object.player}: ${object.score}`;
    highscores.append(newLi);
};

getScores();

clearButton.addEventListener("click", clearScores);