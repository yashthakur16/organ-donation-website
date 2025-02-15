document.addEventListener("DOMContentLoaded", function () {
    const userData = localStorage.getItem("user");

    if (!userData) {
        alert("You must log in first.");
        window.location.href = "login.html";
        return;
    }

    const user = JSON.parse(userData);
    document.getElementById("username").innerText = user.name;
    document.getElementById("userRole").innerText = user.role;

    // Show sections based on role
    document.getElementById("donorSection").style.display = user.role === "DONOR" ? "block" : "none";
    document.getElementById("recipientSection").style.display = user.role === "RECIPIENT" ? "block" : "none";
    document.getElementById("adminSection").style.display = user.role === "ADMIN" ? "block" : "none";

    document.getElementById("logoutBtn").addEventListener("click", function () {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        window.location.href = "login.html";
    });

    
    
});

function goToChat() {
    window.location.href = "chat.html";
}
