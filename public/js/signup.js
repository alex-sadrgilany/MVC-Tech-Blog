async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.getElementById("username-signup").value.trim();
    const password = document.getElementById("password-signup").value.trim();

    if (username && password && password.length > 7) {
        const response = await fetch("/api/users", {
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
    else {
        alert("You must enter a username and password. The password must be at least 8 characters long!");
    }
    console.log("testing")
};

document.querySelector(".signup-form").addEventListener("submit", signupFormHandler);