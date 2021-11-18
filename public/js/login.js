async function loginFormHandler(event) {
    event.preventDefault();

    const username = document.getElementById("username-signin").value.trim();
    const password = document.getElementById("password-signin").value.trim();

    if (username && password) {
        const response = await fetch("/api/users/login", {
            method: "post",
            body: JSON.stringify({
                username,
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

document.querySelector(".signin-form").addEventListener("submit", loginFormHandler);