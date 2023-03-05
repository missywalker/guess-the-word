//ul where players guessed letters will appear 
const guessedLetters = document.querySelector(".guessed-letters");

// button with the text "Guess!" in it 
const guessButton = document.querySelector(".guess");

//text input where the player will guess a letter 
const letterInput = document.querySelector(".letter");

//empty paragraph where word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");

// p where remaining guesses appear
const remainingGuesses = document.querySelector(".remaining");

// span inside p where remaining guesses appear 
const remainingGuessesSpan = document.querySelector(".remaining span");

//empty p where messages will appear when the player guesses a letter 
const playerMessages = document.querySelector(".message");

//hidden button that will appear promting the player to play again 
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";

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


guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = "";

});
