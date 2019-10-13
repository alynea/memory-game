/* Create a list that holds all of your cards*/
let currentSelection = [];
let matchingSelection = [];
let moves = 0;
let timerStarted = false;
let timer = 0;
let startTime;
let displayTime = ""

let deck = [];
deck.push("fa fa-diamond");
deck.push("fa fa-diamond");
deck.push("fa fa-paper-plane-o");
deck.push("fa fa-paper-plane-o");
deck.push("fa fa-anchor");
deck.push("fa fa-anchor");
deck.push("fa fa-bolt");
deck.push("fa fa-bolt");
deck.push("fa fa-cube");
deck.push("fa fa-cube");
deck.push("fa fa-leaf");
deck.push("fa fa-leaf");
deck.push("fa fa-bicycle");
deck.push("fa fa-bicycle");
deck.push("fa fa-bomb");
deck.push("fa fa-bomb");

// Shuffle function from http://stackoverflow.com/a/2450976//
function shuffle(deck) {
    var currentIndex = deck.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = deck[currentIndex];
        deck[currentIndex] = deck[randomIndex];
        deck[randomIndex] = temporaryValue;
    }
    return deck;
}
/*create a new deck*/
function createNewDeck() {
    deck.forEach((iconClassName, index) => {
        let card = document.getElementById(index.toString());
        card.className = "card";
        card.children[0].className = iconClassName;
    });


}
// Game features//

function checkIfCardSelected(sourceElement) {

    let cardExists = false;
    matchingSelection.forEach(card => {
        if (card.id == sourceElement.id) {
            cardExists = true;
        }
    });

    currentSelection.forEach(card => {
        if (card.id == sourceElement.id) {
            cardExists = true;
        }
    });
    return cardExists;
}


function checkTwoCardLimit() {
    if (currentSelection.length < 2) {
        return false;
    } else {
        return true;
    }
}

//Compare Cards//

function compareCards() {
    let card1 = currentSelection[0];
    let card2 = currentSelection[1];
    if (card1.children[0].className == card2.children[0].className) {
        return true;
    } else {
        return false;
    }
}

//Increment Move//

function incrementMove() {
    moves++;
    document.getElementById("currentMove").innerText = moves;
}

//Star Rating//

function setStarRating() {
    if (moves > 16) {
        let thirdStar = document.getElementById("star3")
        thirdStar.children[0].classList.add("star-white");
    }
    if (moves > 25) {
        let secondStar = document.getElementById("star2")
        secondStar.children[0].classList.add("star-white");

    }
}

const delay = ms => new Promise(res => setTimeout(res, ms));

//Reset Stars//
function resetStars() {

    let thirdStar = document.getElementById("star3");
    let secondStar = document.getElementById("star2");
    let firstStar = document.getElementById("star1");
    thirdStar.children[0].classList.remove("star-white");
    secondStar.children[0].classList.remove("star-white");
    firstStar.children[0].classList.remove("star-white");

}


// Handle selected cards//
//Matching cards//
async function handleMatchedCards() {

    await delay(500);
    matchingSelection.push(...currentSelection);

    currentSelection = [];
    matchingSelection.forEach(card => {
        card.classList.add("match");
        card.classList.remove("open", "show");
        goodShake(card);
    });

}

//Non-matching cards//
async function handleUnmatchedCards() {
    await delay(500);
    currentSelection.forEach(card => {
        badShake(card);
    });
    await delay(500);
    currentSelection.forEach(card => {

        card.classList.remove("open", "show");

    });
    currentSelection = [];
}


// Animation of Compared cards//

function badShake(card) {
    // perform a horizontal shake when the cards match for 1sec//
    card.classList.add("animated", "wobble");
}

function goodShake(card) {
    // perform a vertical shake when the cards match for 1sec//
    card.classList.add("animated", "hop");
}

//Finish Game//
function gameDone() {

    if (matchingSelection.length == 16) {

        stopTimer();
        popMessage();
        matchingSelection = [];
    }
}


// Create a pop-message//

let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];
let btn = document.getElementById("button");

btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

/* When the user clicks anywhere outside of the modal, close it*/
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }

}
function clickButton() {
    document.getElementById("button").click();
}

function popMessage() {

    document.getElementById("moves").innerText = moves;
    document.getElementById("time").innerText = displayTime;
    clickButton();
}

// Create a timer//
function pad(n) {
    return ('00' + n).slice(-2);
}

function stopTimer() {
    clearInterval(timer);
    timerStarted = false;
}


function startTimer() {
    timerStarted = true;
    let timerElement = document.getElementById("timer")
    startTime = Date.now();
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;

    timer = setInterval(function () {
        let currentTime = Date.now();
        let difference = currentTime - startTime;

        let hours = pad((difference / hour) | 0);
        let minutes = pad(((difference % hour) / minute) | 0);
        let seconds = pad(((difference % minute) / second) | 0);
        displayTime = hours + ':' + minutes + ':' + seconds;
        timerElement.innerHTML = displayTime;
    }, 250);
}

function restartTimer() {
    stopTimer();
    let timerElement = document.getElementById("timer");
    timerElement.innerText = "";
    

}


/* set up the event listener for a card. If a card is clicked:*/
function playGame() {
    let allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {
        card.addEventListener('click', async function (e) {

            if (timerStarted == false) {
                startTimer();
            }

            if (checkIfCardSelected(e.srcElement) == false && checkTwoCardLimit() == false) {
                e.srcElement.className = 'card open show';
                currentSelection.push(e.srcElement);
            }

            if (currentSelection.length == 2) {
                incrementMove();
                if (compareCards() == true) {
                    await handleMatchedCards();

                } else {
                    await handleUnmatchedCards();
                }
            }
            setStarRating()
            gameDone();
        });
    });



}

let restartElement = document.getElementById('restart');
restartElement.addEventListener('click', function (evt) {
    refresh();
    playGame();
});

// refresh Game//
function refresh() {

    moves = -1;
    incrementMove();
    shuffle(deck);
    createNewDeck();
    stopTimer()

    restartTimer();
    resetStars();
}

playGame();