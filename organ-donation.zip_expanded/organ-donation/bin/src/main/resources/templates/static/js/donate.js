document.getElementById("donateForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData || userData.role !== "DONOR") {
        alert("Only donors can submit this form.");
        return;
    }

    const organType = document.getElementById("organType").value;
    const bloodType = document.getElementById("bloodType").value;

    if (!userData.id) {
        alert("User ID is missing. Please log in again.");
        window.location.href = "login.html";
        return;
    }

    const requestBody = {
        userId: userData.id, // Ensure ID is included
        organType: organType,
        bloodType: bloodType
    };

    fetch("http://localhost:8080/donor/donate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        window.location.href = "dashboard.html"; // Redirect after successful donation
    })
    .catch(error => console.error("Error:", error));
});
