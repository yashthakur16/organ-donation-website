document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;
    const registerBtn = document.getElementById("registerBtn");

    // Basic validation
    if (!name || !email || !phone || !password) {
        alert("Please fill out all fields.");
        return;
    }

    registerBtn.innerHTML = "Registering...";
    registerBtn.disabled = true;

    try {
        const response = await fetch("http://localhost:8080/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, phone, password, role })
        });

        if (response.ok) {
            alert("Registration successful! You can now log in.");
            window.location.href = "login.html"; 
        } else {
            alert("Registration failed. Please try again.");
        }
    } catch (error) {
        alert("Error connecting to the server.");
    }

    registerBtn.innerHTML = "Register";
    registerBtn.disabled = false;
});
