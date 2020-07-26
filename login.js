function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let usernameError = document.getElementById("username-error");
    let passwordError = document.getElementById("password-error");

    if(username.length < 6) {
        usernameError.style.color = "red";
        return false;
    } else {
        usernameError.style.color = "white";
    }

    if(password.length < 8) {
        passwordError.style.color = "red";
        return false;
    } else {
        passwordError.style.color = "white";
    }

    location.href = "home.html";
    return false;
}