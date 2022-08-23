function WhatsYourSalary()
{
    let result = 0;
    const workDay = 7;
    let hourlySalary = prompt("Input your hourly salary:");

    if(isNaN(hourlySalary))
    {
        alert("Didn't I tell you to enter a NUMBER?");
        WhatsYourSalary();
        return;
    }

    let hoursWorked = prompt("And how many hours you worked for?");

    if(isNaN(hoursWorked))
    {
        alert("Didn't I tell you to enter a NUMBER?");
        WhatsYourSalary();
        return;
    }

    if(hoursWorked <= workDay)
    {
        result = hourlySalary * hoursWorked;

    } else if(hoursWorked > workDay)
    {
        let excessHours = hoursWorked - workDay;

        result = hourlySalary * workDay;
        let firstBonus = parseInt(hourlySalary) + (hourlySalary/2);
        
        let firstExtraPeriod = 2;
        while(excessHours > 0 && firstExtraPeriod > 0) 
        {
            result = parseFloat(result) + parseFloat(firstBonus);
            --firstExtraPeriod;
            --excessHours;
        }

        if(excessHours > 0)
        {
            let secondBonus = hourlySalary * 2;

            while(excessHours > 0)
            {
                result = parseFloat(result) + parseFloat(secondBonus);
                --excessHours;
            }
        }
    }

    alert(`Here is your share: ${result} `);
}

WhatsYourSalary();