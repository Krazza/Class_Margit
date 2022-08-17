const userInputNumbers = [0, 0, 0];
let poisitiveNumberfound = new Boolean(false);
let allPositives = new Boolean(true);
let allNegatives = new Boolean(true);

function NumberInput ()
{
    
    for(let a = 0; a <= 2; a++)
    {
        userInputNumbers[a] = (prompt("Please, enter a number:"));
        
        if(isNaN(userInputNumbers[a]) || userInputNumbers[a] == ' ')
        {
            alert("Didn't I tell you to enter a NUMBER?");
            a = -1;
        }
        /*
        if(typeof userInputNumbers[a] != 'number')
        {
            alert("Didn't I tell you to enter a NUMBER?");
            a = 0;
        }
        */
    }
}

function UserInputCheck()
{
    for(let a = 0; a <= 2; a++)
    {
        if(userInputNumbers[a] >= 0)
        {
            poisitiveNumberfound = true;
            allNegatives = false;
        }
        else if(userInputNumbers[a] < 0)
        {
            allPositives = false;
        }
    }
}

function HandleTheResults()
{
    let resultSum = 0;
    let resultMult = 1;

    if(poisitiveNumberfound && allPositives)
    {
        for(let a = 0; a <= 2; a++)
        {
            resultSum = resultSum + parseInt(userInputNumbers[a]);
            resultMult = resultMult * userInputNumbers[a];
        }

        console.log(`Summary of your numbers is: ${resultSum}`);
        console.log(`Multiplication result of your numbers is: ${resultMult}`);

    } else if(poisitiveNumberfound && !allNegatives)
    {
        for(let a = 0; a <= 2; a++)
        {
            resultSum = resultSum + parseInt(userInputNumbers[a]);
        }

        console.log(`Summary of your numbers is: ${resultSum}`);

    } else if(allNegatives)
    {
        console.log("Only negatives, silly.");
    }
}

NumberInput();
UserInputCheck();
HandleTheResults();
