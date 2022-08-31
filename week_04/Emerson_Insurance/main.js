function HandleInput()
{
    let myForm = document.querySelector('#form');
    let userNameInput = document.querySelector("#userName").value;
    let userAge = document.querySelector("#userAge").value;
    
    let userConditionsArray = [];
    let userConditionsInput = document.querySelectorAll('input[name=conditionsInput]:checked');
    userConditionsArray = Array.from(userConditionsInput).map(item => item.value);

    let userHabitsArray = [];
    let userHabitsInput = document.querySelectorAll('input[name=habitsInput]:checked');
    userHabitsArray = Array.from(userHabitsInput).map(item => item.value);

    let output = document.querySelector("#results");
    let price = 500;

    if(userAge >= 18 && userAge <= 25)
        price = price + (price * 0.1);
    else if(userAge >= 26 && userAge <= 35)
        price = price + (price * 0.3)
    else if(userAge >= 36 && userAge <= 45)
        price = price + (price * 0.6)
    else if(userAge >= 46 && userAge <= 55)
        price = price * 2;
    else if(userAge >= 56 && userAge <= 65)
        price = price + (price * 1.5);
    else if(userAge >= 66)
        price = price + (price * 2.1);


    userConditionsArray.forEach(function()
    {
        price = price + (price * 0.01);
    });

    for(let i = 0; i < userHabitsArray.length; i++)
    {
        if(userHabitsArray[i] == "bad")
            price = price + (price * 0.05);
        else if(userHabitsArray[i] == "good")
            price = price - (price * 0.05);
    }

    output.innerHTML = `Here is the price of your insurance, ${userNameInput}: ${Math.floor(price)} &euro;.`;
    output.style.textDecoration = "underline";
    output.style.textDecorationColor = "#85AF58";
    output.style.textDecorationThickness = "8px";

    form.reset();
}