function TemperatureConversion(inputValue, id)
{
    inputValue = parseFloat(inputValue);

    let inputCelcius = document.querySelector('#cel');
    let inputFahrenheit = document.querySelector('#fahr');
    let inputKelvin = document.querySelector('#kel');

    //console.log(inputCelcius);

    switch(id)
    {
        case 'cel':
            inputFahrenheit.value = ((inputValue * 1.8) + 32).toFixed(2);
            inputKelvin.value = (inputValue + 273.15).toFixed(2);
        break;
        case 'fahr':
            inputCelcius.value = ((inputValue - 32) / 1.8).toFixed(2);
            inputKelvin.value = (((inputValue - 32) / 1.8)+273.15).toFixed(2);
        break;
        case 'kel':
            inputCelcius.value = (inputValue - 273.15).toFixed(2);
            inputFahrenheit.value = (((inputValue - 273.15) * 1.8) + 32).toFixed(2);
        break;
        default:
        break
    }
}