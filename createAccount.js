function createAccountValidation () {
    //Gets all the given text boxes
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;
    let usernameLengthError = document.getElementById("username-length-error");
    let passwordLengthError = document.getElementById("password-length-error");
    let passwordMismatchError = document.getElementById("error-confirm");

    //Length checking
    if(username.length < 6) {
        usernameLengthError.style.color = "red";
    } else {
        usernameLengthError.style.color = "lightgray";
    }

    //Match checking
    if(password !== confirmPassword) {
        passwordMismatchError.innerText = "passwords do not match";
        passwordLengthError.style.color = "lightgray";
    } else if(password.length < 8) {
        passwordLengthError.style.color = "red";
        passwordMismatchError.innerText = "";
    } else {
        passwordLengthError.style.color = "lightgray";
        passwordMismatchError.innerText = "";
    }

    return false;

}

function returnToHome() {

    location.href = "home.html";

    return false;
}