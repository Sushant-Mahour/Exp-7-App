// DOM Elements - Static Images
const static2a_first = document.getElementById("static2a_first");
const static2a_last = document.getElementById("static2a_last");
const static2b_last = document.getElementById("static2b_last");
const static2c_last = document.getElementById("static2c_last");

// DOM Elements - GIF Player
const gif2 = document.getElementById("gif2");

// DOM Elements - UI
const stepBadge = document.getElementById("stepBadge");
const stepText = document.getElementById("stepText");

const interactionLayer2a = document.getElementById("interactionLayer2a");
const transbox2a = document.getElementById("transbox2a");

const interactionLayer2b = document.getElementById("interactionLayer2b");
const transbox2b = document.getElementById("transbox2b");

const interactionLayer2c = document.getElementById("interactionLayer2c");
const transbox2c = document.getElementById("transbox2c");

const prevBtn = document.getElementById("prevBtn");
const nextToStep3 = document.getElementById("nextToStep3");

// GIF paths and durations
const gifPath1 = "../assets/gifs/Step b1.gif";
const gifPath2 = "../assets/gifs/Step b2.gif";
const gifPath3 = "../assets/gifs/Step b3.gif";

const duration1 = 1280; // ms
const duration2 = 3520; // ms
const duration3 = 2560; // ms

// Blobs for pre-fetched GIFs
let blob1 = null;
let blob2 = null;
let blob3 = null;

let stepTimeout = null;

// Hide Next button initially
if (nextToStep3) {
    nextToStep3.style.visibility = "hidden";
}

// Enable Back button behavior
if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        window.location.href = "step1.html";
    });
}

// Enable Next button behavior
if (nextToStep3) {
    nextToStep3.addEventListener("click", () => {
        window.location.href = "step3.html";
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
prefetchGIF(gifPath3, b => blob3 = b);

// Helper to start playing a GIF without blinking
function playGif(gifElement, defaultPath, blobObj, prevStaticImg) {
    // Show the GIF element (it will be drawn on top because it comes later in HTML, or we can rely on DOM order)
    gifElement.style.display = "block";
    
    // Wait for the GIF to actually load its first frame before hiding the image underneath
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

// Interaction 2a
transbox2a.addEventListener("click", () => {
    interactionLayer2a.style.display = "none";
    
    // Play GIF b1
    playGif(gif2, gifPath1, blob1, static2a_first);
    
    stepTimeout = setTimeout(() => {
        // Transition to Step 2b
        gif2.style.display = "none";
        gif2.src = ""; // Stop GIF background play
        
        static2a_last.style.display = "block";
        interactionLayer2b.style.display = "block";
        
        if (stepBadge) stepBadge.textContent = "Step 2b";
        stepText.textContent = "Click on the next highlighted area to continue.";
    }, duration1);
});

// Interaction 2b
transbox2b.addEventListener("click", () => {
    interactionLayer2b.style.display = "none";
    
    // Play GIF b2
    playGif(gif2, gifPath2, blob2, static2a_last);
    
    stepTimeout = setTimeout(() => {
        // Transition to Step 2c
        gif2.style.display = "none";
        gif2.src = ""; // Stop GIF background play
        
        static2b_last.style.display = "block";
        interactionLayer2c.style.display = "block";
        
        if (stepBadge) stepBadge.textContent = "Step 2c";
        stepText.textContent = "Click on the final highlighted area to complete step 2.";
    }, duration2);
});

// Interaction 2c
transbox2c.addEventListener("click", () => {
    interactionLayer2c.style.display = "none";
    
    // Play GIF b3
    playGif(gif2, gifPath3, blob3, static2b_last);
    
    stepTimeout = setTimeout(() => {
        // Step 2 Completed
        gif2.style.display = "none";
        gif2.src = ""; // Stop GIF background play
        
        static2c_last.style.display = "block";
        if (nextToStep3) {
            nextToStep3.style.visibility = "visible";
        }
        
        if (stepBadge) stepBadge.textContent = "Step 2 Complete";
        stepText.textContent = "Step 2 completed. Click Next to proceed.";
    }, duration3);
});
