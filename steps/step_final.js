// DOM Elements
const gifFinal = document.getElementById("gifFinal");
const staticFinal_last = document.getElementById("staticFinal_last");
const stepText = document.getElementById("stepText");
const prevBtn = document.getElementById("prevBtn");
const finishBtn = document.getElementById("finishBtn");

// GIF path and duration
const gifPath = "../assets/gifs/step final.gif";
const duration = 3040; // ms

let blob = null;
let stepTimeout = null;

// Hide Finish button initially
if (finishBtn) {
    finishBtn.style.visibility = "hidden";
}

// Back button behavior
if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        window.location.href = "step12.html";
    });
}

// Finish button behavior
if (finishBtn) {
    finishBtn.addEventListener("click", () => {
        alert("Experiment Completed!");
        window.location.href = "step0.html";
    });
}

// Pre-fetch GIF
function prefetchGIF(url, callback) {
    fetch(url)
        .then(r => r.blob())
        .then(b => callback(b))
        .catch(err => console.warn(`Could not pre-fetch ${url}:`, err));
}

prefetchGIF(gifPath, b => blob = b);

// Helper to start playing a GIF
function playGif(gifElement, defaultPath, blobObj) {
    gifElement.style.display = "block";
    
    if (blobObj) {
        gifElement.src = URL.createObjectURL(blobObj);
    } else {
        gifElement.src = defaultPath + "?" + new Date().getTime();
    }
}

// Play Step Final automatically on load
function startStepFinal() {
    stepText.textContent = "Finalizing experiment...";
    
    let timerStarted = false;
    const startTimer = () => {
        if (timerStarted) return;
        timerStarted = true;
        stepTimeout = setTimeout(() => {
            // Animation Finished - Stop loop by showing static last frame
            gifFinal.style.display = "none";
            gifFinal.src = ""; // Stop GIF background play
            
            staticFinal_last.style.display = "block";
            
            if (finishBtn) {
                finishBtn.style.visibility = "visible";
            }
            
            stepText.textContent = "Experiment completed. Click Finish Experiment to complete.";
        }, duration);
    };

    gifFinal.onload = () => {
        gifFinal.onload = null;
        startTimer();
    };

    playGif(gifFinal, gifPath, blob);

    if (gifFinal.complete && gifFinal.naturalWidth !== 0) {
        startTimer();
    }
}

// Auto-start when DOM loads
startStepFinal();
