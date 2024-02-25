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

// let numOfCardsSelected = 0;
let cardsChoosed=[]
imageArray.sort(() => 0.5 - Math.random());

const gridDisp = document.querySelector("#grid");

function createBoard() {
    imageArray.forEach((img, index) => { // corrected the syntax for forEach loop
        // console.log(img, index);
        const card = document.createElement("img");
        card.setAttribute("src", "https://static.vecteezy.com/system/resources/previews/007/126/739/non_2x/question-mark-icon-free-vector.jpg");
        card.setAttribute("data-id", index);
        gridDisp.appendChild(card);
        card.addEventListener("click",flipCard);
    });
}
createBoard();
// console.log(imageArray);

function flipCard(){
    const cardId = this.getAttribute("data-id");
    // console.log(cardId)
    this.setAttribute("src", imageArray[cardId].url)
    cardsChoosed.push(imageArray[cardId])
    if (cardsChoosed.length === 2){
        checkMatch();
    }
}

function checkMatch(){
    if(cardsChoosed[0].name === cardsChoosed[1].name){
        console.log("same")
    }
}
