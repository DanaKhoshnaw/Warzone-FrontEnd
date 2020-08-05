
let numberOfPartic;

function getNames() {
    // Gets the number of participants
    numberOfPartic = document.getElementById("number-of-people").value;

    if(numberOfPartic === "Number Of Teams...") {
        alert("Select the number of players to participate in the tournament to continue")
        return false;
    }

    // Dynamically creates text boxes for the players to be entered
    for(let i = 1; i <= numberOfPartic; i ++) {
        let newName = document.createElement("input");
        newName.setAttribute("id", i.toString());
        newName.setAttribute("type", "text");
        newName.setAttribute("value", "");
        newName.setAttribute("style", "width:200px; margin-top:15px");


        let newNameInputs = document.getElementById("name-inputs");
        newNameInputs.appendChild(newName);
    }

    // Creates a submit button
    let submitButton = document.createElement("button");
    submitButton.setAttribute("id", "tourn-bttn");
    submitButton.setAttribute("type", "button");
    submitButton.setAttribute("value", "");
    submitButton.setAttribute("style", "width:200px; margin-top:15px; height:50px");
    submitButton.setAttribute("onclick", "return createBracket()")
    submitButton.innerText = "Submit"
    let nameInputs = document.getElementById("name-inputs");
    nameInputs.appendChild(submitButton)

    document.getElementById("submit-bttn").disabled = true;
    return false;
}

function createBracket() {
    // Disables the submit button
    document.getElementById("tourn-bttn").disabled = true;
    let playersName = []

    let bracket = []
    // Gets all the players from the text box
    for(let i = 1; i <= numberOfPartic; i ++) {
        if(document.getElementById(i.toString()).value === "") {
            alert("All players must be added, please refresh the page")
            return false;
        }
        playersName.push(document.getElementById(i.toString()).value);
    }
    let y = 0
    let playersSize = playersName.length;
    if(playersName.length %2 !== 0) {
        let match = {
            firstPlayer:playersName[playersName.length - 1],
            secondPlayer:"Bye"
        }
        bracket.push(match)
        playersSize = playersSize - 1;
    }

    // Creates the match ups
    for(let i = 1; i < playersSize; i= i + 2) {
        let matchup = {
            firstPlayer:playersName[y],
            secondPlayer:playersName[i]
        };
        y += 2
        bracket.push(matchup);
    }
    console.log(bracket);

    return addToScreen(bracket);
}

// Adds the players to the screen
function addToScreen(bracket) {
    document.getElementById("match-up").innerText += "Match ups for the tournament" +"\n\n";


    // Goes through the list and adds the match up to the screen
    for(let i = 0; i < bracket.length; i ++) {
        console.log(bracket[i].firstPlayer + "VS"+ bracket[i].secondPlayer)
        document.getElementById("match-up").innerText += bracket[i].firstPlayer +
            " VS " + bracket[i].secondPlayer + "\n";

    }
    return false;
}

// Help button to assist the user
function helpTournament() {
    alert("Select the number of people you would like to have participate in the tournament," +
        " once selected it will ask for the names of the players and then it will generate match ups for you")
    return false;
}