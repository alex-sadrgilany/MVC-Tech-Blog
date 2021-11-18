async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.getElementById("username-signup").value.trim();
    const password = document.getElementById("password-signup").value.trim();

    if (username && password) {
        const response = await fetch("/api/users", {
            method: "post",
            body: JSON.stringify({
                username,
                password
            }),
            headers: { "Content-Type": "application/json" }
        });
        
        if (response.ok) {
            alert("You have successfully signed up! You can now login with your new credentials.");
            document.location.replace("/login");
        }
        else {
            alert(response.statusText);
        }
    }
};

document.querySelector(".signup-form").addEventListener("submit", signupFormHandler);