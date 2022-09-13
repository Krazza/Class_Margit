function LabelClicked(selectedId)
{
    let colorOne = document.querySelector(`#colorOne`).value;
    let colorTwo = document.querySelector(`#colorTwo`).value;

    switch(selectedId)
    {
        case "NW":
            document.body.style.backgroundImage = "linear-gradient(to left top, "+ colorOne +", "+ colorTwo +")";
            break;
        case "N":
            document.body.style.backgroundImage = "linear-gradient(to top, "+ colorOne +", "+ colorTwo +")";
            break;
        case "NE":
            document.body.style.backgroundImage = "linear-gradient(to top right, "+ colorOne +", "+ colorTwo +")";
            break;
        case "E":
            document.body.style.backgroundImage = "linear-gradient(to right, "+ colorOne +", "+ colorTwo +")";
            break;
        case "SE":
            document.body.style.backgroundImage = "linear-gradient(to bottom right, "+ colorOne +", "+ colorTwo +")";
            break;
        case "S":
            document.body.style.backgroundImage = "linear-gradient(to bottom, "+ colorOne +", "+ colorTwo +")";
            break;
        case "SW":
            document.body.style.backgroundImage = "linear-gradient(to left bottom, "+ colorOne +", "+ colorTwo +")";
            break;
        case "W":
            document.body.style.backgroundImage = "linear-gradient(to left, "+ colorOne +", "+ colorTwo +")";
            break;
        default:
            break;
    }

    document.querySelector(`#cssCode`).innerHTML = document.body.style.backgroundImage;
}