// DOM Elements - Static Images
const static6a_first = document.getElementById("static6a_first");
const static6a_last = document.getElementById("static6a_last");

// DOM Elements - GIF Player
const gif6 = document.getElementById("gif6");

// DOM Elements - UI
const stepBadge = document.getElementById("stepBadge");
const stepText = document.getElementById("stepText");

const interactionLayer6a = document.getElementById("interactionLayer6a");
const transbox6a = document.getElementById("transbox6a");

const prevBtn = document.getElementById("prevBtn");
const nextToStep7 = document.getElementById("nextToStep7");

// GIF path and duration
const gifPath1 = "../assets/gifs/Step d12.gif";
const duration1 = 5920; // ms

let blob1 = null;
let stepTimeout = null;

// Hide Next button initially
if (nextToStep7) {
    nextToStep7.style.visibility = "hidden";
}

// Enable Back button behavior
if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        window.location.href = "step5.html";
    });
}

// Enable Next button behavior
if (nextToStep7) {
    nextToStep7.addEventListener("click", () => {
        window.location.href = "step7.html";
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

// Interaction 6a
transbox6a.addEventListener("click", () => {
    interactionLayer6a.style.display = "none";
    
    // Play GIF d12
    playGif(gif6, gifPath1, blob1, static6a_first);
    
    stepTimeout = setTimeout(() => {
        // Step 6 Completed
        gif6.style.display = "none";
        gif6.src = ""; // Stop GIF background play
        
        static6a_last.style.display = "block";
        
        if (nextToStep7) {
            nextToStep7.style.visibility = "visible";
        }
        
        if (stepBadge) stepBadge.textContent = "Step 6 Complete";
        stepText.textContent = "Step 6 completed. Click Next to proceed.";
    }, duration1);
});
