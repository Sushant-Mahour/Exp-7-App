// DOM Elements - Static Images
const static4a_first = document.getElementById("static4a_first");
const static4a_last = document.getElementById("static4a_last");
const static4b_last = document.getElementById("static4b_last");

// DOM Elements - GIF Player
const gif4 = document.getElementById("gif4");

// DOM Elements - UI
const stepText = document.getElementById("stepText");

const interactionLayer4a = document.getElementById("interactionLayer4a");
const transbox4a = document.getElementById("transbox4a");

const interactionLayer4b = document.getElementById("interactionLayer4b");
const transbox4b = document.getElementById("transbox4b");

const prevBtn = document.getElementById("prevBtn");
const nextToStep5 = document.getElementById("nextToStep5");

// GIF paths and durations
const gifPath1 = "../assets/gifs/Step d1.gif";
const gifPath2 = "../assets/gifs/Step d2.gif";

const duration1 = 3480; // ms
const duration2 = 3840; // ms

// Blobs for pre-fetched GIFs
let blob1 = null;
let blob2 = null;

let stepTimeout = null;

// Hide Next button initially
if (nextToStep5) {
    nextToStep5.style.visibility = "hidden";
}

// Enable Back button behavior
if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        window.location.href = "step3.html";
    });
}

// Enable Next button behavior
if (nextToStep5) {
    nextToStep5.addEventListener("click", () => {
        // Will go to step5 later, just stub for now
        window.location.href = "step5.html";
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
prefetchGIF(gifPath2, b => blob2 = b);

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

// Interaction 4a
transbox4a.addEventListener("click", () => {
    interactionLayer4a.style.display = "none";
    
    // Play GIF d1
    playGif(gif4, gifPath1, blob1, static4a_first);
    
    stepTimeout = setTimeout(() => {
        // Transition to Step 4b
        gif4.style.display = "none";
        gif4.src = ""; // Stop GIF background play
        
        static4a_last.style.display = "block";
        interactionLayer4b.style.display = "block";
        
        stepText.textContent = "Click on the next highlighted area to continue.";
    }, duration1);
});

// Interaction 4b
transbox4b.addEventListener("click", () => {
    interactionLayer4b.style.display = "none";
    
    // Play GIF d2
    playGif(gif4, gifPath2, blob2, static4a_last);
    
    stepTimeout = setTimeout(() => {
        // Step 4 Completed
        gif4.style.display = "none";
        gif4.src = ""; // Stop GIF background play
        
        static4b_last.style.display = "block";
        if (nextToStep5) {
            nextToStep5.style.visibility = "visible";
        }
        
        stepText.textContent = "Step 4 completed. Click Next to proceed.";
    }, duration2);
});
