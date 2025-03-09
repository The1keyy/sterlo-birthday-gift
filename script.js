document.addEventListener("DOMContentLoaded", function () {
    // 🎉 Birthday Message Typing Effect
    const message = `Sterlizy 🎈

    My guy, Happy Birthday! Wishing you nothing but success, good energy, and all the blessings coming your way. Today’s your day, so soak it all in and enjoy it because you deserve that and more.
    
    I just wanna take a second to say I appreciate you. For real. Through all the years, the convos, the wild moments, and even the chill ones, our friendship has been solid from the jump. From the YMCA days to now, it’s been nothing but real, and I wouldn’t trade that for anything.
    
    And they say by 25, your brain is finally fully developed so technically, no more reckless decisions. But let’s be honest, we both know that ain’t stopping nothing. 
    
    Life moves fast, but one thing that’s always been constant is this friendship. No matter what, I got you—just like you always got me. And to show you how much I value that, I coded this website for you.
    
    So today, it’s all about you. Enjoy the love, celebrate the moment, and keep making moves. 
    
    Much love, fam. Stay blessed and turn up! 🎉🔥
    
    Your brother for life,  
    Key`;
    
    document.getElementById("animated-text").innerHTML = message.replace(/\n/g, "<br>");
    ;

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
        document.getElementById("response-msg").style.color = "white";
        document.getElementById("response-msg").scrollIntoView({ behavior: "smooth", block: "center" });
    });
    
    document.getElementById("no-btn").addEventListener("click", function () {
        document.getElementById("response-msg").innerText = "Bumm STOP PLAYING PICK YES";
        document.getElementById("response-msg").style.color = "white";
        document.getElementById("response-msg").scrollIntoView({ behavior: "smooth", block: "center" });
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
