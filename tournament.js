
let numberOfPartic = document.getElementById("number-of-people").value;

function getNames() {

    for(let i = 0; i <= numberOfPartic; i ++) {
        let newName = document.createElement("input");
        newName.setAttribute("id", i.toString());
        newName.setAttribute("type", "text");
        newName.setAttribute("value", "");
        newName.setAttribute("style", "width:200px; margin-top:15px");


        let newNameInputs = document.getElementById("name-inputs");
        newNameInputs.appendChild(newName);
    }

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

}