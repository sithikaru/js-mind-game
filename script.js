const imageArray = [
    {
        name: "1",
        url: "imgs/img1.png"
    },
    {
        name: "2",
        url: "imgs/img2.png"
    },{
        name: "3",
        url: "imgs/img3.png"
    },{
        name: "4",
        url: "imgs/img4.png"
    },{
        name: "5",
        url: "imgs/img5.png"
    },{
        name: "6",
        url: "imgs/img6.png"
    },
    {
        name: "1",
        url: "imgs/img1.png"
    },
    {
        name: "2",
        url: "imgs/img2.png"
    },{
        name: "3",
        url: "imgs/img3.png"
    },{
        name: "4",
        url: "imgs/img4.png"
    },{
        name: "5",
        url: "imgs/img5.png"
    },{
        name: "6",
        url: "imgs/img6.png"
    }
];

let timer;
let startTime;
let elapsedTime = 0;
let marks = 1000; // Set initial marks to 1000

function startTimer() {
    startTime = Date.now();
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    elapsedTime = Date.now() - startTime;
    displayTimer(elapsedTime);
}

function displayTimer(elapsedTime) {
    const timerElement = document.getElementById("timer");
    const seconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timerElement.textContent = `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}

function createBoard() {
    startTimer();
    imageArray.sort(() => 0.5 - Math.random());
    const gridDisp = document.querySelector("#grid");
    imageArray.forEach((img, index) => {
        const card = document.createElement("img");
        card.setAttribute("src", "https://static.vecteezy.com/system/resources/previews/007/126/739/non_2x/question-mark-icon-free-vector.jpg");
        card.setAttribute("data-id", index);
        gridDisp.appendChild(card);
        card.addEventListener("click", flipCard);
    });
}

let cardsChoosed = [];

function flipCard() {
    const cardId = this.getAttribute("data-id");
    if (this.classList.contains("matched")) return; // Disable clicking on matched cards
    this.setAttribute("src", imageArray[cardId].url);
    if (cardsChoosed.length === 1 && cardsChoosed[0].id === cardId) return; 
    cardsChoosed.push({ ...imageArray[cardId], id: cardId });
    marks -= 50;
    dispMarks();
    if (cardsChoosed.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    const allCards = document.querySelectorAll("img");
    const op1 = cardsChoosed[0];
    const op2 = cardsChoosed[1];
    if (op1.name === op2.name) {
        allCards[op1.id].src = "https://icons.veryicon.com/png/o/miscellaneous/logo-design-of-lingzhuyun/icon-correct-24.png";
        allCards[op2.id].src = "https://icons.veryicon.com/png/o/miscellaneous/logo-design-of-lingzhuyun/icon-correct-24.png";
        marks += 100; 
        allCards[op1.id].classList.add("matched");
        allCards[op2.id].classList.add("matched");
        
    } else {
        allCards[op1.id].src = "https://static.vecteezy.com/system/resources/previews/007/126/739/non_2x/question-mark-icon-free-vector.jpg";
        allCards[op2.id].src = "https://static.vecteezy.com/system/resources/previews/007/126/739/non_2x/question-mark-icon-free-vector.jpg";
        allCards[op1.id].classList.add("not-matched");
        allCards[op2.id].classList.add("not-matched");
        setTimeout(() => {
            allCards[op1.id].classList.remove("not-matched");
            allCards[op2.id].classList.remove("not-matched");
        }, 1000);
    }

    cardsChoosed = [];
    dispMarks();
    if (checkWin()) {
        endGame(true);
        clearInterval(timer);
    }
}

function dispMarks() {
    const markH3 = document.getElementById("marks");
    markH3.innerText = "Marks - " + marks;
    if (marks <= 0) {
        endGame(false);
    }
}

function checkWin() {
    const allCards = document.querySelectorAll("img");
    for (let i = 0; i < allCards.length; i++) {
        if (!allCards[i].classList.contains("matched")) {
            return false; // Game is not yet won
        }
    }
    return true; // All cards are matched, game is won
}

function endGame(isWin) {
    if (isWin) {
        const allCards = document.querySelectorAll("img");
        const taps = allCards.length - imageArray.length;
        const elapsedTimeInSeconds = elapsedTime / 1000;
        const minutes = Math.floor(elapsedTimeInSeconds / 60);
        const seconds = Math.floor(elapsedTimeInSeconds % 60);
        alert(`Congratulations! You win! | Time Elapsed: ${minutes} minutes ${seconds} seconds`);
    } else {
        const allCards = document.querySelectorAll("img");
        const taps = allCards.length - imageArray.length;
        const elapsedTimeInSeconds = elapsedTime / 1000;
        const minutes = Math.floor(elapsedTimeInSeconds / 60);
        const seconds = Math.floor(elapsedTimeInSeconds % 60);
        alert(`Game Over! You are out of moves!!, Time Elapsed: ${minutes} minutes ${seconds} seconds`);
    }
}

document.getElementById("startButton").addEventListener("click", function() {
    createBoard();
    this.disabled = true; // Disable the start button after clicking
});
