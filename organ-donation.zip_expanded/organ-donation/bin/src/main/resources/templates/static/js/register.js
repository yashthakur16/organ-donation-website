document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, phone, password, role })
    });

    if (response.ok) {
        alert("Registration successful! You can now log in.");
        window.location.href = "login.html";  // Redirect to login
    } else {
        alert("Registration failed. Try again.");
    }
});
