// DOM Elements - Static Images
const static12a_first = document.getElementById("static12a_first");
const static12a_last = document.getElementById("static12a_last");
const static12b_last = document.getElementById("static12b_last");
const static12c_last = document.getElementById("static12c_last");

// DOM Elements - GIF Player
const gif12 = document.getElementById("gif12");

// DOM Elements - UI
const stepBadge = document.getElementById("stepBadge");
const stepText = document.getElementById("stepText");

const interactionLayer12a = document.getElementById("interactionLayer12a");
const transbox12a = document.getElementById("transbox12a");

const interactionLayer12b = document.getElementById("interactionLayer12b");
const transbox12b = document.getElementById("transbox12b");

const interactionLayer12c = document.getElementById("interactionLayer12c");
const transbox12c = document.getElementById("transbox12c");

const prevBtn = document.getElementById("prevBtn");
const nextToFinal = document.getElementById("nextToFinal");

// GIF paths and durations
const gifPath1 = "../assets/gifs/Step g1.gif";
const gifPath2 = "../assets/gifs/Step g2.gif";
const gifPath3 = "../assets/gifs/Step g3.gif";

const duration1 = 2720; // ms
const duration2 = 2080; // ms
const duration3 = 5200; // ms

// Blobs for pre-fetched GIFs
let blob1 = null;
let blob2 = null;
let blob3 = null;

let stepTimeout = null;

// Hide Next button initially
if (nextToFinal) {
    nextToFinal.style.visibility = "hidden";
}

// Enable Back button behavior
if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        window.location.href = "step11.html";
    });
}

// Enable Next button behavior
if (nextToFinal) {
    nextToFinal.addEventListener("click", () => {
        window.location.href = "step_final.html";
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

// Interaction 12a
transbox12a.addEventListener("click", () => {
    interactionLayer12a.style.display = "none";
    
    // Play GIF g1
    playGif(gif12, gifPath1, blob1, static12a_first);
    
    stepTimeout = setTimeout(() => {
        // Transition to Step 12b
        gif12.style.display = "none";
        gif12.src = ""; // Stop GIF background play
        
        static12a_last.style.display = "block";
        interactionLayer12b.style.display = "block";
        
        stepText.textContent = "Click on the next highlighted area to continue.";
    }, duration1);
});

// Interaction 12b
transbox12b.addEventListener("click", () => {
    interactionLayer12b.style.display = "none";
    
    // Play GIF g2
    playGif(gif12, gifPath2, blob2, static12a_last);
    
    stepTimeout = setTimeout(() => {
        // Transition to Step 12c
        gif12.style.display = "none";
        gif12.src = ""; // Stop GIF background play
        
        static12b_last.style.display = "block";
        interactionLayer12c.style.display = "block";
        
        stepText.textContent = "Click on the final highlighted area to complete step 12.";
    }, duration2);
});

// Interaction 12c
transbox12c.addEventListener("click", () => {
    interactionLayer12c.style.display = "none";
    
    // Play GIF g3
    playGif(gif12, gifPath3, blob3, static12b_last);
    
    stepTimeout = setTimeout(() => {
        // Step 12 Completed
        gif12.style.display = "none";
        gif12.src = ""; // Stop GIF background play
        
        static12c_last.style.display = "block";
        
        if (nextToFinal) {
            nextToFinal.style.visibility = "visible";
        }
        
        if (stepBadge) stepBadge.textContent = "Step 12 Complete";
        stepText.textContent = "Step 12 completed. Click Next to proceed.";
    }, duration3);
});
