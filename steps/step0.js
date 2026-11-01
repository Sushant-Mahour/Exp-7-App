// DOM Elements - Static Images
const static0_last = document.getElementById("static0_last");

// DOM Elements - GIF Player
const gif0 = document.getElementById("gif0");

// DOM Elements - UI
const stepText = document.getElementById("stepText");
const startExperimentBtn = document.getElementById("startExperimentBtn");

// GIF path and duration
const gifPath1 = "../assets/gifs/step alpha.gif";
const duration1 = 2440; // ms

let blob1 = null;
let stepTimeout = null;

// Enable Start button behavior
if (startExperimentBtn) {
    startExperimentBtn.addEventListener("click", () => {
        window.location.href = "step_beta.html";
    });
}

// Pre-fetch GIF
function prefetchGIF(url, callback) {
    fetch(url)
        .then(r => r.blob())
        .then(b => callback(b))
        .catch(err => console.warn(`Could not pre-fetch ${url}:`, err));
}

prefetchGIF(gifPath1, b => blob1 = b);

// Helper to start playing a GIF
function playGif(gifElement, defaultPath, blobObj) {
    gifElement.style.display = "block";
    
    if (blobObj) {
        gifElement.src = URL.createObjectURL(blobObj);
    } else {
        gifElement.src = defaultPath + "?" + new Date().getTime();
    }
}

// Play Step Alpha automatically on load
function startIntro() {
    stepText.textContent = "Welcome to Virtual Experiment 4.";
    
    playGif(gif0, gifPath1, blob1);
    
    stepTimeout = setTimeout(() => {
        // Animation Finished
        gif0.style.display = "none";
        gif0.src = ""; // Stop GIF background play
        
        static0_last.style.display = "block";
        
        stepText.textContent = "Click 'Start Experiment' to begin.";
    }, duration1);
}

// Auto-start when DOM loads
startIntro();

