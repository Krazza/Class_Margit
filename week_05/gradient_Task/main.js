function LabelClicked(selectedId)
{
    let labels = ["NW", "N", "NE", "E", "SE", "S", "SW", "W"];

    let colorOne = document.querySelector(`#colorOne`).value;
    let colorTwo = document.querySelector(`#colorTwo`).value;
    
    let clickedLabel = document.querySelector(`label[for=${selectedId}]`);
    clickedLabel.firstChild.style.fontSize = "60px";
    clickedLabel.firstChild.style.color = "rgb(37, 207, 111)"

    for(let i = 0; i < labels.length; ++i)
    {
        if(labels[i] == selectedId)
            continue;
        else 
        {
            document.querySelector(`label[for=${labels[i]}]`).firstChild.style.fontSize = "40px";
            document.querySelector(`label[for=${labels[i]}]`).firstChild.style.color = "rgb(0, 0, 0)";
        }
    }


    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "100% 100%";
    document.body.style.backgroundAttachment = "fixed";

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