function OnClick()
{
    console.log("hello there");
}

const calculate = () => 
{
    const price = Number(document.getElementById('price').value);
    const money = +document.querySelector('#money').value;
    const answer = document.querySelector('#answer');

    const amount = Math.floor(money/price);
    answer.textContent = amount;
}

