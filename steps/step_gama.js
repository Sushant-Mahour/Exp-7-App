// DOM Elements
const gifGama = document.getElementById("gifGama");
const stepText = document.getElementById("stepText");
const prevBtn = document.getElementById("prevBtn");
const nextToStep1 = document.getElementById("nextToStep1");

// GIF path and duration
const gifPath = "../assets/gifs/step gama.gif";
const duration = 3440; // ms

let blob = null;
let stepTimeout = null;

// Hide Next button initially
if (nextToStep1) {
    nextToStep1.style.visibility = "hidden";
}

// Back button behavior
if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        window.location.href = "step_beta.html";
    });
}

// Next button behavior
if (nextToStep1) {
    nextToStep1.addEventListener("click", () => {
        window.location.href = "step1.html";
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

// Play Step Gama automatically on load
function startStepGama() {
    stepText.textContent = "Continuing setup...";
    
    playGif(gifGama, gifPath, blob);
    
    stepTimeout = setTimeout(() => {
        // Animation Finished, show Next button
        if (nextToStep1) {
            nextToStep1.style.visibility = "visible";
        }
        
        stepText.textContent = "Setup complete. Click Next to proceed.";
    }, duration);
}

// Auto-start when DOM loads
startStepGama();
