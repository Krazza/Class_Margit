// for(let i = 1; i <= 100; i+=2)
// {
//     console.log(i);
// }

// let s = "";

// for(let a = 2, i = 98; a < 100, i > 2; a += 2, i -= 2)
// {
//     s = s + a + " ";
//     s = s + i + " ";
// }

// console.log(s);

// let distanceKm = 0;
// let timeH = 0;
// let speedAv = 0;

// do
// {
//     distanceKm = prompt("input distance");

//     if(isNaN(distanceKm) || distanceKm == 0)
//     {
//         alert("invalid number for distance, closing");
//         break;
//     }

//     timeH = prompt("input time");

//     if(isNaN(timeH) || timeH == 0)
//     {
//         alert("invalid number for time, starting over");
//         continue;
//     }

//     speedAv = distanceKm/timeH;
//     alert(`your average speed = ${speedAv}`);
    
// }while(true);

// let counter = 0;
// let userInput = 0;

// for(let i = 0; i < 20; i++)
// {
//     userInput = prompt("input a number");

//     if((userInput % 2) == 0)
//         counter++;
// }

// alert(`you gave me ${counter} even numbers`);

// let userInput;
// let sum = 0;
// let amountOfNumbers = 0;
// let average = 0;

// do
// {
//     userInput = prompt("input a number: ");

//     if(isNaN(userInput))
//     {
//         alert("Not a valid number, starting over");
//         sum = 0;
//         userInput = 0;
//         continue;
//     } else if(userInput == 0)
//         break;
//     else
//     {
//         sum = parseFloat(sum) + parseFloat(userInput);
//         amountOfNumbers++;
//     }
// } while(true);

// average = sum/amountOfNumbers;

// alert(`here is the average ${average}`);


// let userInput;
// let sum = 0;
// let average = 0;
// let debugCounter = 0;

// for(let i = 0; i <= 24; i++)
// {
//     userInput = prompt(`input number #${i + 1}`);

//     if(isNaN(userInput) || userInput == " ")
//     {
//         alert("input a valid number");
//         i -= 2;        
//     } else
//     {
//         sum = parseInt(sum) + parseInt(userInput);
//     }
// }

// average = sum/25;
// alert(`here is your average ${average}`);


// let userInputNumber;
// let userAnswer;
// let counter = 0;
// let sum = 0;
// let average = 0;

// do 
// {
//     counter++;
//     userInputNumber = prompt("Enter a number: ");
//     sum = parseFloat(sum) + parseFloat(userInputNumber);
//     userAnswer = prompt("Do you want to continue (y/n)?");

//     if(userAnswer == "y")
//     {   
//         continue;
//     } else if(userAnswer == "n")
//         break;
//     else 
//     break;

// } while(true);

// average = sum/counter;

// alert(`here is your average ${average}`);

// let counter = 0;
// let userInput;
// let smallestNumber;

// do
// {
//     counter = prompt("how many numbers do you want to input?");
// } while(isNaN(counter));

// for(counter; counter > 0; counter--)
// {
//     userInput = prompt(`enter value#${counter}`);

//     if(isNaN(userInput))
//     {
//         alert("input a valid number");
//         counter += 1;
//     }

//     if(isNaN(smallestNumber) && !isNaN(userInput))
//     {
//         smallestNumber = userInput;
//     } else if(!isNaN(userInput) && smallestNumber > userInput)
//     {
//         smallestNumber = userInput;
//     }   
// }

// alert(`here is your smallest number: ${smallestNumber}`);

//unfinished
let userInput;
let biggestNumber;
let secondBigestNumber;

for(let i = 0; i <= 9; i++)
{
    userInput = prompt(`Enter a value#${i+1}`);

    if(isNaN(userInput) || userInput == null || userInput == "")
    {
        alert("enter a VALID number");
        i -= 1;
        continue;
    }

    if(isNaN(biggestNumber) && isNaN(secondBigestNumber))
    {
        biggestNumber = userInput;
        secondBigestNumber = userInput;
    } else if(!isNaN(biggestNumber) && !isNaN(secondBigestNumber))
    {
        if(parseInt(userInput) > parseInt(biggestNumber))
        {
            secondBigestNumber = biggestNumber;
            biggestNumber = userInput; //set 10, both ten is user < big set
        }//if user inp < bgst n then 
        if(+userInput < +biggestNumber)
        {
            //upd second biggest
        }
            
    }
}

alert(`here is your biggest number:${biggestNumber} \nand your second biggest number:${secondBigestNumber}`);