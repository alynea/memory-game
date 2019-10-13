/*
 * Create a list that holds all of your cards*/
let currentSelection = [];
let matchingSelection = [];
let moves = 0;

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
function compareCards() {
    let card1 = currentSelection[0];
    let card2 = currentSelection[1];
    if (card1.children[0].className == card2.children[0].className) {
        return true;
    } else {
        return false;
    }
}

function incrementMove() {
    moves++;
    document.getElementById("currentMove").innerText = moves;
}


function setStarRating() {
    console.log(moves)
    if (moves > 10) {
        let thirdStar = document.getElementById("star3")
        thirdStar.children[0].classList.add("star-white");
    } 
    if (moves > 20) {
        let secondStar = document.getElementById("star2")
        secondStar.children[0].classList.add("star-white");

    }
}

const delay = ms => new Promise(res => setTimeout(res, ms));


async function handleMatchedCards() {
    await delay(500);
    matchingSelection.push(...currentSelection);
    console.log(matchingSelection);
    currentSelection = [];
    matchingSelection.forEach(card => {
        card.classList.add("match");
        card.classList.remove("open", "show");
        goodShake(card);
    });

}

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

function badShake(card) {
    // perform a horizontal shake when the cards match for 1sec//
    card.classList.add("animated", "wobble");


}

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

function goodShake(card) {
    // perform a vertical shake when the cards match for 1sec//
    card.classList.add("animated", "hop");
}

function gameDone() {
    console.log("Game Done")
    console.log("length of matched card array" + matchingSelection.length)
    if (matchingSelection.length == 16) {
        console.log("waiting for pop up")
        popMessage();
    }
    matchingSelection = [];
}
function clickButton() {
    document.getElementById("button").click();
}

function popMessage() {
    console.log("popup works")
    document.getElementById("moves").innerText = moves;
    document.getElementById("time").innerText = "TBD";
    clickButton();
}


/*
 * set up the event listener for a card. If a card is clicked:*/
function playGame() {
    let allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {
        card.addEventListener('click', async function (e) {

            console.log(e.srcElement.children[0].className);

            if (checkIfCardSelected(e.srcElement) == false && checkTwoCardLimit() == false) {
                e.srcElement.className = 'card open show';
                currentSelection.push(e.srcElement);
            }
            if (currentSelection.length == 2) {
                incrementMove();
                if (compareCards() == true) {
                    await handleMatchedCards();
                    console.log(matchingSelection.srcElement);
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

function refresh() {
    console.log('The restart button was clicked');
    moves = -1;
    incrementMove();
    shuffle(deck);
    createNewDeck();
}

let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];
let btn = document.getElementById("button");

btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

playGame();