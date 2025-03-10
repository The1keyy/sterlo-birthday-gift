document.addEventListener("DOMContentLoaded", function () {
    // 🎉 Typing Effect for the Message
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

    // 🎊 Confetti Effect (Triggers on Page Load)
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
    script.onload = () => {
        let count = 0;
        const confettiInterval = setInterval(() => {
            confetti({ particleCount: 200, spread: 180, origin: { y: 0.6 } });
            count++;
            if (count === 4) clearInterval(confettiInterval);
        }, 2000);
    };
    document.body.appendChild(script);

    // 🎶 Music Play Button Logic
    const playButton = document.getElementById("playButton");
    const playButtonContainer = document.getElementById("playButtonContainer");
    const music = new Audio("music/1.mp3");
    music.loop = true;

    playButton.addEventListener("click", () => {
        music.play();
        playButtonContainer.style.display = "none";
    });

    // ✅ Yes/No Button Click Events with Smooth Scroll
    document.getElementById("yes-btn").addEventListener("click", function () {
        document.getElementById("response-msg").innerText = "Text Me And Let Me Know!!!!";
        document.getElementById("response-msg").style.color = "white";
        document.getElementById("response-msg").scrollIntoView({ behavior: "smooth", block: "center" });
    });

    document.getElementById("no-btn").addEventListener("click", function () {
        document.getElementById("response-msg").innerText = "STOP PLAYING PICK YES";
        document.getElementById("response-msg").style.color = "white";
        document.getElementById("response-msg").scrollIntoView({ behavior: "smooth", block: "center" });
    });

    // 🖼 Memory Grid Logic (4x4 Grid of Random Videos & Photos)
    const memoryContainer = document.getElementById("memoryContainer");
    let usedPhotos = new Set();
    let usedVideos = new Set();

    const photos = [
        "photos/p1.jpeg", "photos/p2.jpeg", "photos/p3.jpeg", "photos/p4.jpeg",
        "photos/p5.png", "photos/p6.png", "photos/p7.jpeg", "photos/p8.jpeg", "photos/p9.jpg", 
        "photos/p10.png", "photos/p11.png"

    ];

    const videos = [
        "videos/v1.mp4", "videos/v2.mp4", "videos/v3.mp4", "videos/v4.mp4",
        "videos/v5.mp4", "videos/v6.mp4", "videos/v7.mp4", "videos/v8.mp4",
        "videos/v9.mp4", "videos/v10.mp4", "videos/v11.mp4", "videos/v12.mp4",
        "videos/v13.mp4", "videos/v14.mp4", "videos/v15.mp4", "videos/v16.mp4"
    ];

    function getUniqueMemory(isVideo) {
        let availableItems = isVideo ? videos.filter(v => !usedVideos.has(v)) : photos.filter(p => !usedPhotos.has(p));

        if (availableItems.length === 0) {
            isVideo ? usedVideos.clear() : usedPhotos.clear();
            availableItems = isVideo ? videos : photos;
        }

        let randomIndex = Math.floor(Math.random() * availableItems.length);
        let selectedItem = availableItems[randomIndex];

        isVideo ? usedVideos.add(selectedItem) : usedPhotos.add(selectedItem);

        return isVideo
            ? `<video class="memory-item" src="${selectedItem}" muted autoplay loop playsinline disablePictureInPicture controlsList="nodownload nofullscreen noremoteplayback"></video>`
            : `<img class="memory-item fade-out" src="${selectedItem}" alt="Memory">`;
    }

    // Generate 4x4 Grid (16 Items)
    function generateMemoryGrid() {
        memoryContainer.innerHTML = "";
        usedPhotos.clear();
        usedVideos.clear();

        for (let i = 0; i < 16; i++) {
            let isVideo = i % 2 === 0; // Ensures even distribution of videos and photos
            let memoryElement = document.createElement("div");
            memoryElement.innerHTML = getUniqueMemory(isVideo);
            memoryContainer.appendChild(memoryElement);

            if (isVideo) {
                let videoElement = memoryElement.querySelector("video");
                if (videoElement) updateVideo(videoElement);
            }
        }
    }

    // 🔄 Update Videos After One Full Loop
    function updateVideo(videoElement) {
        videoElement.addEventListener("ended", function () {
            setTimeout(() => {
                let newVideoHTML = getUniqueMemory(true);
                let newVideoElement = document.createElement("div");
                newVideoElement.innerHTML = newVideoHTML;
                let newVideo = newVideoElement.firstChild;

                videoElement.replaceWith(newVideo);
                updateVideo(newVideo);
            }, 2000); // Add 2s delay before changing
        });
    }

    // ⏳ Update Photos Every 6 Seconds (Staggered Updates)
    function updatePhotos() {
        setInterval(() => {
            let images = document.querySelectorAll(".memory-item img");
            images.forEach((img, index) => {
                setTimeout(() => {
                    img.classList.add("fade-out");
                    setTimeout(() => {
                        let newPhotoHTML = getUniqueMemory(false);
                        let newPhotoElement = document.createElement("div");
                        newPhotoElement.innerHTML = newPhotoHTML;
                        let newPhoto = newPhotoElement.firstChild;

                        img.replaceWith(newPhoto);
                    }, 1000);
                }, index * 500); // Stagger updates by 500ms
            });
        }, 6000);
    }

    // 🔄 Refresh Grid Every 30 Seconds (Prevents Repetition)
    setInterval(() => {
        generateMemoryGrid();
    }, 30000);

    // Activate Video & Photo Updating Independently
    setTimeout(() => {
        generateMemoryGrid();
        updatePhotos();
    }, 1000);
});
