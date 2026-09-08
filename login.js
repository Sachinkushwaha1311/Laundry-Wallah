function showSignup() {
    document
        .getElementById("loginForm")
        .classList.remove("active");

    document
        .getElementById("signupForm")
        .classList.add("active");
}

function showLogin() {
    document
        .getElementById("signupForm")
        .classList.remove("active");

    document
        .getElementById("loginForm")
        .classList.add("active");
}

document
    .getElementById("login")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        const email =
            document.getElementById("loginEmail").value;

        const password =
            document.getElementById("loginPassword").value;

        const message =
            document.getElementById("loginMessage");
        if (email === "" || password === "") {
            message.textContent =
                "Please enter email and password.";
            message.style.color = "red";
            return;
        }

        message.textContent =
            "Login successful!";
        message.style.color = "green";
    });

document
    .getElementById("signup")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        const password =
            document.getElementById("signupPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const message =
            document.getElementById("signupMessage");
        if (password !== confirmPassword) {
            message.textContent =
                "Passwords do not match.";
            message.style.color = "red";
            return;
        }

        if (password.length < 6) {
            message.textContent =
                "Password must be at least 6 characters.";
            message.style.color = "red";
            return;
        }

        message.textContent =
            "Account created successfully!";
        message.style.color = "green";

    });