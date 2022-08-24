function OnClick()
{
    const price = Number(document.getElementById('price').value);
    const money = +document.querySelector('#money').value;
    const answer = document.querySelector('#answer');

    const amount = Math.floor(money/price);
    answer.textContent = amount;

    if(amount < 10)
        answer.textContent = answer.textContent + " litres || Ups, you have to stay here.";
    else if(amount > 10)
        answer.textContent = answer.textContent + " litres || Good, you can escape now.";
}
