document.addEventListener("DOMContentLoaded", function () {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!userData) {
        alert("Please log in to access the chat.");
        window.location.href = "login.html";
        return;
    }

    const chatWindow = document.getElementById("chatWindow");
    const messageInput = document.getElementById("messageInput");
    const sendMessageButton = document.getElementById("sendMessage");
    const receiverDropdown = document.getElementById("receiver");

    // Load available chat users (Donors for Recipients and vice versa)
    function loadUsers() {
        fetch("http://localhost:8080/api/users/all")  // ✅ Corrected API Endpoint
            .then(response => response.json())
            .then(users => {
                console.log("Users fetched:", users);  // ✅ Debugging Step
                
                if (!Array.isArray(users)) {
                    throw new Error("Unexpected response format");
                }

                receiverDropdown.innerHTML = ""; // Clear previous options

                users.forEach(user => {
                    if (user.id !== userData.id) { // Avoid self-selection
                        const option = document.createElement("option");
                        option.value = user.id;
                        option.textContent = user.name;
                        receiverDropdown.appendChild(option);
                    }
                });

                if (receiverDropdown.options.length > 0) {
                    loadChat(); // Load chat messages for the first user
                }
            })
            .catch(error => console.error("Error fetching users:", error));
    }

    // Fetch and display chat messages
    function loadChat() {
        const receiverId = receiverDropdown.value;
        if (!receiverId) return;

        fetch(`http://localhost:8080/api/chats/history?user1Id=${userData.id}&user2Id=${receiverId}`)
            .then(response => response.json())
            .then(messages => {
                console.log("Messages fetched:", messages);  // ✅ Debugging Step
                
                chatWindow.innerHTML = messages.map(msg => `
                    <div class="${msg.sender.id === userData.id ? 'sent' : 'received'}">
                        <strong>${msg.sender.name}:</strong> ${msg.message}
                    </div>
                `).join("");
            })
            .catch(error => console.error("Error fetching chat messages:", error));
    }

    // Send message
    sendMessageButton.addEventListener("click", function () {
        const receiverId = receiverDropdown.value;
        const message = messageInput.value.trim();

        if (!receiverId || !message) return;

        fetch("http://localhost:8080/api/chats/send", { // ✅ Corrected API Endpoint
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                senderId: userData.id,
                receiverId: receiverId,
                message: message
            })
        })
        .then(response => response.text()) // ✅ Expecting text response
        .then(() => {
            messageInput.value = "";
            loadChat(); // Refresh messages
        })
        .catch(error => console.error("Error sending message:", error));
    });

    receiverDropdown.addEventListener("change", loadChat);

    loadUsers();
});
