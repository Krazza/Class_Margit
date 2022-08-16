
let userAge;

userAge = prompt("How old are you exactly?");

if(userAge <= 18)
    {
        alert("Too young for the military service.");
    }
    else if(userAge > 18 && userAge <= 27)
    {
        alert("Just right for the military service.");
    }
    else if(userAge > 27 && userAge <= 41)
    {
        alert("You are in reserve.");
    }
    else if(userAge > 41 && userAge <= 55)
    {
        alert("You are in backup reserve.");
    }
    else
        alert("Too aged.");