function login() {
    // Gets the input boxes values
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let usernameError = document.getElementById("username-error");
    let passwordError = document.getElementById("password-error");

    // Username length check
    if(username.length < 6) {
        usernameError.style.color = "red";
        return false;
    } else {
        usernameError.style.color = "white";
    }

    // Password length check
    if(password.length < 8) {
        passwordError.style.color = "red";
        return false;
    } else {
        passwordError.style.color = "white";
    }

    // Redirect user to the home screen after login
    location.href = "home.html";
    return false;
}