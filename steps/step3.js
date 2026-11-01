// DOM Elements - Static Images
const static3_first = document.getElementById("static3_first");

// DOM Elements - GIF Player
const gif3 = document.getElementById("gif3");

// DOM Elements - UI
const stepBadge = document.getElementById("stepBadge");
const stepText = document.getElementById("stepText");

const interactionLayer3a = document.getElementById("interactionLayer3a");
const transbox3a = document.getElementById("transbox3a");

const prevBtn = document.getElementById("prevBtn");
const nextToStep4 = document.getElementById("nextToStep4");

// GIF path and duration
// Using the stripped version of the GIF which natively plays exactly once and stops!
const gifPath = "../assets/gifs/Step c_once.gif";
const duration = 3720; // ms

let blob = null;
let stepTimeout = null;

// Hide Next button initially
if (nextToStep4) {
    nextToStep4.style.visibility = "hidden";
}

// Enable Back button behavior
if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        window.location.href = "step2.html";
    });
}

// Enable Next button behavior
if (nextToStep4) {
    nextToStep4.addEventListener("click", () => {
        window.location.href = "step4.html";
    });
}

// Pre-fetch GIF for smoother transition
fetch(gifPath)
    .then(r => r.blob())
    .then(b => blob = b)
    .catch(err => console.warn(`Could not pre-fetch GIF from ${gifPath}:`, err));

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

// Interaction 3a
transbox3a.addEventListener("click", () => {
    interactionLayer3a.style.display = "none";
    
    // Play GIF c natively (it will stop on its own at the last frame)
    playGif(gif3, gifPath, blob, static3_first);
    
    stepTimeout = setTimeout(() => {
        // Step 3 Completed
        // WE NO LONGER HIDE THE GIF! It naturally freezes!
        
        if (nextToStep4) {
            nextToStep4.style.visibility = "visible";
        }
        
        if (stepBadge) stepBadge.textContent = "Step 3 Complete";
        if (stepText) stepText.textContent = "Step 3 completed. Click Next to proceed.";
    }, duration);
});
