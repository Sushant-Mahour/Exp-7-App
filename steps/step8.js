// DOM Elements - Static Images
const static8_last = document.getElementById("static8_last");

// DOM Elements - GIF Player
const gif8 = document.getElementById("gif8");

// DOM Elements - UI
const stepBadge = document.getElementById("stepBadge");
const stepText = document.getElementById("stepText");

const prevBtn = document.getElementById("prevBtn");
const nextToFinish = document.getElementById("nextToFinish");

// GIF path and duration
const gifPath = "../assets/gifs/Step e.gif";
const duration = 7200; // ms

let stepTimeout = null;

// Hide Next button initially
if (nextToFinish) {
    nextToFinish.style.visibility = "hidden";
}

// Enable Back button behavior
if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        window.location.href = "step7.html";
    });
}

// Enable Next button behavior
if (nextToFinish) {
    nextToFinish.addEventListener("click", () => {
        window.location.href = "step9.html";
    });
}

// Play GIF directly on page load (no click needed)
function startStep8() {
    gif8.style.display = "block";
    gif8.src = gifPath + "?" + new Date().getTime(); // ensure fresh load

    stepTimeout = setTimeout(() => {
        // Step 8 Completed
        gif8.style.display = "none";
        gif8.src = ""; // Stop GIF background play
        
        static8_last.style.display = "block";
        
        if (nextToFinish) {
            nextToFinish.style.visibility = "visible";
        }
        
        stepText.textContent = "Step 8 completed. You have finished the experiment!";
    }, duration);
}

// Start immediately when the script runs (DOM is ready)
startStep8();
