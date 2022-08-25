const usedLettersEl = document.querySelector("#usedLetters");
const wordContainerEl = document.querySelector("#wordContainer");
const startButtonEl = document.querySelector("#startButton");

let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
ctx.canvas.width = 0;
ctx.canvas.height = 0;

const bodyParts = [
    [4, 2, 1, 1],
    [4, 3, 1, 2],
    [3, 5, 1, 1],
    [5, 5, 1, 1],
    [3, 3, 1, 1],
    [5, 3, 1, 1],
];

let selectedWord;
let usedLetters;
let mistakes;
let hits;

const addLetter = (letter) => {
    const letterEl = document.createElement("span");
    letterEl.innerHTML = letter.toUpperCase();
    usedLettersEl.appendChild(letterEl);
};

const addBodyPart = (bodyPart) => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(...bodyPart);
};

const wrongLetter = () => {
    addBodyPart(bodyParts[mistakes]);
    mistakes++;
    if (mistakes === bodyParts.length) {
        Swal.fire({
            icon: "error",
            title: "Perdiste...",
            text: "Inténtalo de nuevo!",
            background: "#333",
            color: "#fff",
        });
        endGame();
    }
};

const endGame = () => {
    document.removeEventListener("keydown", letterEvent);
    startButtonEl.style.display = "block";
};

const correctLetter = (letter) => {
    const { children } = wordContainerEl;
    for (let i = 0; i < children.length; i++) {
        if (children[i].innerHTML === letter) {
            children[i].classList.toggle("hidden");
            hits++;
        }
    }
    if (hits === selectedWord.length) {
        Swal.fire({
            icon: "success",
            title: "Ganaste!",
            text: "Felicidades! sigue jugando...",
            background: "#333",
            color: "#fff",
        });
        endGame();
    }
};

const letterInput = (letter) => {
    if (selectedWord.includes(letter)) {
        correctLetter(letter);
    } else {
        wrongLetter(letter);
    }
    addLetter(letter);
    usedLetters.push(letter);
};

const letterEvent = (event) => {
    let newLetter = event.key.toUpperCase();
    if (newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) {
        letterInput(newLetter);
    }
};

const drawWord = () => {
    selectedWord.forEach((letter) => {
        const letterEl = document.createElement("span");
        letterEl.innerHTML = letter.toUpperCase();
        letterEl.classList.add("letter");
        letterEl.classList.add("hidden");
        wordContainerEl.appendChild(letterEl);
    });
};

const selectRandowWord = () => {
    let word = words[Math.floor(Math.random() * words.length)].toUpperCase();
    selectedWord = word.split("");
};

const dragHandMan = () => {
    ctx.canvas.width = 120;
    ctx.canvas.height = 160;
    ctx.scale(20, 20);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#d95d39";
    ctx.fillRect(0, 7, 4, 1);
    ctx.fillRect(1, 0, 1, 7);
    ctx.fillRect(2, 0, 3, 1);
    ctx.fillRect(4, 1, 1, 1);
};

const startGame = () => {
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    wordContainerEl.innerHTML = "";
    usedLettersEl.innerHTML = "";
    startButtonEl.style.display = "none";
    dragHandMan();
    selectRandowWord();
    drawWord();
    document.addEventListener("keydown", letterEvent);
};

startButtonEl.addEventListener("click", startGame);
