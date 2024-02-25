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
    cardsChoosed.push({...imageArray[cardId],id:cardId})
    if (cardsChoosed.length === 2){
        setTimeout(checkMatch, 500);
    }
}

function checkMatch(){

    const allCards= document.querySelectorAll("img");
    op1=cardsChoosed[0]
    op2=cardsChoosed[1]
    if(op1.name === op2.name){
        // console.log("same")
        allCards[op1.id].src="#"
        allCards[op2.id].src="#"

        marks = Math.round(marks + 100/6);
    }
    else{
        allCards[op1.id].src="https://static.vecteezy.com/system/resources/previews/007/126/739/non_2x/question-mark-icon-free-vector.jpg"
        allCards[op2.id].src="https://static.vecteezy.com/system/resources/previews/007/126/739/non_2x/question-mark-icon-free-vector.jpg"
       }
    
    cardsChoosed=[];
    dispMarks();
}

function dispMarks(){
    final=marks+"%"
    const markH3 = document.getElementsByClassName("marks");
    markH3.innerText=final;
}