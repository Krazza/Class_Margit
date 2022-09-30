let toTopButton = document.querySelector("#toTopButton");

let header = document.querySelector("#headerContent");

let menuButton = document.querySelector("#mobileButton");

let nav = document.querySelector("nav");

let noClickBttn = document.querySelector("input[name=NoClick]");
let overlay = document.querySelector("#overlay");
let modal = document.querySelector("#modal");
let modalCloseBttn = document.querySelector("#modalClose");

let stuffToShowAndHide = [overlay, modal, modalCloseBttn];


modalCloseBttn.addEventListener("click", function (){

    stuffToShowAndHide.forEach(function (item) 
    {
        item.style.display = "none";
    })
})

noClickBttn.addEventListener("click", function() {

    stuffToShowAndHide.forEach(function(item) 
    {
        item.style.display = "block";
    })
});

menuButton.addEventListener("click", function(){
    
    if(nav.classList.contains("responsive"))
    {
        nav.classList.remove("responsive");
    } else
        nav.classList.add("responsive");
});

toTopButton.addEventListener("click", function()
{
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

document.addEventListener("scroll", function()
{
    if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)
    {
        toTopButton.style.display = "block";
        header.classList.add("bg");
        
    } else
    {
        toTopButton.style.display = "none";
        header.classList.remove("bg");
    }

});