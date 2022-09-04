function Debug()
{
    let userNameTxtInp = document.querySelector("#userName");
    let pizzaSizeRadInp = document.querySelector('input[name=Pzsize]:checked').value;
    
    let toppingsCheckInp = document.querySelectorAll('input[name=tops]:checked');
    let toppingsCheckBxInpt = [];
    toppingsCheckBxInpt = Array.from(toppingsCheckInp).map(item => item.value);

    let selectDeliveryInp = document.querySelector('#DMethod');
    let selectedDlvrOption = selectDeliveryInp.options[selectDeliveryInp.selectedIndex];

    let output = document.querySelector("#results");

    let price = 0;

    switch(pizzaSizeRadInp)
    {
        case "Pizza for 2":
            price += 7.5;
            break;
        case "Pizza for 4":
            price += 10.5;
            break;
        case "Pizza for 6":
            price += 12.5;
            break;
        case "Pizza for 8":
            price += 15.5;
            break;
        default:
            break;
    }

    if(toppingsCheckBxInpt.length > 4)
        price += (toppingsCheckBxInpt.length - 4) * 0.5;

    if(selectedDlvrOption.value == "delivery")
        price += 5;
    

    output.innerHTML = `<span id="S1">Here is your order, ${userNameTxtInp.value}: </span>
    <span id="S2"> Pizza size: ${pizzaSizeRadInp} </span>
    <span id="S3"> Chosen toppings: ${toppingsCheckBxInpt} </span>
    <span id="S4"> Delivery method: ${selectedDlvrOption.value} </span>`;
}