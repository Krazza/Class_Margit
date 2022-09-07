// Ask if there is a way to pass variables from HTML to JS (like: <input name = kevin>, onlick = CollectNames(kevin, jon) etc.) 

let table = document.querySelector(`#resultTable`);
let tableBody = document.querySelector(`#bodyT`);
let resultBox = document.querySelector(`#searchResult`);
let searchBox = document.querySelector(`#search`);
let inputs = document.querySelectorAll(`input[type=text]`);

let addedCars = [];

function SaveCarInfo()
{
    Append(CreateCar(inputs));
}

function CreateCar(inputs) 
{
    let newCar = new Car();

    inputs.forEach(function (item) 
    {
        switch (item.name) {
            case "licence":
                newCar.licence = item.value;
                break;
            case "maker":
                newCar.maker = item.value;
                break;
            case "model":
                newCar.model = item.value;
                break;
            case "owner":
                newCar.owner = item.value;
                break;
            case "price":
                newCar.price = item.value;
                break;
            case "color":
                newCar.color = item.value;
                break;
        }
    });

    return newCar;
}

function Append(car)
{
    let row = tableBody.insertRow(-1);
    let cellLicence = row.insertCell(0);
    let cellMaker = row.insertCell(1);
    let cellModel = row.insertCell(2);
    let cellOwner = row.insertCell(3);
    let cellPrice = row.insertCell(4);
    let cellColor = row.insertCell(5);
    
    cellLicence.innerHTML = car.licence;
    cellMaker.innerHTML = car.maker;
    cellModel.innerHTML = car.model;
    cellOwner.innerHTML = car.owner;
    cellPrice.innerHTML = car.price;
    cellColor.innerHTML = car.color;

    addedCars.push(car);
    console.table(addedCars);

    ClearFields();
}

function Reset()
{
    let new_body = document.createElement('tbody');
    
    table.replaceChild(new_body, tableBody);
    tableBody = new_body;
    addedCars = [];
    resultBox.innerHTML = "Input a licence number and press search."
    searchBox.value = '';

    ClearFields();
}

function Search()
{
    let plate = searchBox.value;

    addedCars.forEach(function(car)
    {
        if(car.licence == plate)
        {
            let textResults = `Car mark: ${car.maker}, car model: ${car.model}, car owner: ${car.owner}.`;
            
            resultBox.innerHTML = textResults;
        }
    });
}

function ClearFields() 
{
    inputs.forEach(function (item) 
    {
        item.value = '';
    });
}

class Car 
{
    constructor(licence, maker, model, owner, price, color)
    {
        this.licence = licence;
        this.maker = maker;
        this.model = model;
        this.owner = owner;
        this.price = price;
        this.color = color;        
    }

    Vroom()
    {
        console.log("And another one bites the dust!");
    }
}