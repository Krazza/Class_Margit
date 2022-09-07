// Ask if there is a way to pass variables from HTML to JS (like: <input name = kevin>, onlick = CollectNames(kevin, jon) etc.) 

let table = document.querySelector(`#resultTable`);
let tableBody = document.querySelector(`#bodyT`);

function SaveCarInfo()
{
    let inputs = document.querySelectorAll(`input[type=text]`);

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
}

function Reset()
{
    let new_body = document.createElement('tbody');
    
    table.replaceChild(new_body, tableBody);
    tableBody = new_body;
}

class Car 
{
    constructor(licence, maker, model, owner, price, color)
    {
        this.carLicence = licence;
        this.carMaker = maker;
        this.carModel = model;
        this.carOwner = owner;
        this.carPrice = price;
        this.carColor = color;        
    }

    Vroom()
    {
        console.log("And another one bites the dust!");
    }
}