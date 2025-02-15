document.addEventListener("DOMContentLoaded", function () {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!userData || userData.role !== "RECIPIENT") {
        alert("Access restricted to recipients.");
        window.location.href = "login.html";
        return;
    }

    const matchesList = document.getElementById("matchesList");

    function findMatches() {
        fetch(`http://localhost:8080/matching/find?recipientId=${userData.id}`, {
            method: "POST"
        })
        .then(response => response.text())
        .then(message => {
            alert(message);
            loadMatches();
        })
        .catch(error => console.error("Error finding matches:", error));
    }

    function loadMatches() {
        fetch("http://localhost:8080/matching/all")
            .then(response => response.json())
            .then(matches => {
                if (matches.length === 0) {
                    matchesList.innerHTML = "<p>No matches found</p>";
                } else {
                    matchesList.innerHTML = matches
                        .filter(match => match.recipient.id === userData.id)
                        .map(match => `
                            <div class="match">
                                <p>Donor: ${match.donor.user.name}</p>
                                <p>Organ: ${match.donor.organType}</p>
                                <p>Blood Type: ${match.donor.bloodType}</p>
                            </div>
                        `).join("");
                }
            })
            .catch(error => console.error("Error loading matches:", error));
    }

    function logout() {
        localStorage.removeItem("user");
        window.location.href = "login.html";
    }

    loadMatches();
});
