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

let word = "magnolia";

let guessedLetters = [];

let remainingGuesses = 8; //use let because the value WILL CHANGE!

const getWord = async function () {
    const res = await fetch (
        "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
        const words = await res.text();
        const wordArray = words.split("\n");
        const randomIndex = Math.floor(Math.random() * wordArray.length);
        word = wordArray[randomIndex].trim();
        placeholder(word);       
};

getWord();



//Adding Placeholders for each letter

const placeholder = function (word) {
 const placeholderLetters = []; 
 for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
 }
    wordInProgress.innerText = placeholderLetters.join("");
 
};


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
       showGuessedLetters();
       countGuessesRemaining(guess);
       updateWordInProgress(guessedLetters);

    }
};

const showGuessedLetters = function () {
    //cleared list first
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
        revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
  
    wordInProgress.innerText = revealWord.join("");
   
    ifPlayerWon();
   
};



const countGuessesRemaining = function (guess) {
 const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
       playerMessages.innerText = `Sorry! The word does not contain the letter, ${guess}`;
       remainingGuesses -= 1;
    } else {
        playerMessages.innerText = `Great guess! The word does contain the letter, ${guess}.`;
    } 

   if (remainingGuesses === 0) {
       playerMessages.innerHTML = `Game over! The word was <span class ="highlight">${word}</span>.`;
       startOver();
    } else if (remainingGuesses === 1) {
      remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
      remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};



const ifPlayerWon = function () {
    if (word.toUpperCase() === wordInProgress.innerText)  {
        playerMessages.classList.add("win");
        playerMessages.innerHTML = `<p class= "highlight">You guessed correct the word! Congrats!</p>`
       
        startOver();
    }
};

const startOver = function () {
    
    guessLetterButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
    playerMessages.classList.remove("win"); 
    remainingGuesses = 8;
    guessedLetters = [];
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    playerMessages.innerText = "";
    guessedLettersElement.innerHTML = "";

    getWord();


    guessLetterButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    


});
