//ul where players guessed letters will appear 
const guessedLettersElement = document.querySelector(".guessed-letters");

// button with the text "Guess!" in it 
const guessLetterButton = document.querySelector(".guess");

//text input where the player will guess a letter 
const letterInput = document.querySelector(".letter");

//empty paragraph where word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");

// p where remaining guesses appear
const remainingGuessesElement = document.querySelector(".remaining");

// span inside p where remaining guesses appear 
const remainingGuessesSpan = document.querySelector(".remaining span");

//empty p where messages will appear when the player guesses a letter 
const playerMessages = document.querySelector(".message");

//hidden button that will appear promting the player to play again 
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";

const guessedLetters = [];

//Adding Placeholders for each letter

const placeholder = function (word) {
 const placeholderLetters = []; 
 for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
 }
    wordInProgress.innerText = placeholderLetters.join("");
 
};

placeholder(word);


guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault();
    playerMessages.innerText = "";
    const guess = letterInput.value;
    //console.log(guess);
    const goodGuess = validateInput(guess);

    if (goodGuess) {
        makeGuess(guess);
    }

    letterInput.value = "";

});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
         //if input is empty
        playerMessages.innerText = "You need to enter a letter, silly!";
    } else if (input.length > 1) {
        // if input is more than one letter
        playerMessages.innerText = "Only enter one letter at a time.";
    } else if (!input.match(acceptedLetter)){
        // invalid input 
        playerMessages.innerText = "Please enter a letter from A-Z!";
    } else {
        // input is a single letter woohoo!
        return input;
    }

};

const makeGuess = function (guess) { 
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        playerMessages.innerText = "You have already entered this letter, silly!";
    } else {
       guessedLetters.push(guess);
       console.log(guessedLetters);
    }
};
