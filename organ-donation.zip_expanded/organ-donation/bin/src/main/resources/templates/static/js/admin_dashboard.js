document.addEventListener("DOMContentLoaded", function () {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!userData || userData.role !== "ADMIN") {
        alert("Access Denied! Only admins can access this page.");
        window.location.href = "login.html";
        return;
    }

    function fetchDonorRequests() {
        fetch("http://localhost:8080/donor/all")
            .then(response => response.json())
            .then(data => {
                const pendingDonors = data.filter(donor => donor.status.toLowerCase() === "pending");
                const donorContainer = document.getElementById("donorRequests");

                donorContainer.innerHTML = ""; // Clear previous content

                donorContainer.innerHTML = pendingDonors.length
                    ? pendingDonors.map(donor => `
                        <div class="donor-card" id="donor-${donor.donorId}">
                            <p><strong>Name:</strong> ${donor.user.name}</p>
                            <p><strong>Organ:</strong> ${donor.organType}</p>
                            <p><strong>Blood Type:</strong> ${donor.bloodType}</p>
                            <button onclick="verifyDonor(${donor.donorId})">Verify</button>
                            <button onclick="rejectDonor(${donor.donorId})">Reject</button>
                        </div>
                    `).join("")
                    : "<p>No pending donor verifications.</p>";
            })
            .catch(error => console.error("Error fetching donor requests:", error));
    }

    function fetchRecipientRequests() {
        fetch("http://localhost:8080/recipient/all")
            .then(response => response.json())
            .then(data => {
                const pendingRecipients = data.filter(recipient => recipient.status.toLowerCase() === "pending");
                const recipientContainer = document.getElementById("recipientRequests");

                recipientContainer.innerHTML = ""; // Clear previous content

                recipientContainer.innerHTML = pendingRecipients.length
                    ? pendingRecipients.map(recipient => `
                        <div class="recipient-card" id="recipient-${recipient.recipientId}">
                            <p><strong>Name:</strong> ${recipient.user.name}</p>
                            <p><strong>Organ Needed:</strong> ${recipient.organType}</p>
                            <p><strong>Blood Type:</strong> ${recipient.bloodType}</p>
                            <button onclick="verifyRecipient(${recipient.recipientId})">Verify</button>
                            <button onclick="rejectRecipient(${recipient.recipientId})">Reject</button>
                        </div>
                    `).join("")
                    : "<p>No pending recipient verifications.</p>";
            })
            .catch(error => console.error("Error fetching recipient requests:", error));
    }

    // Function to Verify Donor
    window.verifyDonor = function (donorId) {
        fetch(`http://localhost:8080/admin/verify/donor/${donorId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" }
        })
        .then(response => response.text())
        .then(message => {
            alert(message);
            document.getElementById(`donor-${donorId}`).remove(); // Remove verified donor from UI
        })
        .catch(error => console.error("Error verifying donor:", error));
    };

    // Function to Reject Donor
    window.rejectDonor = function (donorId) {
        fetch(`http://localhost:8080/admin/reject/donor/${donorId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" }
        })
        .then(response => response.text())
        .then(message => {
            alert(message);
            document.getElementById(`donor-${donorId}`).remove(); // Remove rejected donor from UI
        })
        .catch(error => console.error("Error rejecting donor:", error));
    };

    // Function to Verify Recipient
window.verifyRecipient = function (recipientId) {
    fetch(`http://localhost:8080/admin/verify/recipient/${recipientId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to verify recipient");
        }
        return response.text();
    })
    .then(message => {
        alert(message);
        document.getElementById(`recipient-${recipientId}`).remove(); // Remove verified recipient from UI
    })
    .catch(error => console.error("Error verifying recipient:", error));
};

// Function to Reject Recipient
window.rejectRecipient = function (recipientId) {
    fetch(`http://localhost:8080/admin/reject/recipient/${recipientId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to reject recipient");q
        }
        return response.text();
    })
    .then(message => {
        alert(message);
        document.getElementById(`recipient-${recipientId}`).remove(); // Remove rejected recipient from UI
    })
    .catch(error => console.error("Error rejecting recipient:", error));
};


    fetchDonorRequests();
    fetchRecipientRequests();
});
