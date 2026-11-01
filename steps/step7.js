// DOM Elements - Static Images
const static7a_first = document.getElementById("static7a_first");
const static7a_last = document.getElementById("static7a_last");

// DOM Elements - GIF Player
const gif7 = document.getElementById("gif7");

// DOM Elements - UI
const stepBadge = document.getElementById("stepBadge");
const stepText = document.getElementById("stepText");

const interactionLayer7a = document.getElementById("interactionLayer7a");
const transbox7a = document.getElementById("transbox7a");

const prevBtn = document.getElementById("prevBtn");
const nextToFinish = document.getElementById("nextToFinish");

// GIF path and duration
const gifPath1 = "../assets/gifs/Step d13.gif";
const duration1 = 4760; // ms

let blob1 = null;
let stepTimeout = null;

// Hide Next button initially
if (nextToFinish) {
    nextToFinish.style.visibility = "hidden";
}

// Enable Back button behavior
if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        window.location.href = "step6.html";
    });
}

// Enable Next button behavior
if (nextToFinish) {
    nextToFinish.addEventListener("click", () => {
        window.location.href = "step8.html";
    });
}

// Pre-fetch all GIFs for smoother transitions
function prefetchGIF(url, callback) {
    fetch(url)
        .then(r => r.blob())
        .then(b => callback(b))
        .catch(err => console.warn(`Could not pre-fetch ${url}:`, err));
}

prefetchGIF(gifPath1, b => blob1 = b);

// Helper to start playing a GIF without blinking
function playGif(gifElement, defaultPath, blobObj, prevStaticImg) {
    gifElement.style.display = "block";
    
    gifElement.onload = () => {
        gifElement.onload = null;
        if (prevStaticImg) {
            prevStaticImg.style.display = "none";
        }
    };

    if (blobObj) {
        gifElement.src = URL.createObjectURL(blobObj);
    } else {
        gifElement.src = defaultPath + "?" + new Date().getTime();
    }
}

// Interaction 7a
transbox7a.addEventListener("click", () => {
    interactionLayer7a.style.display = "none";
    
    // Play GIF d13
    playGif(gif7, gifPath1, blob1, static7a_first);
    
    stepTimeout = setTimeout(() => {
        // Step 7 Completed
        gif7.style.display = "none";
        gif7.src = ""; // Stop GIF background play
        
        static7a_last.style.display = "block";
        
        if (nextToFinish) {
            nextToFinish.style.visibility = "visible";
        }
        
        if (stepBadge) stepBadge.textContent = "Step 7 Complete";
        stepText.textContent = "Step 7 completed. You have finished the experiment!";
    }, duration1);
});
