var clearButton = document.querySelector("#clear")

function clearScores() {
    //clear scores from local storage on a button press
    localStorage.clear()
}

function getScores() {
    //get scores from storage to display with initals
    
}

clearButton.addEventListener("click", clearScores)