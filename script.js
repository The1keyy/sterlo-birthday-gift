// script.js

document.getElementById("yes-btn").addEventListener("click", function() {
    document.getElementById("response-msg").innerText = "HMU and let me know";
    document.getElementById("response-msg").style.color = "green";
});

document.getElementById("no-btn").addEventListener("click", function() {
    document.getElementById("response-msg").innerText = "BUMMM";
    document.getElementById("response-msg").style.color = "red";
});
