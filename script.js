document.addEventListener("DOMContentLoaded", function () {
    // 🎉 Birthday Message Typing Effect
    const message = `Sterlizy, 🎈
    
    Wishing you a fantastic birthday filled with love, joy, and happiness! 
    I'm so grateful for our friendship. Here's to another amazing year ahead!

    Your brother for life,  
    Key`;

    const textElement = document.getElementById("animated-text");
    textElement.innerHTML = `<span class="typing">${message.replace(/\n/g, "<br>")}</span>`;

    // 🎊 Confetti Effect (Triggers when the page loads)
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
            if (count === 4) clearInterval(confettiInterval); // Stop after 4 bursts
        }, 2000);
    };
    document.body.appendChild(script);

    // 🎶 Play Button Music Logic
    const playButton = document.getElementById("playButton");
    const playButtonContainer = document.getElementById("playButtonContainer");
    const music = new Audio("audio/you-got-a-friend-in-me.mp3");
    music.loop = true;

    playButton.addEventListener("click", () => {
        music.play();
        playButtonContainer.style.display = "none"; // Hide button after clicking
    });

    // ✅ Yes/No Button Click Events
    document.getElementById("yes-btn").addEventListener("click", function () {
        document.getElementById("response-msg").innerText = "HMU And Let Me Know!!!!";
        document.getElementById("response-msg").style.color = "green";
    });

    document.getElementById("no-btn").addEventListener("click", function () {
        document.getElementById("response-msg").innerText = "Bumm";
        document.getElementById("response-msg").style.color = "red";
    });

    // 🖼 Memory Grid Logic (4x4 Grid of Random Videos & Photos)
    const memoryContainer = document.getElementById("memoryContainer");
    const photos = ["photo1.jpg", "photo2.jpg", "photo3.jpg", "photo4.jpg"];
    const videos = ["video1.mp4", "video2.mp4", "video3.mp4", "video4.mp4"];

    function getRandomMemory(isVideo) {
        if (isVideo) {
            let videoSrc = videos[Math.floor(Math.random() * videos.length)];
            return `<video class="memory-item" src="${videoSrc}" muted autoplay loop></video>`;
        } else {
            let photoSrc = photos[Math.floor(Math.random() * photos.length)];
            return `<img class="memory-item fade-out" src="${photoSrc}" alt="Memory">`;
        }
    }

    // Generate 4x4 grid (16 items)
    for (let i = 0; i < 16; i++) {
        let isVideo = Math.random() > 0.5; // 50% chance for video or photo
        let memoryElement = document.createElement("div");
        memoryElement.innerHTML = getRandomMemory(isVideo);
        memoryContainer.appendChild(memoryElement);
    }

    // 🔄 Update Videos After 3 Loops
    function updateVideo(videoElement) {
        let playCount = 0;
        videoElement.addEventListener("ended", function () {
            playCount++;
            if (playCount >= 3) { // Change video after 3 loops
                videoElement.outerHTML = getRandomMemory(true);
                let newVideo = memoryContainer.querySelector("video:last-child");
                if (newVideo) updateVideo(newVideo); // Attach event to new video
            } else {
                videoElement.play(); // Keep looping until 3 times
            }
        });
    }

    // ⏳ Update Photos Every 6 Seconds
    function updatePhotos() {
        setInterval(() => {
            let images = document.querySelectorAll(".memory-item img");
            images.forEach((img) => {
                img.classList.add("fade-out");
                setTimeout(() => { img.outerHTML = getRandomMemory(false); }, 1000);
            });
        }, 6000);
    }

    // Activate Video & Photo Updating
    setTimeout(() => {
        let videos = document.querySelectorAll("video");
        videos.forEach(updateVideo);
        updatePhotos();
    }, 1000);
});
