// DOM Elements - Static Images
const static5a_first = document.getElementById("static5a_first");
const static5a_last = document.getElementById("static5a_last");

// DOM Elements - GIF Player
const gif5 = document.getElementById("gif5");

// DOM Elements - UI
const stepBadge = document.getElementById("stepBadge");
const stepText = document.getElementById("stepText");

const interactionLayer5a = document.getElementById("interactionLayer5a");
const transbox5a = document.getElementById("transbox5a");

const prevBtn = document.getElementById("prevBtn");
const nextToStep6 = document.getElementById("nextToStep6");

// GIF path and duration
const gifPath1 = "../assets/gifs/Step d11.gif";
const duration1 = 3760; // ms

let blob1 = null;
let stepTimeout = null;

// Hide Next button initially
if (nextToStep6) {
    nextToStep6.style.visibility = "hidden";
}

// Enable Back button behavior
if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        window.location.href = "step4.html";
    });
}

// Enable Next button behavior
if (nextToStep6) {
    nextToStep6.addEventListener("click", () => {
        window.location.href = "step6.html";
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

// Interaction 5a
transbox5a.addEventListener("click", () => {
    interactionLayer5a.style.display = "none";
    
    // Play GIF d11
    playGif(gif5, gifPath1, blob1, static5a_first);
    
    stepTimeout = setTimeout(() => {
        // Step 5 Completed
        gif5.style.display = "none";
        gif5.src = ""; // Stop GIF background play
        
        static5a_last.style.display = "block";
        
        if (nextToStep6) {
            nextToStep6.style.visibility = "visible";
        }
        
        if (stepBadge) stepBadge.textContent = "Step 5 Complete";
        stepText.textContent = "Step 5 completed. Click Next to proceed.";
    }, duration1);
});
