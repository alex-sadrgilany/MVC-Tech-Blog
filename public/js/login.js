async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.getElementById("email-login").value.trim();
    const password = document.getElementById("password-login").value.trim();

    if (email && password) {
        const response = await fetch("/api/users/login", {
            method: "post",
            body: JSON.stringify({
                email,
                password
            }),
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
            document.location.replace("/dashboard");
        }
        else {
            alert(response.statusText);
        }
    }
};

function redirectSignUp (event) {
    event.preventDefault();
    window.location.replace("/signup");
};

document.querySelector(".login-form").addEventListener("submit", loginFormHandler);
document.querySelector(".login-form").addEventListener("click", redirectSignUp);
