// script.js

document.addEventListener("DOMContentLoaded", function () {
    const message = "Sterlizy ,\n\nWishing you a fantastic birthday filled with love, joy, and happiness! I'm so grateful for our friendship. Here's to another amazing year ahead! 🎈\n\nFirst off, happy birthday. Hope you're enjoying your day because, man, you deserve it. I just wanted to take a moment to say thanks, not just for today, but for being a real one all these years. From way back at the YMCA days to now, it’s been a crazy ride, and I wouldn’t trade this friendship for anything. And now, look at you, fully developed brain and all. They say by this age, your frontal lobe is finally done cooking, so no more excuses for bad decisions, but let's be real, we’ll still make a few for the fun of it. Life’s got its ups and downs, but through it all, I’m grateful for this bond we’ve built. No matter what, I got you, just like you’ve always had me. So today, let’s celebrate, laugh, eat good, and make some memories. Much love fam. Stay blessed and enjoy your day.\n\n Your brother for life, \n\nKey";
    const textElement = document.getElementById("animated-text");
    textElement.innerHTML = message.replace(/\n/g, "<br>"); // Preserve new lines
    textElement.style.opacity = 0; // Start hidden
    textElement.style.transition = "opacity 2s ease-in-out"; // Smooth fade-in effect
    setTimeout(() => textElement.style.opacity = 1, 500); // Trigger fade-in

    // Confetti effect for full page, repeating 4 times
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
    script.onload = () => {
        let count = 0;
        const confettiInterval = setInterval(() => {
            confetti({
                particleCount: 200,
                spread: 180,
                origin: { y: 0.6 }
            });
            count++;
            if (count === 4) clearInterval(confettiInterval); // Stop after 4 times
        }, 2000); // Repeat every 2 seconds
    };
    document.body.appendChild(script);

    // Background music
    const audio = document.createElement("audio");
    audio.src = "audio/you-got-a-friend-in-me.mp3"; // Make sure the file exists in the audio folder
    audio.autoplay = true;
    audio.loop = true;
    document.body.appendChild(audio);
});

// Yes/No button event listeners
document.getElementById("yes-btn").addEventListener("click", function() {
    document.getElementById("response-msg").innerText = "HMU And Let Me Know!!!!";
    document.getElementById("response-msg").style.color = "green";
});

document.getElementById("no-btn").addEventListener("click", function() {
    document.getElementById("response-msg").innerText = "Bumm";
    document.getElementById("response-msg").style.color = "red";
});
