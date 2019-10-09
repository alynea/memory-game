/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
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



const delay = ms => new Promise(res => setTimeout(res, ms));


async function handleMatchedCards() {
    await delay(500);
    matchingSelection.push(...currentSelection);
    console.log(matchingSelection);
    currentSelection = [];
    matchingSelection.forEach(card => {
        card.classList.add("match");
        card.classList.remove("open","show");
    });
}

async function handleUnmatchedCards() {
    await delay(2000);
    currentSelection.forEach(card => {
        console.log("removing card open show");
        card.classList.remove("open", "show");
    });
    currentSelection = [];
}

function checkIfCardSelected(sourceElement){
   
    let cardExists = false;
    matchingSelection.forEach(card => {
        if(card.id == sourceElement.id){
            cardExists = true;
        }
    });

    currentSelection.forEach(card => {
       if(card.id == sourceElement.id){
           cardExists = true;
       }
    });
    return cardExists;
    

}

/*
 * set up the event listener for a card. If a card is clicked:*/
let allCards = document.querySelectorAll('.card');
allCards.forEach(card => {
    card.addEventListener('click', function (e) {
        
        console.log(e.srcElement.children[0].className);

        if (checkIfCardSelected(e.srcElement) == false){
            e.srcElement.className = 'card open show';
            currentSelection.push(e.srcElement);
        }
        if (currentSelection.length == 2) {
            if (compareCards() == true) {
                handleMatchedCards();
                console.log(matchingSelection.srcElement);
            } else {
                handleUnmatchedCards();
            }
        }
    });

});
let currentSelection = [];
let matchingSelection = [];







/*  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + 
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
