function Debug()
{
    let userNameTxtInp = document.querySelector("#userName");
    let pizzaSizeRadInp = document.querySelector('input[name=Pzsize]:checked').value;
    
    let toppingsCheckInp = document.querySelectorAll('input[name=tops]:checked');
    let toppingsCheckBxInpt = [];
    toppingsCheckBxInpt = Array.from(toppingsCheckInp).map(item => item.value);

    let selectDeliveryInp = document.querySelector('#DMethod');
    let selectedDlvrOption = selectDeliveryInp.options[selectDeliveryInp.selectedIndex];

    let price = 0;

    switch(pizzaSizeRadInp)
    {
        case "2":
            price += 7.5;
            break;
        case "4":
            price += 10.5;
            break;
        case "6":
            price += 12.5;
            break;
        case "8":
            price += 15.5;
            break;
        default:
            break;
    }

    if(toppingsCheckBxInpt.length > 4)
        price += (toppingsCheckBxInpt.length - 4) * 0.5;

    if(selectedDlvrOption.value == "delivery")
        price += 5;
    

    console.log(userNameTxtInp.value);
    console.log(pizzaSizeRadInp);
    console.log(toppingsCheckBxInpt);
    console.log(selectedDlvrOption.value);
    console.log(price);
}