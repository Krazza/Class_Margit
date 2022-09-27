let startButton = document.querySelector("#startGame");
let stopGame = document.querySelector("#stopGame");
let reload = document.querySelector("#reload");
let myDrumKitInputs = document.querySelectorAll("input[type=image]");
let scoreDisplay = document.querySelector("#score");
let myDrumKit = Array.from(myDrumKitInputs);
let activeBackGround = "images/green_drum.webp";
let inactiveBackground = "images/red_drum.webp";
let banner = document.querySelector("#banner");
let bck = document.querySelector("#bck");


let time = 5000;
let theTimer;
let points = 0;

let ActiveDrum;
let nextIndex;
let previousDrumId;

startButton.addEventListener("click", StartTheGame);
stopGame.addEventListener("click", GameOver);
reload.addEventListener("click", ReloadPage);

function StartTheGame()
{
    stopGame.style.display = "inline-block";

    SetNextActiveDrum();
    scoreDisplay.innerHTML = `Your score: ${points}`;

    myDrumKit.forEach(drum =>
    {
        if(drum.id == ActiveDrum.id)
        {
            drum.addEventListener("click", WinRound);
            drum.src = activeBackGround;
        } else  
        {
            drum.addEventListener("click", GameOver);
            drum.src = inactiveBackground;
        }
    })

    theTimer = setTimeout(function()
    {
        GameOver();
    }, time);

}

function SetNextActiveDrum()
{
    do {
        nextIndex = GetRandomInt(4);
        if(previousDrumId == null)
            previousDrumId = GetRandomInt(4);
    } while (nextIndex == previousDrumId);
    
    previousDrumId = nextIndex;
    ActiveDrum = myDrumKit[nextIndex];
}

function WinRound()
{
    points++;
    scoreDisplay.innerHTML = `Your score: ${points}`;

    clearTimeout(theTimer);
    for(let i = 0; i < myDrumKit.length; i++)
    {
        if(i == nextIndex)
            myDrumKit[i].removeEventListener("click", WinRound);
        else 
            myDrumKit[i].removeEventListener("click", GameOver);
    }

    if(time > 1000)
        time = time - 500;
        
    StartTheGame(time);
}

function GameOver()
{
    clearTimeout(theTimer);
    myDrumKit.forEach(drum =>
        {
            drum.src = inactiveBackground;

            if(drum.id == ActiveDrum.id)
                drum.removeEventListener("click", WinRound);
            else
                drum.removeEventListener("click", GameOver);
        })

    banner.style.visibility = "visible";
    bck.style.visibility = "visible";
    banner.firstChild.innerHTML = `Your result is: ${points}, loser, go practice.`;
    stopGame.style.display = "none";
    points = 0;
    console.log("game over, points reset");
    time = 5000;
}

function GetRandomInt(max)
{
    return Math.floor(Math.random() * max);
}

function ReloadPage()
{
    window.location.reload();
}


