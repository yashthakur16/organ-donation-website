document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error("Invalid email or password");
        }

        const data = await response.json();
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify({ id: data.id, name: data.name, role: data.role }));

        alert("Login successful!");

        // Redirect Admin to admin dashboard, others to common dashboard
        if (data.role === "ADMIN") {
            window.location.href = "admin_dashboard.html";
        } else {
            window.location.href = "dashboard.html";
        }
    } catch (error) {
        alert(error.message);
    }
});
