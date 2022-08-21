function userInput()
{
    let userInputnumber = 0;
    userInputnumber = prompt("Please, enter a positive number:");

    if(isNaN(userInputnumber))
    {
        alert("Didn't I tell you to enter a NUMBER?");
        userInput();
        return;
    } else if(userInputnumber > 0 && userInputnumber % 2 == 0)
    {
        alert(`Number ${userInputnumber} is even`);
    } else if(userInputnumber % 2 > 0)
    {
        alert(`Number ${userInputnumber} is odd`);
    }
     else if(userInputnumber < 0)
    {
        alert(`Number ${userInputnumber} is negative`);;
    }
    return;
}

userInput();
