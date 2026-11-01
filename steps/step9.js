// DOM Elements - Static Images
const static9a_first = document.getElementById("static9a_first");
const static9a_last = document.getElementById("static9a_last");

// DOM Elements - GIF Player
const gif9 = document.getElementById("gif9");

// DOM Elements - UI
const stepBadge = document.getElementById("stepBadge");
const stepText = document.getElementById("stepText");

const interactionLayer9a = document.getElementById("interactionLayer9a");
const transbox9a = document.getElementById("transbox9a");

const prevBtn = document.getElementById("prevBtn");
const nextToStep10 = document.getElementById("nextToStep10");

// GIF path and duration
const gifPath1 = "../assets/gifs/Step F.gif";
const duration1 = 5120; // ms

let blob1 = null;
let stepTimeout = null;

// Hide Next button initially
if (nextToStep10) {
    nextToStep10.style.visibility = "hidden";
}

// Enable Back button behavior
if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        window.location.href = "step8.html";
    });
}

// Enable Next button behavior
if (nextToStep10) {
    nextToStep10.addEventListener("click", () => {
        window.location.href = "step10.html";
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

// Interaction 9a
transbox9a.addEventListener("click", () => {
    interactionLayer9a.style.display = "none";
    
    // Play GIF F
    playGif(gif9, gifPath1, blob1, static9a_first);
    
    stepTimeout = setTimeout(() => {
        // Step 9 Completed
        gif9.style.display = "none";
        gif9.src = ""; // Stop GIF background play
        
        static9a_last.style.display = "block";
        
        if (nextToStep10) {
            nextToStep10.style.visibility = "visible";
        }
        
        if (stepBadge) stepBadge.textContent = "Step 9 Complete";
        stepText.textContent = "Step 9 completed. Click Next to proceed.";
    }, duration1);
});
