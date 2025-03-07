// script.js

document.getElementById("yes-btn").addEventListener("click", function() {
    document.getElementById("response-msg").innerText = "Awesome! Let's plan your website! 🚀";
    document.getElementById("response-msg").style.color = "green";
});

document.getElementById("no-btn").addEventListener("click", function() {
    document.getElementById("response-msg").innerText = "No worries! Hope you have a great day! 🎉";
    document.getElementById("response-msg").style.color = "red";
});
