"use strict";
var conn = new signalR.HubConnectionBuilder().withUrl("/clientHub").build();

// Append received messages
conn.on("ReceiveMessage", function (user, message) {
    var messageDiv = document.createElement("div");
    messageDiv.classList.add("message", "received");
    messageDiv.textContent = `${user}: ${message}`;
    document.getElementById("messagesList").appendChild(messageDiv);
});

// Start the connection
conn.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

// Send messages
document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;

    // Append sent messages
    var messageDiv = document.createElement("div");
    messageDiv.classList.add("message", "sent");
    messageDiv.textContent = `You: ${message}`;
    document.getElementById("messagesList").appendChild(messageDiv);

    // Invoke SignalR SendMessage method
    conn.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });

    // Clear the message input field
    document.getElementById("messageInput").value = "";

    event.preventDefault();
});
