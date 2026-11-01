// DOM Elements - Static Images
const static10a_first = document.getElementById("static10a_first");
const static10a_last = document.getElementById("static10a_last");

// DOM Elements - GIF Player
const gif10 = document.getElementById("gif10");

// DOM Elements - UI
const stepBadge = document.getElementById("stepBadge");
const stepText = document.getElementById("stepText");

const interactionLayer10a = document.getElementById("interactionLayer10a");
const transbox10a = document.getElementById("transbox10a");

const prevBtn = document.getElementById("prevBtn");
const nextToFinish = document.getElementById("nextToFinish");

// GIF path and duration
const gifPath1 = "../assets/gifs/Step F2.gif";
const duration1 = 7080; // ms

let blob1 = null;
let stepTimeout = null;

// Hide Next button initially
if (nextToFinish) {
    nextToFinish.style.visibility = "hidden";
}

// Enable Back button behavior
if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        window.location.href = "step9.html";
    });
}

// Enable Next button behavior
if (nextToFinish) {
    nextToFinish.addEventListener("click", () => {
        window.location.href = "step11.html";
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

// Interaction 10a
transbox10a.addEventListener("click", () => {
    interactionLayer10a.style.display = "none";
    
    // Play GIF F2
    playGif(gif10, gifPath1, blob1, static10a_first);
    
    stepTimeout = setTimeout(() => {
        // Step 10 Completed
        gif10.style.display = "none";
        gif10.src = ""; // Stop GIF background play
        
        static10a_last.style.display = "block";
        
        if (nextToFinish) {
            nextToFinish.style.visibility = "visible";
        }
        
        if (stepBadge) stepBadge.textContent = "Step 10 Complete";
        stepText.textContent = "Step 10 completed. You have finished the experiment!";
    }, duration1);
});
